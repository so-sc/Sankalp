import Image from "next/image"
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
    <footer className="relative z-10 tracking-wider bg-foreground/10 pt-12">
      <div className="container mx-auto md:items-center lg:items-start grid gap-8 grid-cols-1 lg:grid-cols-3 mb-8">
        <div>
          <div className="relative h-8 aspect-video">
            <Image src="/sosc.png" alt="SOSC Logo" fill sizes="100%" />
          </div>
          <p className="font-bold mt-3">
            SOSC <br />
            Sahyadri Open-Source Community
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="">
            <div className="flex flex-col">
              <Link href={githubLink} target="_blank">
                GitHub
              </Link>
              <Link href={linkedinLink} target="_blank">
                Linkedin
              </Link>
              <Link href={instagramLink} target="_blank">
                Instagram
              </Link>
              <Link href={facebookLink} target="_blank">
                Facebook
              </Link>
              <Link href={twitterLink} target="_blank">
                Twitter
              </Link>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <Link href={youtubeLink} target="_blank">
                YouTube
              </Link>
              <Link href={discordLink} target="_blank">
                Discord
              </Link>
              <Link href={communityGuidelines} target="_blank">
                Community Guidelines
              </Link>
              <Link href="#" target="_blank">
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
          <Link target="_blank" href="mailto:sosc@sahyadri.edu.in">
            sosc@sahyadri.edu.in
          </Link>
          <p className="pt-2">+91 97412 68512</p>
        </div>
      </div>
      <div>
        <p className="py-5 px-5 text-center bg-background/50">
          SOSC © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
