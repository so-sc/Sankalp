
interface NameModel {
    [key: string]: { name: string, date: string; venue: string, max: any, due: string };
  }
  
// Keys start from 1 guys sadly deveesh believes this is an array. May key value pair be with you..
export const EventNameModel: NameModel = {
    1: {
        name: "DeCode: Capture the flag",
        date: "9th December 2023 at 2:00PM to 3:00PM",
        venue: "Digital Library - First Floor",
        max: 18,
        due: "2023-12-09T15:30:00.234Z"
    },
    2: {
        name: "Open Source Fiesta",
        venue: "Online (Github)",
        date: "6th to 8th December 2023",
        max: 100,
        due: "2023-12-06T00:30:00.234Z"
    },
    3: {
        name: "BlindByte: Blind coding",
        venue: "CSE Lab 7",
        date: "9th December 2023 at 10:00AM to 03:00PM",
        max: 100,
        due: "2023-12-09T15:50:00.234Z"
    },
    4: {
        name: "The Pitchers",
        date: "CoE Board Room - Ground floor",
        venue: "8th December 2023 at 9.30 AM to 10.30AM",
        max: 100,
        due: "2023-12-08T10:00:00.234Z"
    },
    5: {
        name: "TechMaze: Escape Room",
        venue: "MBA Classrooms (3)",
        date: "8th December 2023 at 11:30AM to 01:00PM",
        max: 55,
        due: "2023-12-08T13:30:00.234Z"
    },
    6: {
        name: "The Wolf of Dalal Street",
        venue: "Online (StockGro)",
        date: "8th December 2023 at 09:00AM to 03:30PM",
        max: 100,
        due: "2023-12-07T16:30:00.234Z"
    },
}

export const TalkNameModel: NameModel = {
    1: {
        name: "",
        date: "",
        venue: "Seminar Hall - First Floor",
        max: [150, 500],
        due: "2023-12-08T15:30:00.234Z"
    },
    2: {
        name: "",
        date: "",
        venue: "",
        max: 100,
        due: "2023-12-05T08:30:00.234Z"
    },
    3: {
        name: "",
        date: "",
        venue: "",
        max: 100,
        due: "2023-12-05T08:30:00.234Z"
    },
    4: {
        name: "",
        date: "",
        venue: "",
        max: 100,
        due: "2023-12-05T08:30:00.234Z"
    },
    5: {
        name: "",
        date: "",
        venue: "",
        max: 100,
        due: "2023-12-05T08:30:00.234Z"
    },
    6: {
        name: "",
        date: "",
        venue: "",
        max: 100,
        due: "2023-12-05T08:30:00.234Z"
    },
}

export const HackathonNameModel = {
    name: "Codeblaze",
    date: "8th December 2023",
    venue: "Sahyadri College of Engineering & Management",
    max: 360
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

export const Role = {
    1: "Maintainer", // You know who check contributors
    2: "Administrator", // Coordinator, Event Management
    3: "Marketing & Promotion", // Marketing & Promotion
    4: "Volunteer Head", // Volunteer head
    5: "Leads", // Event Leads
    6: "Volunteers" // Volunteers
}

export interface AdminPrivilege {
    stats: [true, true, true, true, true, false],
    email: [true, true, true, true, true, false],
    massEmail: [true, true, true, true, true, false],
    allEmail: [true, true, true, false, false, false],
    
}

export interface AdminSigupModel {
    _id: any,
    username: string,
    role: number,
    volunter?: {
        hack: boolean,
        events: Array<number>,
        talks: Array<number>
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


export interface HackathonResponseModel {
    theme: number,
    data: Array<{
        name: string,
        themeDesc: string,
        member: {
            info: any,
            lead?: boolean
        }[],
        verify?: Boolean
    }>
}

export interface EventResponseModel {
    eve: number,
    data: Array<{
        verify: boolean,
        qrId: string,
        participant: {
            info: any,
            lead?: boolean
        }[]
    }>
}



/* ------- HTML Base Code ----------- */

export const buttonCode = async (title: any, url: any) => {
    if (!(title && url)) {
        return ''
    }
    return `<table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin-left:auto;margin-right:auto;padding:0.5rem">
        <tbody>
            <tr style="width:100%">
                <td>
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:20px;margin-top:0px;text-align:center">
                    <tbody>
                        <tr>
                            <td>
                                <a href="${url}" target="_blank" style="border:2px solid #09dc43;line-height:1.25rem;text-decoration:none;display:inline-block;max-width:100%;padding:12px 34px;font-size:0.875rem;font-weight:500;text-decoration-line:none;background-color:rgb(9,220,67);color:rgb(239,239,239);border-color:rgb(9,220,67);border-radius:9999px"><span></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">${title}</span><span></span></a></td>
                        </tr>
                    </tbody>
                </table>
                </td>
            </tr>
        </tbody>
    </table>`
}

export const paraCode = async (data: string[]) => {
    var base = ``;
    for (const text of data) {
        base += `<p style="
        font-size: 15px;
        line-height: 24px;
        margin: 16px 0;
        margin-bottom: 20px;
        margin-top: 0px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
    ">
            ${text}   
        </p>`
    }
    return base
}