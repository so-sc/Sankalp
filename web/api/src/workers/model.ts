
interface NameModel {
    [key: string]: { name: string, date: string; venue: string, max: any, due: string };
}
  
// Keys start from 1 guys sadly deveesh believes this is an array. May key value pair be with you..
export const EventNameModel: NameModel = {
    1: {
        name: "",
        date: "",
        venue: "",
        max: 0,
        due: ""
    },
}

export const TalkNameModel: NameModel = {
    1: {
        name: "Test Talk 1",
        date: "9th December 2023 at 2:00PM to 3:00PM",
        venue: "Seminar Hall - Ground Floor",
        max: [150, 500],
        due: "2024-05-28T15:30:00.234Z"
    },
    2: {
        name: "Test Talk 2",
        date: "9th December 2023 at 2:00PM to 3:00PM",
        venue: "Seminar Hall - Ground Floor",
        max: [150, 500],
        due: "2024-06-08T15:30:00.234Z"
    },
    3: {
        name: "Test Talk 3",
        date: "9th December 2023 at 2:00PM to 3:00PM",
        venue: "Seminar Hall - Ground Floor",
        max: [150, 500],
        due: "2024-06-08T15:30:00.234Z"
    },
    4: {
        name: "Test Talk 4",
        date: "9th December 2023 at 2:00PM to 3:00PM",
        venue: "Seminar Hall - Ground Floor",
        max: [150, 500],
        due: "2024-06-08T15:30:00.234Z"
    },
}

export const HackathonNameModel = {
    name: "DevHost",
    date: "15th June 2024",
    venue: "Sahyadri College of Engineering & Management",
    max: 403,
    due: "2023-12-08T08:30:00.234Z"
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

export const toDo = {
    1: "Send to all hackathon team leaders",
    2: "Send to all hackathon participant",
    3: "Send to participants of particular event",
    4: "Send to all participants of event",
    5: "broadcast to all"
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
    qrId?: string,
    isEvent: boolean,
    // Talk
    attendee?: any,
    talk?: Array<Talk>,
    // Event
    event?: {
        eve?: number,
        participant?: Array<Member>,
        verify?: boolean
    }
}

export interface HackathonModel {
    name: string,
    theme: number,
    themeDesc: string,
    member: Array<Member>,
    shortlisted: Boolean,
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
    password: string,
    // Employee
    company?: string,
    designation?: string,
    // Student
    college?: string,
    branch?: string,
    course?: string,
    year?: number
}

export interface SigninModal {
    email: string,
    password: string
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
    // other data
    hacks?: any,
    events?: any,
    talks?: any
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