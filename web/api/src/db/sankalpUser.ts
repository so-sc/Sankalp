//

import mongo from "mongoose";
import { paraCode, buttonCode, EventResponseModel, EventNameModel, TalkNameModel, HackathonNameModel, EventModels, HackathonModel, Member, SigninModal, SignupModal, Talk, UserResponseModal, gender, HackathonResponseModel } from "../workers/model";
import { createToken } from "../workers/auth";
import { sendAdminEventMail, sendAdminHackathonMail } from "../workers/mail";

const userRegisteration = new mongo.Schema<SignupModal>({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    gender: {
        type: Number,
        require: true
    },
    verify: {
        type: Boolean,
        default: false,
        require: true
    },
    student: {
        type: Boolean,
        require: true
    },
    PhNo: {
        type: String,
        require: true
    },
    // Employee
    company: {
        type: String,
        require: false
    },
    designation: {
        type: String,
        require: false
    },
    // Student
    college: {
        type: String,
        require: false
    },
    branch: {
        type: String,
        require: false
    },
    course: {
        type: String,
        require: false
    },
    year: {
        type: Number,
        require: false
    },
    // Autoadded
    hack: {
        type: String,
        require: false
    },
    talk: {
        type: String,
        require: false
    },
    event: {
        type: [String],
        require: false
    }
}, {
    collection: "users",
})

export const User = mongo.model('users', userRegisteration);
export const UserRegisters = (st: boolean) => { return User.find( { student: st } ); }
export const UserRegistersBy = (param: any) => { return User.find({ param }); }
export const UserRegisterByID = async (id: String) => {
    return await User.findById(id);
}

export const UserRegisterForHackNEvent = async (id: String) => {
    return await User.findById(id).select('-_id -hack -talk -event -__v');
}

export const UserRegisterGetDetails = async () => {
    try {
        let rs = await User.find({}).select('-_id -hack -event -talk')
        return { success: true, data: rs}
    } catch (e) {
        return { success: true, message: 'Something went wrong.' }
    }
}

export const UserRegisterGetInfoDetails = async (info: string) => {
    try {
        let rs = (info==='e')?(await User.find({}).select('name email -_id')):(await User.find({}).select('name PhNo -_id'))
        return { success: true, data: rs }
    } catch (e) {
        return { success: true, message: 'Something went wrong.' }
    }
}

export const UserRegisterByMail = async (email: string) => {
    return await User.findOne({ email: email })
}

export const UserRegisterMailByID = async (id: String) => {
    return await User.findOne({ _id: id }).select('email')
}

export const UserRegisterTotal = async () => {
    return await User.countDocuments()
}

export const UserRegisterGender = async () => {
    return await User.aggregate([
        { $group: {
            _id: "$gender",
            count: { $sum: 1 }
        } }, { $project: {
            type: '$_id',
            count: 1,
            _id: 0
        } }
    ])
}

export const UserRegisterStudent = async () => {
    return await User.aggregate([
        { $group: {
            _id: "$student",
            count: { $sum: 1 }
        } }, { $project: {
            isStudent: '$_id',
            count: 1,
            _id: 0
        } }
    ])
}

export const UserRegisterYear = async () => {
    return await User.aggregate([
        { $match: {
              year: { $exists: true, $ne: null }
        } }, { $group: {
            _id: "$year",
            count: { $sum: 1 }
        } }, { $project: {
            yearStudent: '$_id',
            count: 1,
            _id: 0
        } }
    ])
}

export const UserRegisterGetInfoByMail = async (email: string) => {
    try {
        let data: any = await User.findOne({ email: email }).select("name PhNo company designation college branch course year hack -_id");
        if (!data) {
            return { success: false, message: 'Check the provided email.' }
        }
        if (data.hack) {
            return { success: false, message: 'Already in a team.' }
        }
        delete data.hack;
        return { success: true, data: data }
    } catch (e) {
        console.log(`db>sankalpUser>UserRegisterGetInfoByMail: ${e.message}`);
        return { success: false, message: 'Some error in fetching the data.' }
    }
}

export const UserDeleteByID = async (id: string) => {
    try {
        await User.deleteOne({ _id: id })
    } catch (e) {
        console.log("EventDelete: Was unable to do");
        
    }
}

export const UserRegistersFindUser = async (id: String) => {
    var res: any = await User.findById(id).select("-_id -__v");
    var data: UserResponseModal = {
        name: res.name,
        email: res.email,
        gender: res.gender,
        verify: res.verify,
        PhNo: res.PhNo
    };
    if (res.student) {
        data.college = res.college;
        data.branch = res.branch;
        data.course = res.course;
        data.year = res.year;
    } else {
        data.company = res.company;
        data.designation = res.designation;
    }
    try {
        var temp: any;
        if (res.hack) {
            var hk: any = await Hackathon.findById(res.hack).select("-__v");
            var hackon: any = {
                name: hk.name,
                theme: hk.theme,
                themeDesc: hk.themeDesc,
                verify: hk.verify,
                qrId: hk.qrId,
            }
            hackon.member = Array();
            for (const member of hk.member) {
                try {
                    temp= await User.findById(member.info).select('name email -_id');
                    if (member.lead) {hackon.hacklead = true}
                    if (temp) { hackon.member.push(temp) } else { 
                        return { success: false, message: "Unable to find the user in the team, Please contact developer for support." } 
                    }
                } catch (e) {}
            }
            data.hacks = hackon;
        }
        if (res.talk) {
            data.talks = await Event.findById(res.talk).select('-_id -isEvent -__v');
        }
        if (res.event) {
            var eve = res.event;
            data.events = Array();
            for(const idx of eve) {
                try {
                    var et: any = await Event.findById(idx).select('-_id -isEvent -__v');
                    var event: any = {
                        verify: et.verify,
                        qrId: et.qrId,
                        event: {
                            eve: et.event.eve
                        }
                    }
                    const part = et.event.participant;
                    event.event.participant = Array();
                    for (const participant of part) {
                        temp = await User.findById(participant.info).select('name email -_id');
                        if (participant.lead) { temp.lead = participant.lead }
                        event.event.participant.push(temp);
                    }
                    data.events.push(event);
                } catch (e) {}
            }
        }
        return { success: true, data: data }
    } catch (e) {
        console.log(`db>sankalpUser>UserRegistersFindUser: ${e}`);
        return { success: false, message: `Error: ${e.message}` }
    }
}

export const UserRegistersPhoneNumber = async (values: any) => {
    try {
        let data = values.map((id: string) => new mongo.Types.ObjectId(id));
        var res = (await User.aggregate([
            { $match: { _id: { $in: data } } },
            { $group: { _id: null, data: { $push: {name: "$name", phone: "$PhNo"} } } },
            { $project: { _id: 0, data: "$data" } }
        ]))[0]["data"];
        return { success: true, data: res }
    } catch(e) {
        console.log();
        return { success: false, message: "Something went wrong.." }
    }
}
 
export const UserRegistersGetIDByMail = async (mail: string) => {
    if (await User.findOne({ email: mail })) {
        return { success: true, id: (await User.findOne({ email: mail }))._id.toString() }
    } else {
        return { success: false, message: "Check your Email id. The user may not have registered" }
    }
}

export const UserRegister = async (data: any) => {
    try {
        if (await User.findOne({ email: data.email })) {
            return { success: false, message: "The Email ID already exists." }
        }
        const user = new User(data);
        const info = await user.save();
        return { success: true, id: info._id.toString() }
    } catch (e) {
        console.log(`db>sankalpUser>UserRegister: ${e}`)
        return { success: false, message: 'The data provided is invalid. Check the fields again.' }
    }
}

export const UserRegistersVerifyByID = async (id: string) => {
    const rs = await User.find({ _id: new mongo.Types.ObjectId(id), verify: true});
    if (rs.length!==0) {
        return { success: false, message: 'Attendee is already verified.' }
    }else if (await User.findById(id)) {
        await User.updateOne({ _id: new mongo.Types.ObjectId(id) }, { $set: { verify: true }})
        return { success: true }
    } else {
        return { success: false, message: 'The data is invalid.' }
    }
}

export const UserSigninChecker = async (data: SigninModal) => {
    try {
        var result = await User.findOne({ _id: data.id, email: data.email });
        if (result) {
            var rs = await createToken(data.id);
            if (rs.success) {
                return { success: true, token: rs.token, verify: result.verify };
            } else {
                return { success: false, message: rs.message }
            }
        } else {
            return { success: false, message: "Attendee not found." }
        }
    } catch (e) {
        return { success: false, message: 'The ID is invalid.' }
    }
}


const eventRegistration = new mongo.Schema<EventModels>({
    isEvent: {
        type: Boolean,
        require: true
    },
    talk: {
        type: [{
            id: {
                type: Number,
                require: false
            },
            verify: {
                type: Boolean,
                default: false
            },
            _id: false
        }],
        require: false
    },
    event: {
        type: {
            eve: {
                type: Number,
                require: false
            },
            participant: {
                type: [{
                    info: { type: String, require: false },
                    lead: { type: Boolean, require: false },
                    _id: false
                }],
                require: false
            },
        },
        required: false
    },
    verify: {
        type: Boolean,
        default: false
    }, 
    qrId: {
        type: String,
        require: false
    },
}, {
    collection: "events",
    timestamps: true,
})

eventRegistration.pre('save', function (next) {
    try{
        if (!this.isEvent) {
            // Convert the talk array into a Set to remove duplicates
            const uniqueTalks = this.talk.map(talk => talk.id); // Assuming each talk has an 'id' property
            this.talk = Array.from(new Set(uniqueTalks)).map(id => ({ id: id, verify: false }));
        } else {
            this.set('talk', undefined);
        }
        next();
    } catch(e) {}
});


// Event Registration
export const Event = mongo.model('events', eventRegistration);
export const EventRegisters = async (st: boolean) => { return await Event.find( { student: st } ); }
export const EventRegistersBy = async (param: any) => { return await Event.find({ param }); }
export const EventRegisterByID = async (id: String) => {
    return await Event.findById(id);
}

export const EventRegisterFindDetailsByID = async (id: String) => {
    return await Event.findById(id);
}

export const EventDeleteByID = async (id: string) => {
    try {
        await Event.deleteOne({ _id: id })
    } catch (e) {
        console.log("EventDelete: Was unable to do");
        
    }
}

export const EventRegister = async (id: string, data: any) => {
    let info;
    try { 
        if (data.isEvent) {
            try {
                if ((new Date()) > (new Date(EventNameModel[data.event.eve].due))) {
                    return { success: false, message: `The registration is closed for ${EventNameModel[data.event.eve].name}.` }
                }
                if ((await Event.aggregate([
                    { $match: { isEvent: {$exists: true, $eq: true}, 'event.eve': {$exists: true, $eq: data.event.eve } } },
                    { $count: "count" }
                ]))[0]["count"]+data.event.participant.length > Number(EventNameModel[data.event.eve]['max'])) {
                    return { success: false, message: `The event registration of ${EventNameModel[data.event.eve]['name']} is closed.` }
                }
            } catch (e) {}
            data.event.participant.map((member: Member) => {
                if(!(User.findOne({ email: member.info }))){return { success: false, message: `The ${member.info} is not registered. Check your Email ID or Confirm whether the participant is registered in the platform.` } } 
            } );
            data.event.participant.push({ info: (await User.findOne({_id: id})).email, lead: true });
            for (const member of data.event.participant) {
                let user = await User.findOne({ email: member.info });
                if (user && user.event) { 
                    for (const event of user.event) {
                        const foundEvent = await Event.findOne({ _id: event });
                        try{
                            if (foundEvent.event.eve===data.event.eve) {
                                return { success: false, message: `The ${member.info} is already in an event. Opt someone else.` };
                            }
                        } catch (e) {}
                    }
                }
            }
            for (const participant of data.event.participant) {
                const rs = await UserRegistersGetIDByMail(participant.info);
                if (!rs.success) { return rs; }
                participant.info = rs.id;
            }
            data.verify = false; 
        } else {
            // if ((new Date())>(new Date(TalkNameModel[data.talk].due))) {
            //     return { success: false, message: `The registration is closed for ${EventNameModel[data.eve].name}.` }
            // }
            for (const talk of data.talk) {
                if ((await Event.aggregate([
                    { $match: { isEvent: {$exists: true, $eq: false}, 'talk': { $elemMatch: { id: talk.id } } } },
                    { $count: "count" }
                ]))[0]["count"]+1 > Number(TalkNameModel[data.eve]['max'][0])) {
                    return { success: false, message: `The talk registration of ${TalkNameModel[data.eve]['name']} is closed.` }
                }
            }
        }
        const event = new Event(data);
        info = await event.save();
        if (data.isEvent) {
            var ids = data.event.participant.map((participant: Member) => participant.info);
            await User.updateMany(
                { _id: { $in: ids } },
                { $addToSet: {event: info._id} }
            );
        } else {
            await User.updateOne(
                { _id: id },
                { $set: { talk: info._id } }
            );
        }
        return { success: true, id: info._id.toString() }
    } catch (e) {
        console.log(e);
        try {
            if (info._id.toString()) {
                await Event.deleteOne({ _id: info._id.toString() })
            }
        } catch (e) {
            return { success: false, message: 'Application failed to register. Do check the provided fields.' }
        }
        return { success: false, message: 'Application failed to register. Do check the provided fields.' }
    }
}

export const EventQRAdder = async (id: string, qId: string) => {
    await Event.updateOne(
        { _id: new mongo.Types.ObjectId(id) },
        { $set: { qrId: qId } }
    )
}


export const EventRegisterTeamScrapper = async (data: any) => {
    try {  
        var res = data;
        for (const information of res) {
            for (const member of information.participant) {
                member.info = await UserRegisterForHackNEvent(member.info);
            }
        }
        return { success: true, data: res }
    } catch (e){
        console.log(e, e.message);
        return { success: false, messsage: "Fetching data went wrong.."}
    }
}

export const EventRegisterAll = async () => {
    try{
        let rs: EventResponseModel[] = (await Event.aggregate([
            { $match: { isEvent: true } },
            { $group: { _id: "$event.eve", data: { $push: { verify: '$verify', qrId: '$qrId', participant: '$event.participant' } } } },
            { $project: { _id: 0, theme: '$_id', data: "$data" } }
        ]))
        for (const rp of rs) {
            var res = await EventRegisterTeamScrapper(rp.data);
            if (!res.success) {
                return { success: false, message: res.messsage }
            }
            rp.data = res.data;
        }
        return { success: true, data: rs }
    } catch (e) {
        console.log(`db>sankalpUser>EventRegisterAll: ${e.message}`);
        return { success: false, message: 'Something went wrong' }
    }
}


export const EventSendEmailAll = async (data: any) => {
    try {
        let unable = Array();
        let res = (await Event.aggregate([
            { $match:{ isEvent: true } },
            { $group: { _id: null, data: { $push: { info: "$event.participant.info" } } } }, 
            { $unwind: "$data" }, { $unwind: "$data.info" },  
            { $group: { _id: 0, info: { $addToSet: "$data.info" } } },
            { $project: { _id: 0, info: "$info" } }
        ]))[0]['info'];
        for (const reso of res) {
            let result = await sendAdminEventMail((await UserRegisterMailByID(reso)).email, data.subject, await paraCode(data.p), await buttonCode(data.button.title, data.button.url));
            if (!result.success) {
                unable.push(reso);
            }
        }
        return { success: true, data: unable.length?`Unable to send mail to ${unable.join(',')}`:`Sent mail to everyone successfully.`}
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong.'}
    }
}

export const EventSendEmailEve = async (eve: number, data: any) => {
    try {
        let unable = Array();
        let res = (await Event.aggregate([
            { $match:{ isEvent: true, "event.eve": eve } },
            { $group: { _id: null, data: { $push: { info: "$event.participant.info" } } } }, 
            { $unwind: "$data" }, { $unwind: "$data.info" },  
            { $group: { _id: 0, info: { $addToSet: "$data.info" } } },
            { $project: { _id: 0, info: "$info" } }
        ]))[0]['info'];
        for (const reso of res) {
            let result = await sendAdminEventMail((await UserRegisterMailByID(reso)).email, data.subject, await paraCode(data.p), await buttonCode(data.button.title, data.button.url));
            if (!result.success) {
                unable.push(reso);
            }
        }
        return { success: true, data: unable.length?`Unable to send mail to ${unable.join(',')}`:`Sent mail to everyone successfully.`}
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong.'}
    }
}

export const EventRegisterOfEvent = async (eve: number) => {
    try {
        let rs: any = (await Event.aggregate([
            { $match: { isEvent: true, 'event.eve': eve } },
            { $group: { _id: null, data: { $push: { verify: '$verify', qrId: '$qrId', participant: '$event.participant' } } } },
            { $project: { _id: 0, data: "$data" } }
        ]))[0]
        var res = await EventRegisterTeamScrapper(rs.data);
        if (!res.success) {
            return { success: false, message: res.messsage }
        }
        return { success: true, data: res.data }
    } catch (e) {
        console.log(`db>sankalpUser>EventRegisterOfEvent: ${e.message}`);
        return { success: false, message: 'Something went wrong' }
    }
}


export const EventRegistersGetPhoneNo = async () => {
    try {
        var info = (await Event.aggregate([
            { $match: { isEvent: true } },
            { $unwind: "$event.participant" },
            { $group: { _id: "$event.eve", info: { $push: "$event.participant.info" } } },
            { $project: { _id: 0, info: "$info" } }
        ]))
        var data = await Promise.all(info.map(async (id) => { return (await UserRegistersPhoneNumber(id.info)).data }));
        return { success: true, data: data }
    } catch (e) {
        return { success: false, message: "Something went wrong." }
    }
}

export const EventRegistersGetEventPhoneNo = async (eve: number) => {
    try {
        var info = (await Event.aggregate([
            { $match: { isEvent: true, 'event.eve': eve } },
            { $unwind: "$event.participant" },
            { $group: { _id: null, info: { $push: "$event.participant.info" } } },
            { $project: { _id: 0, info: "$info" } }
        ]))[0]['info']
        var data = await UserRegistersPhoneNumber(info);
        if (!data.success) {
            return { success: false, message: data.message}
        }
        return { success: true, data: data.data }
    } catch (e) {
        return { success: false, message: "Something went wrong." }
    }
}

export const EventCount = async () => {
    try {
        return {
            total: (await Event.aggregate([
                { $match: { isEvent: true } },
                { $group: { _id: null, totalCount: { $sum: 1 } } }, 
                { $project: { _id: 0, count: "$totalCount" } }
            ]))[0]["count"],
            event: await Event.aggregate([
                { $match: { isEvent: true } },
                { $group: { _id: "$event.eve", count: { $sum: 1 } } },
                { $project: { type: '$_id', count: 1, _id: 0 } }
            ])
        }
    } catch(e) {
        return null
    }
}

export const TalkCount = async () => {
    try {
        return {
            total: (await Event.aggregate([
                { $match: { isEvent: false } },
                { $group: { _id: null, totalCount: { $sum: 1 } } }, 
                { $project: { _id: 0, count: "$totalCount" } }
            ]))[0]["count"],
            talk: await Event.aggregate([
                { $match: { isEvent: false } },
                { $group: { _id: "$talk", count: { $sum: 1 } } },
                { $project: { type: '$_id', count: 1, _id: 0 } }
            ])
        }
    } catch(e) {
        return null
    }
}

export const EventRegistersVerifyEvent = async (id: string) => {
    if (await Event.find({ _id: new mongo.Types.ObjectId(id), verify: true})) {
        return { success: false, message: 'Attendee is already verified.' }
    }else if (await Event.updateOne({ _id: new mongo.Types.ObjectId(id) }, { $set: { verify: true }})) {
        return { success: true }
    } else {
        return { success: false, message: 'The ID is invalid.' }
    }
}

export const EventRegistersVerifyTalk = async (id: string, event: number) => {
    try {
        if (await Event.find({ _id: id, 'talk.type.id': event, 'talk.type.verify': true})) {
            return { success: false, message: 'Attendee is already verified.' }
        }else if (await Event.findOne(
            { _id: id, 'talk.type.id': event },
            { $set: { 'talk.$.type.verify': true } },
            { new: true },
        )) {
            return { success: true }
        } else {
            return { success: false, message: 'The ID is invalid.' }
        }
    } catch (e) {
        return { success: false, message: 'Error: '+e.message }
    }
}

export const EventRegisterAddTalk = async (id: string, no: Array<number> ) => {
    try {
        await Event.updateOne(
            { _id: new mongo.Types.ObjectId(id) },
            { $addToSet: { talk: { $each: no } } },
            {  upsert: true, new: true }
        );
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}

export const EventRegisterRemoveTalk = async (id: string, no: Array<number> ) => {
    try {
        await Event.updateOne(
            { _id: new mongo.Types.ObjectId(id) },
            { $pull: { talk: { $in: no } } },
            { new: true }
        );
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}

export const EventRegisterAddParticipant = async (id: string, data: Array<string>) => {
    try{
        await Event.updateOne(
            { _id: new mongo.Types.ObjectId(id), isEvent: true },
            { $addToSet: { 'event.participant': { $each: data } } },
        )
        await User.updateMany(
            // { _id:  }
        )
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}

export const EventRegisterRemoveParticipant = async (id: string, data: Array<string>) => {
    try{
        await Event.updateOne(
            { _id: new mongo.Types.ObjectId(id), isEvent: true },
            { $pull: { 'event.participant': { $in: data } } },
        )
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}



const hackathonRegistration = new mongo.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    theme: {
        type: Number,
        require: true
    },
    themeDesc: {
        type: String,
        require: false
    },
    member: {
        type: [{
            info: {
                type: String,
                require: true
            },
            lead: {
                type: Boolean,
                require: false
            },
            _id: false
        }],
        require: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    qrId: {
        type: String,
        require: false
    }
}, {
    collection: "hackathon",
    timestamps: true,
})

hackathonRegistration.pre('save', function (next) {
    try {
        // Convert the eventOpt array into a Set to remove duplicates
        const uniqueMember = Array.from(new Set(this.member));
        this.member = uniqueMember;
        next();
    } catch(e){}
});

// Hackathon Registration
export const Hackathon = mongo.model('hackathon', hackathonRegistration);
export const HackathonRegisters = async () => { return await Hackathon.find(); }
export const HackathonRegistersBy = async (param: any) => { return await Hackathon.find({ param }); }
export const HackathonRegisterByID = async (id: string) => { return await Hackathon.find({ _id: new mongo.Types.ObjectId(id) }); }

export const HackathonRegisterFindDetailsByID = async (id: string) => {

}

export const HackathonRegisterTeamScrapper = async (data: any) => {
    try {  
        var res = data;
        for (const information of res) {
            for (const member of information.member) {
                member.info = await UserRegisterForHackNEvent(member.info);
            }
        }
        return { success: true, data: res }
    } catch (e){
        console.log(e, e.message);
        return { success: false, messsage: "Fetching data went wrong.."}
    }
}

export const HackathonRegisterAll = async () => {
    try {
        let rs: HackathonResponseModel[] = (await Hackathon.aggregate([
            { $group: { _id: "$theme", data: { $push: { name: '$name', themeDesc: '$themeDesc', member: '$member', verify: '$verify' } } } },
            { $project: { _id: 0, theme: '$_id', data: "$data" } }
        ]))
        for (const rp of rs) {
            var res = await HackathonRegisterTeamScrapper(rp.data);
            if (!res.success) {
                return { success: false, message: res.messsage }
            }
            rp.data = res.data;
        }
        return { success: true, data: rs }
    } catch (e) {
        console.log(`db>sankalpUser>HackathonRegisterAll: ${e.message}`);
        return { success: false, message: 'Something went wrong' }
    }
}

export const HackathonCount = async () => {
    var rs: any = { 
        teams: await Hackathon.countDocuments(), 
    }
    rs.problem = (await Hackathon.aggregate([
        { $group: { _id: "$theme", count: { $sum: 1 } } },
        { $project: { theme: '$_id', count: 1, _id: 0 } }
    ]))
    try {
        rs.participants = (await Hackathon.aggregate([
            { $project: { arr: { $size: "$member" } } },
            { $group: { _id: null, totalPart: { $sum: "$arr" } } },
            { $project: { _id: 0, count: "$totalPart" } }
        ]))[0]["count"]
    } catch (e) {
        rs.participants = null
    }
    return rs
}

export const HackathonRegistersDetails = async () => {
    try {
        let data = await Hackathon.aggregate([
            { $group: { _id: "$theme" } }
        ]);
        return { success: true }
    } catch (e) {
        console.log(`db>sankalpUser>HackathonRegistersDetails: ${e}`);
        return { success: false, message: e.message}
    }
}


export const HackathonRegister = async (id: string, data: any) => {
    let info;
    try {
        if (data.member.length<1 && data.member.length>3) {
            return { success: false, message: 'The size of an hackathon team should be strictly 2-4.' }
        }
        for (const member of data.member){
            if(!(await User.findOne({ email: member.info }))){return { success: false, message: `The ${member.info} is not registered. Check your Email ID or Confirm whether the participant is registered in the platform.` } } 
        }
        if (await Hackathon.findOne({ name: data.name })) {
            return { success: false, message: "Team name is already taken" }
        }
        data.verify = false;
        var rs;
        for (const member of data.member) {
            rs = await UserRegistersGetIDByMail(member.info);
            if (!rs.success){
                return rs
            }
            if (rs.id===id) {
                return { success: false, message: 'You cannot add yourself as member. As your alread making a team.' }
            }
            if ((await User.findOne({ email: member.info })).hack) {
                return { success: false, message: `The ${member.info} is already in a hackathon team.` }
            } 
            member.info = rs.id;
        }
        data.member.push({ info: id, lead: true })
        if ((await Hackathon.aggregate([
            { $project: { size: { $size: '$member' } } },
            { $group: { _id: null, size: { $sum: '$size' } } }
        ]))[0]['size']+data.member.length > HackathonNameModel['max']) {
            return { success: false, message: `As we have reached the maximum number of participants, the hackathon registration of is closed.` }
        }
        const hackathon = new Hackathon(data);
        info = await hackathon.save();
        var ids = Array()
        for (const member of data.member) {
           member.lead?{}:ids.push(member.info);
        }
        await User.updateMany(
            { _id: { $in: ids } },
            { $set: { hack: info._id.toString() } }
        );
        await User.updateOne(
            { _id: id },
            { $set: { hack: info._id.toString() } }
        );
        return { success: true, id: info._id.toString() }
    } catch (e) {
        console.log(`db>sankalpUser>HackathonRegister: ${e}`);
        try{
            if (info._id.toString()) {
                await Hackathon.deleteOne({ _id: info._id.toString() })
            }
        } catch(e) {}
        return { success: false, message: 'The data is invalid.' }
    }
}

export const HackathonQRAdder = async (id: string, qId: string) => {
    await Event.updateOne(
        { _id: new mongo.Types.ObjectId(id) },
        { $set: { qrId: qId } }
    )
}


export const HackathonGetLeaderPhoneNo = async () => {
    try {
        let res = (await Hackathon.aggregate([
            { $unwind: "$member" },
            { $match: { 'member.lead': { $exists: true, $eq: true } } },
            { $group: { _id: null, data: { $push: "$member.info" } } },   
            { $project: { _id: 0, info: "$data" } }
        ]))[0]['info'];
        let result = await UserRegistersPhoneNumber(res);
        if (!result.success) {
            return { success: false, message: result.message }
        }
        return { success: true, data: result.data }
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong.'}
    }
}


export const HackathonGetPhoneNo = async () => {
    try {
        let res = (await Hackathon.aggregate([
            { $unwind: "$member" },
            { $group: { _id: null, data: { $push: "$member.info" } } },   
            { $project: { _id: 0, info: "$data" } }
        ]))[0]['info'];
        let result = await UserRegistersPhoneNumber(res);
        if (!result.success) {
            return { success: false, message: result.message }
        }
        return { success: true, data: result.data }
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong.'}
    }
}

export const HackathonGetTeamwiseDetails = async () => {
    try {
        let info = (await Hackathon.aggregate([
            { $group: { _id: null, 
              info: { $push: { teamName: "$name",  theme: "$theme", themeDesc: "$themeDesc", 
              member: {
                $map: { input: "$member", as: "m", in: { $toObjectId: "$$m.info" } }
              } } } } }, { $project: { _id: 0, info: "$info"} }
        ]))[0]['info'];
        var data = await Promise.all(info.map(async (team: any) => {
            team.member = (await User.aggregate([
                { $match: { _id: { $in: team.member } } },
                { $group: { _id: null, data: { $push: {name: "$name", phone: "$PhNo", email: "$email", batch: "$year", branch: "$branch", college: "$college" } } } },
                { $project: { _id: 0, data: "$data" } }
            ]))[0]["data"];
            return team;            
        }));
        return { success: true, data: data }
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong.'}
    }
}

export const HackathonSendEmailLead = async (data: any) => {
    try {
        let unable = Array();
        let res = (await Hackathon.aggregate([
            { $unwind: "$member" },
            { $match: {'member.lead': {$exists: true, $eq: true} }},
            { $group: { _id: null, data: { $push: { info: "$member.info" } } } },   
            { $project: { _id: 0, info: "$data.info" } }
          ]))[0]['info'];
        for (const reso of res) {
            let result = await sendAdminHackathonMail((await UserRegisterMailByID(reso)).email, data.subject, await paraCode(data.p), await buttonCode(data.button.title, data.button.url));
            if (!result.success) {
                unable.push(reso);
            }
        }
        return { success: true, data: unable.length?`Unable to send mail to ${unable.join(',')}`:`Sent mail to everyone successfully.`}
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong.'}
    }
}


export const HackathonSendEmailAll = async (data: any) => {
    try {
        let unable = Array();
        let res = (await Hackathon.aggregate([
            { $unwind: "$member" },
            { $group: { _id: null, data: { $push: { info: "$member.info" } } } },   
            { $project: { _id: 0, info: "$data.info" } }
          ]))[0]['info'];
        var button;
        try { 
            button = await buttonCode(data.button.title, data.button.url);
        } catch (e) {
            button = '';
        }
        for (const reso of res) {
            let result = await sendAdminHackathonMail((await UserRegisterMailByID(reso)).email, data.subject, await paraCode(data.p), button);
            if (!result.success) {
                unable.push(reso);
            }
        }
        return { success: true, data: unable.length?`Unable to send mail to ${unable.join(',')}`:`Sent mail to everyone successfully.`}
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong.'}
    }
}


export const hackathonRegistersVerify = async (id: string) => {
    if (await Hackathon.find({ _id: new mongo.Types.ObjectId(id), verify: true})) {
        return { success: false, message: 'Hackathon team is already verified.' }
    }else if (await Hackathon.updateOne({ _id: new mongo.Types.ObjectId(id) }, { $set: { verify: true }})) {
        return { success: true }
    } else {
        return { success: false, message: 'The ID is invalid.' }
    }
}

export const hackathonRegisterGetLeadEmail = async (id: string) => {
    const hack: HackathonModel = await Hackathon.findById(id);
    const part = hack.member;
    for (var i=0; i<part.length; i++) {
        if (part[i].lead) {
            return (await UserRegisterByID(part[i].info))?.email;
        }
    }
    return null
}

export const HackathonRegisterAddMembers = async (id: string, emails: Array<string> ) => {
    try {
        var ids = Array()
        for (var i=0; i< (emails).length; i++) {
            ids.push(await User.findById(emails[i]).select('_id'))
        }
        await Hackathon.updateOne(
            { _id: new mongo.Types.ObjectId(id) }, 
            { $addToSet: { member: { info: { $each: ids } } } }, // 'member.info'
            { upsert: true, new: true }
        );
        // Add 
        // await User.updateMany(
        //     { mail: { $in: mails } },
        //     { $set: { hack: {
        //         team: info._id.toString()
        //     } } }
        // );
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}

export const HackathonRegisterRemoveMembers = async (id: string, emails: Array<string>) => {
    try {
        var ids = Array()
        for (var i=0; i< (emails).length; i++) {
            ids.push(await User.findById(emails[i]).select('_id'))
        }
        await Hackathon.updateOne(
            { _id: new mongo.Types.ObjectId(id) }, 
            { $pull: { member: { info: { $in: ids } } } }, // 'member.info'
            { new: true }
        );
        // Add
        // await User.updateMany(
            //     { mail: { $in: mails } },
            //     { $set: { hack: {
            //         team: info._id.toString()
            //     } } }
            // );
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}
