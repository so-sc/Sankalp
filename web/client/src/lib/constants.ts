export const MAIN_EVENT_NAME = "Devhost 2024"
export const MAIN_EVENT_WEBSITE = "https://devhost.sosc.org.in/"

export const numberDisplay = ["1st", "2nd", "3rd", "4th", "5th"]
export const genders = ["male", "female", "non-binary", "other"] as const

// Events
export const TOTAL_TALKS = 6
export const TOTAL_ESPORTS = 2

// Change this to change the event name of talks and esports
export const TALKS = [
  "How to suck at writing Dates - Deveesh Shetty",
  "How to be a God - Akkil MG",
  "Intro to HTML (How to meet Ladies) - Tejas Nayak",
  "How to do damage control - Varshaa Shetty",
  "Asking sponsorships 101 - Pratheeksha",
  "How to ethically get full CGPA - Sushruth Rao",
]
export const ESPORTS = ["Ludo 1v1v1v1", "Candy Crush Saga"]

// Hackathon registration
export const MIN_MEMBERS = 2 // Including the leader
export const MAX_MEMBERS = 4 // Including the leader
export const THEMES = ["Company Specific"] as const

export const HACKATHON_NAME = "Devhost"

// Event: Codeblaze
// Event order should be same always - don't change
// 1. DeCode
// 2. Open Source Fiesta
// 3. Blind Bytes
// 4. The Pitchers
// 5. Tech-maze
// 6. The Wolf of Dalal Street

export const EVENTS_DETAILS = [
  {
    name: "DeCode",
    actualName: "Ethical Hacking",
    minMember: 2,
    maxMember: 2,
    message: "Prerequisite: Bring your own laptop to the event",
    link: "/decode",
  },
  {
    name: "Open Source Fiesta",
    actualName: "Open Source Contributions",
    message: "This is an online event",
    minMember: 1,
    maxMember: 1,
    link: "/open-source-fiesta",
  },
  {
    name: "Blind Bytes",
    actualName: "Blind Coding",
    minMember: 2,
    maxMember: 2,
    message: "Prerequisite: Have intermediary knowledge on programming.",
    link: "/blind-bytes",
  },
  {
    name: "The Pitchers",
    actualName: "Startup Pitch",
    minMember: 2,
    maxMember: 4,
    link: "/the-pitchers",
  },
  {
    name: "Tech-maze",
    actualName: "Escape Room",
    minMember: 2,
    maxMember: 2,
    link: "/tech-maze",
  },
  {
    name: "The Wolf of Dalal Street",
    actualName: "Stock market trading",
    message: "This is an online event",
    minMember: 1,
    maxMember: 1,
    link: "/trading",
  },
]

export const EVENTS_PATHS = EVENTS_DETAILS.map((event) => event.link)

// Admin Constants
export const ADMIN_ROLES = [
  "Maintainer",
  "Administrator",
  "Marketing & Promotion",
  "Volunteer Head",
  "Leads",
  "Volunteers",
] as const
