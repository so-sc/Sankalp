import {
  HackathonAdminApiResult,
  HackathonTeam,
  UserProfile,
} from "@/lib/types"

export const userProfile: UserProfile = {
  user: {
    name: "Deveesh Shetty",
    email: "deveeshshetty@gmail.com",
    phone: "1234567890",
    gender: "male",
    role: {
      role: "student",
      college: "Sahyadri College of Engineering and Management",
      course: "BE",
      branch: "CSE",
      yearOfStudy: "3",
    },
  },
  event: {
    talks: [false, false, true, true, false, true],
    esports: [true, false],
  },
}

export const hackathonTeam: HackathonTeam = {
  teamName: "Rudra",
  totalMembers: 3,
  teamTheme: "Company Specific",
  teamStatement:
    "Our problem statement focuses on plant health and disease recognition using AI.",
  leader: {
    name: userProfile.user.name,
    email: userProfile.user.email,
    phone: userProfile.user.phone,
    year:
      userProfile.user.role.role === "student"
        ? userProfile.user.role.yearOfStudy
        : "2",
  },
  members: [
    {
      email: "akkil@gmail.com",
    },
    {
      email: "srujan@gmail.com",
    },
  ],
}

export const HackathonAdminResponse: HackathonAdminApiResult[] = [
  {
    _id: "6532509a88142c86c59c029f",
    TmName: "NightHawks",
    college: "Sahyadri College of Engineering & Management",
    theme: "1",
    themeName: "Ambulance alert application",
    tlName: "Akkil M G",
    tlEmail: "kvd1plg1@seemsgood.us",
    tlYear: 3,
    tlPhNo: 1234567890,
    memNo: 2,
    member: [
      {
        name: "Deveesh Shetty",
        email: "rundbvxw@seemsgood.us",
        year: "3",
        _id: "6532509a88142c86c59c02a0",
      },
    ],
    verify: false,
    createdAt: "2023-10-20T10:04:10.899Z",
    updatedAt: "2023-10-20T10:04:10.899Z",
    __v: 0,
  },
]
