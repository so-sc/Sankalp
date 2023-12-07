// import SOSCLogo from "@/assets/sosc-logo"
// import Link from "next/link"

// const githubLink = "https://github.com/so-sc"
// const linkedinLink = "https://linkedin.com/company/sosc-sahyadri"
// const instagramLink = "https://instagram.com/sosc.sahyadri"
// const facebookLink = "https://m.facebook.com/profile.php?id=100073345130252"
// const twitterLink = "https://twitter.com/sahyadri_osc"
// const youtubeLink = "https://www.youtube.com/channel/UCk8nlSMwUT-jhEtamMF-V-w"
// const discordLink = "https://discord.gg/Ddc5Y6tCKk"

// const communityGuidelines = "https://github.com/so-sc/code-of-conduct"

// export default function Footer() {
//   return (
//     <footer className="relative md:mt-8 bottom-0 z-10 tracking-wider bg-foreground/10 pt-12">
//       <div className="container mx-auto md:items-center lg:items-start grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
//         <div className="col-span-1 md:col-span-2 lg:col-span-1 flex lg:block items-center justify-center gap-2">
//           <div className="relative h-8 aspect-video mt-2 lg:mt-0">
//             <SOSCLogo />
//           </div>
//           <div className="font-bold mt-1">
//             <p>SOSC</p>
//             <p>Sahyadri Open-Source Community</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-2">
//           <div className="">
//             <div className="flex flex-col">
//               <Link
//                 href={githubLink}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 GitHub
//               </Link>
//               <Link
//                 href={linkedinLink}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 Linkedin
//               </Link>
//               <Link
//                 href={instagramLink}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 Instagram
//               </Link>
//               <Link
//                 href={facebookLink}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 Facebook
//               </Link>
//               <Link
//                 href={twitterLink}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 Twitter
//               </Link>
//             </div>
//           </div>
//           <div>
//             <div className="flex flex-col">
//               <Link
//                 href={youtubeLink}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 YouTube
//               </Link>
//               <Link
//                 href={discordLink}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 Discord
//               </Link>
//               <Link
//                 href={communityGuidelines}
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 Community Guidelines
//               </Link>
//               <Link
//                 href="#"
//                 target="_blank"
//                 className="hover:text-foreground/80 transition-colors"
//               >
//                 Donate
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="flex-shrink-0">
//           <p>
//             Sahyadri College of Engineering and Management, Adyar, Mangalore -
//             575007 IN
//           </p>
//           <Link
//             target="_blank"
//             className="hover:text-foreground/80 transition-colors"
//             href="mailto:sosc@sahyadri.edu.in"
//           >
//             sosc@sahyadri.edu.in
//           </Link>
//           <p className="pt-2">+91 87624 58575</p>
//         </div>
//       </div>
//       <div>
//         <p className="py-5 px-5 text-center bg-background">
//           SOSC © {new Date().getFullYear()}
//         </p>
//       </div>
//     </footer>
//   )
// }
import SOSCLogo from "@/assets/sosc-logo"
import Link from "next/link"
const websiteLink = "https://www.sosc.org.in/"
const githubLink = "https://github.com/so-sc"
const linkedinLink = "https://linkedin.com/company/sosc-sahyadri"
const instagramLink = "https://instagram.com/sosc.sahyadri"
const facebookLink = "https://m.facebook.com/profile.php?id=100073345130252"
const twitterLink = "https://twitter.com/sahyadri_osc"
const youtubeLink = "https://www.youtube.com/channel/UCk8nlSMwUT-jhEtamMF-V-w"
const discordLink = "https://discord.gg/hHYfMRydAK"

const communityGuidelines = "https://github.com/so-sc/code-of-conduct"
const termsAndConditions = "https://sankalp.sosc.org.in/t&c"

const Footer = () => {
  return (
    <div className="">
      <footer className="body-font font-poppinsR bg-foreground/10 md:pt-14 tracking-wider">
        <div className="flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="flex flex-grow font-semibold dark:font-normal md:pl-20 mb-10 mx-6 md:mt-0 mt-10 ">
            <div className="lg:w-1/2 md:w-1/2 w-full px-4">
              <div className="flex flex-col">
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={githubLink}
                  target="_blank"
                >
                  GitHub
                </Link>
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={linkedinLink}
                  target="_blank"
                >
                  LinkedIn
                </Link>
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={instagramLink}
                  target="_blank"
                >
                  Instagram
                </Link>
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={facebookLink}
                  target="_blank"
                >
                  Facebook
                </Link>
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={twitterLink}
                  target="_blank"
                >
                  Twitter
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full px-4">
              <div className="flex flex-col">
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={youtubeLink}
                  target="_blank"
                >
                  Youtube
                </Link>
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={discordLink}
                  target="_blank"
                >
                  Discord
                </Link>
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={communityGuidelines}
                  target="_blank"
                >
                  Community Guidelines
                </Link>
                <Link
                  className="pt-3 hover:underline w-fit hover:underline-offset-4"
                  href={termsAndConditions}
                >
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 font-semibold dark:font-normal flex-shrink-0 mx-10">
            {/* <svg
              width="67.248604"
              height="18.71397"
              className="text-primary"
              viewBox="0 0 67.248604 18.71397"
              fill="currentColor"
              version="1.1"
              id="svg17"
            >
              <g
                clip-path="url(#clip0_414_202)"
                id="g10"
                transform="translate(-11.7593,-51.28603)"
              >
                <path
                  d="m 27.0765,64.4165 c 0.0034,0.7355 -0.1434,1.4638 -0.4313,2.1406 -0.275,0.6564 -0.6704,1.2554 -1.1659,1.7662 -0.4992,0.5079 -1.0912,0.9154 -1.7438,1.2005 -0.6739,0.2987 -1.4035,0.4513 -2.1406,0.4476 h -8.0088 c -0.24,0.0035 -0.4782,-0.042 -0.7,-0.1337 -0.2218,-0.0916 -0.4225,-0.2275 -0.5901,-0.3994 -0.17,-0.1672 -0.305,-0.3666 -0.3971,-0.5865 -0.0922,-0.2199 -0.1396,-0.4559 -0.1396,-0.6944 0,-0.2384 0.0474,-0.4745 0.1396,-0.6944 0.0921,-0.2199 0.2271,-0.4193 0.3971,-0.5865 0.1676,-0.1718 0.3683,-0.3077 0.5901,-0.3994 0.2218,-0.0916 0.46,-0.1371 0.7,-0.1337 h 7.9498 c 0.252,0.003 0.5018,-0.0461 0.7339,-0.1441 0.2322,-0.098 0.4416,-0.2429 0.6151,-0.4256 0.1818,-0.1762 0.3257,-0.3876 0.4229,-0.6213 0.0973,-0.2337 0.1459,-0.4848 0.1428,-0.7379 0.0049,-0.2576 -0.0427,-0.5135 -0.1399,-0.7521 -0.0973,-0.2386 -0.2422,-0.4549 -0.4258,-0.6356 -0.1735,-0.1827 -0.3829,-0.3276 -0.6151,-0.4256 -0.2321,-0.098 -0.4819,-0.1471 -0.7339,-0.1442 h -3.7786 c -0.7472,0.0052 -1.4875,-0.143 -2.1751,-0.4354 -1.335,-0.5616 -2.397,-1.6236 -2.9586,-2.9586 -0.2873,-0.6895 -0.4352,-1.4291 -0.4352,-2.1761 0,-0.747 0.1479,-1.4866 0.4352,-2.1762 0.2795,-0.661 0.6837,-1.262 1.1904,-1.7703 0.5067,-0.5055 1.1019,-0.9138 1.756,-1.2045 0.6799,-0.3024 1.4167,-0.4557 2.1609,-0.4497 h 3.689 c 0.24,-0.0033 0.4781,0.0422 0.6999,0.1339 0.2217,0.0916 0.4226,0.2274 0.5901,0.3992 0.1703,0.1671 0.3055,0.3664 0.3978,0.5863 0.0923,0.2199 0.1399,0.4561 0.1399,0.6946 0,0.2385 -0.0476,0.4746 -0.1399,0.6945 -0.0923,0.22 -0.2275,0.4193 -0.3978,0.5864 -0.167,0.1732 -0.3674,0.3106 -0.5892,0.404 -0.2218,0.0934 -0.4602,0.1408 -0.7008,0.1392 h -3.7073 c -0.5066,0.0128 -0.9877,0.2249 -1.3389,0.5901 -0.3544,0.3707 -0.5521,0.8637 -0.5521,1.3765 0,0.5128 0.1977,1.0059 0.5521,1.3766 0.1741,0.1861 0.3856,0.3333 0.6205,0.4322 0.2349,0.0989 0.488,0.1471 0.7428,0.1416 h 3.7724 c 0.7486,-0.0048 1.4898,0.1485 2.1752,0.4496 0.6593,0.2872 1.2596,0.6942 1.7702,1.2006 0.5065,0.506 0.9106,1.105 1.1904,1.7641 0.2897,0.6833 0.4365,1.4187 0.4313,2.1609 z"
                  id="path2"
                />
                <path
                  d="m 36.5934,51.4654 c 2.0873,-0.3432 4.2293,0.0308 6.0769,1.061 1.8475,1.0302 3.2916,2.6558 4.0969,4.6119 0.8332,2.0637 0.9053,4.3565 0.2035,6.4685 -0.3145,0.9293 -0.7695,1.8049 -1.3491,2.5964 -0.9308,1.2629 -2.1692,2.2666 -3.5975,2.9158 -1.4134,0.6631 -2.9711,0.9598 -4.5293,0.8628 C 36.6835,69.9243 35.8835,69.7587 35.1161,69.4894 33.5895,68.957 32.2225,68.047 31.1422,66.8442 30.5987,66.242 30.14,65.5683 29.7789,64.8419 c -0.347,-0.7118 -0.6053,-1.4635 -0.7691,-2.2382 -0.1643,-0.7671 -0.228,-1.5524 -0.1892,-2.3359 0.0387,-0.7865 0.1698,-1.5658 0.3906,-2.3217 0.2219,-0.7621 0.5493,-1.4895 0.9727,-2.1609 0.1435,-0.2645 0.3082,-0.5169 0.4924,-0.7549 h 0.0285 c 0.7004,-0.9512 1.5881,-1.7489 2.6085,-2.344 1.0135,-0.5958 2.1237,-1.0091 3.2801,-1.2209 z m 6.267,12.4467 c 0.8127,-1.1909 1.1543,-2.6412 0.9584,-4.0696 -0.098,-0.662 -0.3144,-1.3009 -0.6389,-1.8862 -0.3825,-0.6908 -0.8944,-1.3015 -1.5078,-1.7987 -0.6108,-0.4982 -1.3245,-0.8547 -2.0897,-1.0439 -0.7548,-0.2125 -1.5463,-0.2617 -2.3216,-0.1444 -0.7843,0.1131 -1.5359,0.3905 -2.2057,0.8139 -0.8644,0.5528 -1.5666,1.3252 -2.0348,2.2382 -0.4796,0.9092 -0.7006,1.9325 -0.6389,2.9586 0.033,0.7901 0.2415,1.5631 0.6104,2.2626 0.0963,0.1737 0.1879,0.3527 0.2747,0.5372 0.0885,0.1863 0.1905,0.3658 0.3052,0.5372 -0.1736,-0.2903 -0.3377,-0.5901 -0.4924,-0.8994 0.3099,0.5613 0.7124,1.0662 1.1904,1.4935 0.4843,0.4352 1.0335,0.7922 1.6278,1.0581 0.614,0.2698 1.2731,0.4223 1.9432,0.4497 0.6692,0.0307 1.3383,-0.0625 1.9737,-0.2747 0.6155,-0.1917 1.194,-0.4861 1.7112,-0.8709 0.5148,-0.3804 0.9649,-0.8415 1.3328,-1.3653 z"
                  id="path4"
                />
                <path
                  d="m 63.1674,64.4165 c 2e-4,0.7362 -0.1501,1.4646 -0.4416,2.1406 -0.2749,0.6564 -0.6703,1.2554 -1.1659,1.7662 -0.4991,0.5079 -1.0911,0.9155 -1.7438,1.2005 -0.6739,0.2987 -1.4034,0.4513 -2.1405,0.4476 h -7.9987 c -0.24,0.0035 -0.4781,-0.042 -0.6999,-0.1337 -0.2218,-0.0916 -0.4226,-0.2275 -0.5901,-0.3994 -0.17,-0.1672 -0.305,-0.3666 -0.3972,-0.5865 -0.0921,-0.2199 -0.1396,-0.4559 -0.1396,-0.6944 0,-0.2384 0.0475,-0.4745 0.1396,-0.6944 0.0922,-0.2199 0.2272,-0.4193 0.3972,-0.5865 0.1675,-0.1718 0.3683,-0.3077 0.5901,-0.3994 0.2218,-0.0916 0.4599,-0.1371 0.6999,-0.1337 h 7.9498 c 0.252,0.003 0.5018,-0.0461 0.734,-0.1441 0.2321,-0.098 0.4415,-0.2429 0.6151,-0.4256 0.1817,-0.1762 0.3256,-0.3876 0.4229,-0.6213 0.0972,-0.2337 0.1458,-0.4848 0.1427,-0.7379 0.005,-0.2576 -0.0427,-0.5135 -0.1399,-0.7521 -0.0973,-0.2386 -0.2421,-0.4549 -0.4257,-0.6356 -0.1736,-0.1827 -0.383,-0.3276 -0.6151,-0.4256 -0.2322,-0.098 -0.482,-0.1471 -0.734,-0.1442 H 53.8543 C 53.1071,62.4622 52.3668,62.314 51.6791,62.0216 50.3442,61.46 49.2822,60.398 48.7205,59.063 c -0.2872,-0.6895 -0.4351,-1.4291 -0.4351,-2.1761 0,-0.747 0.1479,-1.4866 0.4351,-2.1762 0.2795,-0.661 0.6837,-1.262 1.1904,-1.7703 0.5067,-0.5055 1.1019,-0.9138 1.756,-1.2045 0.68,-0.3024 1.4168,-0.4557 2.1609,-0.4497 h 3.685 c 0.2399,-0.0033 0.478,0.0422 0.6998,0.1339 0.2218,0.0916 0.4226,0.2274 0.5902,0.3992 0.1702,0.1671 0.3055,0.3664 0.3978,0.5863 0.0923,0.2199 0.1398,0.4561 0.1398,0.6946 0,0.2385 -0.0475,0.4746 -0.1398,0.6945 -0.0923,0.22 -0.2276,0.4193 -0.3978,0.5864 -0.1686,0.1721 -0.3704,0.3081 -0.5933,0.3997 -0.2228,0.0917 -0.4619,0.1371 -0.7028,0.1334 h -3.7033 c -0.5066,0.0128 -0.9877,0.2248 -1.3389,0.59 -0.3543,0.3707 -0.5521,0.8638 -0.5521,1.3766 0,0.5128 0.1978,1.0058 0.5521,1.3765 0.1742,0.1861 0.3856,0.3334 0.6205,0.4322 0.2349,0.0989 0.488,0.1471 0.7428,0.1416 h 3.7725 c 0.7486,-0.0047 1.4898,0.1485 2.1751,0.4497 0.6594,0.2871 1.2596,0.6942 1.7703,1.2005 0.5032,0.5082 0.9039,1.1085 1.1801,1.7682 0.2941,0.6845 0.4444,1.4221 0.4416,2.167 z"
                  id="path6"
                />
                <path
                  d="m 78.4848,66.9112 c 0.1691,0.1691 0.3024,0.3704 0.3923,0.592 0.0898,0.2216 0.1342,0.459 0.1306,0.6981 0.0022,0.2368 -0.0428,0.4717 -0.1325,0.6909 -0.0896,0.2192 -0.222,0.4183 -0.3895,0.5858 -0.1674,0.1675 -0.3666,0.2999 -0.5858,0.3895 C 77.6807,69.9571 77.4458,70.0022 77.209,70 h -2.1487 c -1.2423,0.0067 -2.4723,-0.2455 -3.6117,-0.7407 -1.1061,-0.4758 -2.1131,-1.1549 -2.9687,-2.0022 -0.8532,-0.8498 -1.5374,-1.8537 -2.0165,-2.9585 -0.4919,-1.1455 -0.7456,-2.3792 -0.7456,-3.6259 0,-1.2468 0.2537,-2.4804 0.7456,-3.626 0.479,-1.1048 1.1633,-2.1087 2.0165,-2.9585 0.8547,-0.8509 1.8618,-1.5335 2.9687,-2.0124 1.1394,-0.4951 2.3694,-0.7474 3.6117,-0.7406 h 2.1467 c 0.2368,-0.0022 0.4717,0.0428 0.6909,0.1324 0.2192,0.0897 0.4183,0.2221 0.5858,0.3895 0.1675,0.1675 0.2999,0.3667 0.3895,0.5859 0.0896,0.2192 0.1347,0.4541 0.1325,0.6909 0.0037,0.2391 -0.0407,0.4765 -0.1305,0.6981 -0.0898,0.2216 -0.2233,0.4229 -0.3924,0.5919 -0.1635,0.1735 -0.3615,0.3109 -0.5812,0.4034 -0.2197,0.0925 -0.4563,0.1381 -0.6946,0.1338 h -2.1467 c -0.7632,-0.0059 -1.5192,0.1472 -2.2199,0.4497 -0.674,0.2925 -1.2886,0.7063 -1.813,1.2208 -0.5258,0.5178 -0.9447,1.1338 -1.2331,1.813 -0.2999,0.6965 -0.453,1.4474 -0.4496,2.2057 -0.0034,0.7527 0.1438,1.4984 0.4328,2.1934 0.2889,0.695 0.7139,1.3253 1.2499,1.8537 0.5241,0.515 1.1387,0.9288 1.813,1.2209 0.7005,0.3029 1.4567,0.4561 2.2199,0.4497 h 2.1467 c 0.2391,-0.0037 0.4763,0.0428 0.6964,0.1363 0.2201,0.0936 0.4181,0.2322 0.5814,0.4069 z"
                  id="path8"
                />
              </g>
              <defs id="defs15">
                <clipPath id="clip0_414_202">
                  <rect
                    width="90.091301"
                    height="70"
                    fill="#ffffff"
                    id="rect12"
                    x="0"
                    y="0"
                  />
                </clipPath>
              </defs>
            </svg> */}
            <Link href={websiteLink} className="w-fit" target="_blank">
              <div className="relative h-10 aspect-video">
                <SOSCLogo />
              </div>
            </Link>
            <Link href={websiteLink} target="_blank">
              <p className="font-semibold hover:underline w-fit hover:underline-offset-4 mt-3 text-lg">
                Sahyadri Open-Source Community
              </p>
            </Link>

            <p className="py-2">
              Sahyadri College of Engineering and Management, Adyar, Mangalore -
              575007 IN
            </p>
            <div className="flex lg:flex-row flex-col w-full">
              <Link
                className="pt-3 mr-5 hover:underline w-fit hover:underline-offset-4"
                href="mailto:sosc@sahyadri.edu.in"
                target="_blank"
              >
                sosc@sahyadri.edu.in
              </Link>
              <Link
                className="lg:pt-3 pt-2 hover:underline w-fit hover:underline-offset-4"
                href="tel:+918762458575"
                target="_blank"
              >
                +91 87624 58575
              </Link>
            </div>
          </div>
        </div>
        <div className="font-semibold dark:font-normal">
          <p className="md:py-5 py-10 px-5 text-center">
            SOSC © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
