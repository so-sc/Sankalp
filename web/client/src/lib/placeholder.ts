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
  teamTheme: "Agriculture",
  teamStatement:
    "Our problem statement focuses on plant health and disease recognition using AI.",
  teamCollege: "Sahyadri College of Engineering and Management",
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
      name: "Akkil MG",
      email: "akkil@gmail.com",
      phone: "7894561230",
      year: "3",
    },
    {
      name: "Srujan Rai",
      email: "srujan@gmail.com",
      phone: "4567891230",
      year: "2",
    },
  ],
}
