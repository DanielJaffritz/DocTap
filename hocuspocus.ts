import { Server } from "@hocuspocus/server"
import * as Y from "yjs"
import { prisma } from "./lib/prisma"
const server = new Server({
  port: 1234,

  async onAuthenticate(data) {
    const headers = Object.fromEntries(data.requestHeaders.entries());
    const cookieHeader = headers['cookie'] || headers['Cookie'];
    if (!cookieHeader) throw new Error("ninguna cookie otorgada");

    const cookies = cookieHeader.split(";").reduce((acc: any, cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name === '__Secure-better-auth.session_token' || name === 'better-auth.session_token') {
        acc['session'] = value;
      }
      return acc;
    }, {})

    if (!cookies.session) {
      throw new Error('cookie de sesión no otorgada')
    };
    const token = cookies.session.split(".")[0]
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    })
    if (!session || new Date() > session.expiresAt) {
      throw new Error("Sesión inválida o expirada.")
    }

    return { user: session.user }
  },

  async onLoadDocument(data) {
    const docId = data.documentName
    const user = data.context?.user

    const doc = await prisma.document.findUnique({
      where: { id: docId },
      include: { collaborators: true },
    })

    if (!doc) {
      throw new Error("El documento no existe.")
    }

    const isOwner = doc.ownerId === user.id
    const isCollaborator = doc.collaborators.some((c) => c.userId === user.id)

    if (!isOwner && !isCollaborator) {
      throw new Error("No tienes permiso para acceder a este documento.")
    }

    if (doc.content && doc.content.length > 0) {
      Y.applyUpdate(data.document, doc.content)
    }

    return data.document
  },

  async onStoreDocument(data) {
    const docId = data.documentName
    const stateVector = Y.encodeStateAsUpdate(data.document)


    await prisma.document.update({
      where: { id: docId },
      data: {
        content: Buffer.from(stateVector),
        updatedAt: new Date(),
      },
    })
  },
})

server.listen()
console.log("Servidor Hocuspocus corriendo en el puerto 1234")
