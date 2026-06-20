import { Dispatch, SetStateAction } from "react"

export interface dialogProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  docId: string
  optimistic: any


}
export interface navBarProps {
  id: string
  username: string
  image: string | null | undefined
}
