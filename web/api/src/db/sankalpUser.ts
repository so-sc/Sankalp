//

import mongo from "mongoose";
import { EventModels, HackathonModel, Member, SignupModal } from "workers/model";


const userRegisteration = new mongo.Schema<SignupModal>({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
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
})

export const User = mongo.model('users', userRegisteration);
export const UserRegisters = async (st: boolean) => { return User.find( { student: st } ); }
export const UserRegistersBy = async (param: any) => { return User.find({ param }); }
export const UserRegisterByID = async (id: String) => {
    return User.findById(id);
}

export const UserRegister = async (data: any) => {
    try {
        const user = new User(data);
        const info = await user.save();
        return { success: true, id: info._id.toString() }
    } catch (e) {
        return { success: false, message: 'The ID is invalid.' }
    }
}

export const UserRegistersVerifyByID = async (id: string) => {
    if (User.find({ _id: new mongo.Types.ObjectId(id), verify: false})) {
        return { success: false, message: 'Attendee is already verified.' }
    }else if (User.updateOne({ _id: new mongo.Types.ObjectId(id) }, { $set: { verify: true }})) {
        return { success: true }
    } else {
        return { success: false, message: 'The data is invalid.' }
    }
}


const eventRegistration = new mongo.Schema<EventModels>({
    talk: [{
        type: Number,
        require: false
    }],
    isEvent: {
        type: Boolean,
        require: true
    },
    event: {
        type: {
            eve: Number,
            pno: Number,
            participant: [{
                info: String
            }]
        },
        required: true
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
            const uniqueEventOpt = Array.from(new Set(this.talk));
            this.talk = uniqueEventOpt;
            next();
        }
    } catch(e) {}
});


// Event Registration
export const Event = mongo.model('Event', eventRegistration);
export const EventRegisters = async (st: boolean) => { return Event.find( { student: st } ); }
export const EventRegistersBy = async (param: any) => { return Event.find({ param }); }
export const EventRegisterByID = async (id: String) => {
    return Event.findById(id);
}

export const EventRegister = async (data: any) => {
    try {
        const event = new Event(data);
        const info = await event.save();
        var mail = Array();
        if (data.isEvent) {
            for (var i=0; i<data.event.pno; i++) {
                mail.push(await User.findById(data.event.participant[i].info).select('email'));
            }
            await Event.updateMany(
                { email: { $in: mail } },
                { $addToSet: { event: { $each: info._id } } }
            );
        } else {
            await Event.updateOne(
                { email: data.mail },
                { $set: { talk: info._id } }
            );
        }
        return { success: true, id: info._id.toString() }
    } catch (e) {
        return { success: false, message: 'The ID is invalid.' }
    }
}

export const EventQRAdder = async (id: string, qId: string) => {
    await Event.updateOne(
        { _id: new mongo.Types.ObjectId(id) },
        { $set: { qrId: qId } }
    )
}

export const EventRegistersVerifyByID = async (id: string) => {
    if (Event.find({ _id: new mongo.Types.ObjectId(id), verify: false})) {
        return { success: false, message: 'Attendee is already verified.' }
    }else if (Event.updateOne({ _id: new mongo.Types.ObjectId(id) }, { $set: { verify: true }})) {
        return { success: true }
    } else {
        return { success: false, message: 'The data is invalid.' }
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
        // console.log(result); { acknowledged: true, modifiedCount: 1, upsertedId: null, upsertedCount: 0, matchedCount: 1 }
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
        require: true
    },
    theme: {
        type: String,
        require: true
    },
    themeName: {
        type: String,
        require: false
    },
    memNo: {
        type: Number,
        require: true
    },
    member: [{
        type: {
            info: String,
            lead: Boolean
        },
        require: true
    }],
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
export const Hackathon = mongo.model('Hackathon', hackathonRegistration);
export const HackathonRegisters = async () => { return Hackathon.find(); }
export const HackathonRegistersBy = async (param: any) => { return Hackathon.find({ param }); }
export const HackathonRegisterByID = async (id: string) => { return Hackathon.find({ _id: new mongo.Types.ObjectId(id) }); }

export const HackathonRegister = async (data: HackathonModel) => {
    try {
        const hackathon = new Hackathon(data);
        const info = await hackathon.save();
        var mails = Array()
        var lead;
        for (var i=0; i< (data.member).length; i++) {
            data.member[i].lead?lead=await User.findById(data.member[i].info).select('email'):mails.push(await User.findById(data.member[i].info).select('email'));
        }
        await Event.updateMany(
            { mail: { $in: mails } },
            { $set: { hack: {
                team: info._id.toString()
            } } }
        );
        await Event.updateOne(
            { mail: lead },
            { $set: { hack: {
                team: info._id.toString(),
                lead: true
            } } }
        )
        return { success: true, id: info._id.toString() }
    } catch (e) {
        return { success: false, message: 'The data is invalid.' }
    }
}

export const HackathonQRAdder = async (id: string, qId: string) => {
    await Event.updateOne(
        { _id: new mongo.Types.ObjectId(id) },
        { $set: { qrId: qId } }
    )
}

export const hackathonRegistersVerifyByID = async (id: string) => {
    if (Hackathon.find({ _id: new mongo.Types.ObjectId(id), verify: false})) {
        return { success: false, message: 'Hackathon team is already verified.' }
    }else if (Hackathon.updateOne({ _id: new mongo.Types.ObjectId(id) }, { $set: { verify: true }})) {
        return { success: true }
    } else {
        return { success: false, message: 'The ID is invalid.' }
    }
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
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}
