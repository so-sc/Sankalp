


export const eventNameModel = {
    1: "",
    2: "",
    3: "",
    4: ""
}

export const yearModel = {
    1: "1st Year",
    2: "2st Year",
    3: "3st Year",
    4: "4st Year",
    5: "5st Year"
}

export const theme = {
    1: 'Healthcare',
    2: 'Finance',
    3: 'Communication',
    4: 'Gaming',
    5: 'Open'
}

export interface eventModel {
    stName: string,
    mail: string,
    college: string,
    branch: string,
    year: number,
    eventOpt: Array<number>,
    verify: Boolean,
    qrId: string,
}

export interface member {
    name: string,
    email: string,
    year: number,
}

export interface hackathonModel {
    TmName: string,
    college: string,
    theme: number,
    themeName: string,
    tlName: string,
    tlEmail: string,
    tlYear: number,
    memNo: number,
    member: Array<member>,
    verify: Boolean,
    qrId: string,
}
