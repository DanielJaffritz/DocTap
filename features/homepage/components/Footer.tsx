import AppLogo from "@/components/AppLogo";

export default function Footer() {
  return (
    <div className="bg-background_secondary flex flex-col md:flex-row justify-between gap-5 md:gap-1 p-5 pt-20 mt-20 border-t border-border">
      <div className="flex flex-col w-full md:w-1/3">
        <AppLogo width={30} height={30} text_color="base" />
        <p className="text-text">Building the future of document collaboration and productivity</p>
      </div>
      <div className="flex flex-col gap-0 md:gap-2">
        <h1 className="text-primary">PRODUCT</h1>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Features</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Integrations</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Pricing</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Security</p>
      </div>
      <div className="flex flex-col gap-0 md:gap-2">
        <h1 className="text-primary">COMPANY</h1>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">About</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Careers</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Contact</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Blog</p>
      </div>
      <div className="flex flex-col gap-0 md:gap-2">
        <h1 className="text-primary">LEGAL</h1>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Privacy</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Terms</p>
        <p className="text-text hover:text-text_muted cursor-pointer transition-all">Cookie Policy</p>
      </div>
    </div>
  )
}

