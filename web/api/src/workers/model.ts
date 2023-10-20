
export const EventNameModel = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
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

// User Interfaces & types
export interface EventModels {
    stName: string,
    mail: string,
    eventOpt: Array<number>,
    verify: boolean,
    qrId: string,
    gender: number,
    student: boolean,
    // Employee
    company?: string,
    designation?: string,
    // Student
    college?: string,
    
    branch?: string,
    course?: string,
    year?: number,
}

export type EventModelS = Omit<EventModels, "company" | "designation">;
export type EventModelE = Omit<EventModels, "college" | "branch" | "course" | "year">;

export interface Member {
    name: string,
    email: string,
    year: number
}

export interface HackathonModel {
    TmName: string,
    college: string,
    theme: number,
    themeName: string,
    tlName: string,
    tlEmail: string,
    tlYear: number,
    tlPhNo: number,
    memNo: number,
    member: Array<Member>,
    verify: Boolean,
    qrId: string,
}


// Admin Interfaces & types


// export interface

