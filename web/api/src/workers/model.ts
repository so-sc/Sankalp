
interface NameModel {
    [key: string]: { name: string, date: string; venue: string };
  }
  
export const EventNameModel: NameModel = {
    1: {
        name: "",
        date: "",
        venue: ""
    },
    2: {
        name: "",
        date: "",
        venue: ""
    },
    3: {
        name: "",
        date: "",
        venue: ""
    },
    4: {
        name: "",
        date: "",
        venue: ""
    },
    5: {
        name: "",
        date: "",
        venue: ""
    },
    6: {
        name: "",
        date: "",
        venue: ""
    },
}

export const TalkNameModel: NameModel = {
    1: {
        name: "",
        date: "",
        venue: ""
    },
    2: {
        name: "",
        date: "",
        venue: ""
    },
    3: {
        name: "",
        date: "",
        venue: ""
    },
    4: {
        name: "",
        date: "",
        venue: ""
    },
    5: {
        name: "",
        date: "",
        venue: ""
    },
    6: {
        name: "",
        date: "",
        venue: ""
    },
}

export const HackathonNameModel = {
    name: "Codeblaze",
    date: "8th December 2023",
    venue: "Sahyadri College of Engineering & Management"
}

export const YearModel = {
    1: "1st Year",
    2: "2st Year",
    3: "3st Year",
    4: "4st Year",
    5: "5st Year"
}

export const gender = {
    1: "Male",
    2: "Female",
    3: "Non Binary",
    4: "Other"
}

export const Theme = {
    1: 'Healthcare',
    2: 'Finance',
    3: 'Communication',
    4: 'Gaming',
    5: 'Open'
}

// Member
export interface Member {
    info: string,
    lead?: boolean
}

export interface Talk {
    id: number,
    verify?: boolean
}

// Event & Talk & Hackathon Interfaces & types
export interface EventModels {
    verify?: boolean,
    qrId?: string,
    isEvent: boolean,
    // Talk
    talk?: Array<Talk>,
    // Event
    event?: {
        eve?: number,
        participant?: Array<Member>
    }
}

export interface HackathonModel {
    name: string,
    theme: number,
    themeDesc: string,
    member: Array<Member>,
    verify?: Boolean,
    qrId?: string,
}


// Authentication interface
export interface SignupModal {
    name: string,
    email: string,
    gender: number,
    verify: boolean,
    student: boolean,
    PhNo: string,
    // Employee
    company?: string,
    designation?: string,
    // Student
    college?: string,
    branch?: string,
    course?: string,
    year?: number,
    // Auto added
    hack?: string,
    talk?: string,
    event?: Array<string>
}

export interface SigninModal {
    email: string,
    id: string
}

// Admin Model

export interface AdminSigupModel {
    username: string,
    email: string,
    isVolunter: boolean,
    volunter: {
        events: Array<number>
    }
}

export interface AdminSiginModel {
    username: string,
    id: string
}


// ----------- Response Models ---------

export interface UserResponseModal {
    name: string,
    email: string,
    gender: number,
    verify: boolean,
    PhNo: string,
    // Employee
    company?: string,
    designation?: string,
    // Student
    college?: string,
    branch?: string,
    course?: string,
    year?: number,
    // Auto added
    hacks?: object,
    talks?: object,
    events?: Array<object>
}