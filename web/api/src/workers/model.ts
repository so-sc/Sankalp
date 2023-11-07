

export const EventNameModel = {
    1: "Event 1",
    2: "Event 2",
    3: "Event 3",
    4: "Event 4",
    5: "Event 5",
    6: "Event 6",
}

export const TalkNameModel = {
    1: "Talk 1",
    2: "Talk 2",
    3: "Talk 3",
    4: "Talk 4",
    5: "Talk 5",
    6: "Talk 6",
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

export interface Member {
    info: string,
    lead: boolean
}

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
}

export interface SigninModal {
    email: string,
    id: string
}

// User Interfaces & types
export interface EventModels {
    verify: boolean,
    qrId: string,
    event?: boolean,
    // Talk
    talk?: Array<number>,
    // Event
    eventInfo: {
        eve: number,
        pno: number,
        participant: Array<Omit<Member, "lead">>
    }
}

export type EventModelE = Omit<EventModels, "talk">;
export type EventModelT = Omit<EventModels, "eventInfo">



export interface HackathonModel {
    name: string,
    theme: number,
    themeName: string,
    memNo: number,
    member: Array<Member>,
    verify: Boolean,
    qrId: string,
}


// Admin Interfaces & types


// export interface

