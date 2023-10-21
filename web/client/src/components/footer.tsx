import SOSCLogo from "@/assets/sosc-logo"
import Link from "next/link"

const githubLink = "https://github.com/so-sc"
const linkedinLink = "https://linkedin.com/company/sosc-sahyadri"
const instagramLink = "https://instagram.com/sosc.sahyadri"
const facebookLink = "https://m.facebook.com/profile.php?id=100073345130252"
const twitterLink = "https://twitter.com/sahyadri_osc"
const youtubeLink = "https://www.youtube.com/channel/UCk8nlSMwUT-jhEtamMF-V-w"
const discordLink = "https://discord.gg/Ddc5Y6tCKk"

const communityGuidelines = "https://github.com/so-sc/code-of-conduct"

export default function Footer() {
  return (
    <footer className="relative md:mt-8 bottom-0 z-10 tracking-wider bg-foreground/10 pt-12">
      <div className="container mx-auto md:items-center lg:items-start grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex lg:block items-center justify-center gap-2">
          <div className="relative h-8 aspect-video mt-2 lg:mt-0">
            <SOSCLogo />
          </div>
          <div className="font-bold mt-1">
            <p>SOSC</p>
            <p>Sahyadri Open-Source Community</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="">
            <div className="flex flex-col">
              <Link
                href={githubLink}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                GitHub
              </Link>
              <Link
                href={linkedinLink}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                Linkedin
              </Link>
              <Link
                href={instagramLink}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                Instagram
              </Link>
              <Link
                href={facebookLink}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                Facebook
              </Link>
              <Link
                href={twitterLink}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                Twitter
              </Link>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <Link
                href={youtubeLink}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                YouTube
              </Link>
              <Link
                href={discordLink}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                Discord
              </Link>
              <Link
                href={communityGuidelines}
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                Community Guidelines
              </Link>
              <Link
                href="#"
                target="_blank"
                className="hover:text-foreground/80 transition-colors"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <p>
            Sahyadri College of Engineering and Management, Adyar, Mangalore -
            575007 IN
          </p>
          <Link
            target="_blank"
            className="hover:text-foreground/80 transition-colors"
            href="mailto:sosc@sahyadri.edu.in"
          >
            sosc@sahyadri.edu.in
          </Link>
          <p className="pt-2">+91 87624 58575</p>
        </div>
      </div>
      <div>
        <p className="py-5 px-5 text-center bg-background">
          SOSC © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
