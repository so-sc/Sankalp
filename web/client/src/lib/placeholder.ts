import { HackathonTeam, UserProfile } from "@/lib/types"

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
