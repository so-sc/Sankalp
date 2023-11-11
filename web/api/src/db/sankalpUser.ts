//

import mongo from "mongoose";
import { EventModels, HackathonModel, Member, SigninModal, SignupModal } from "../workers/model";
import { createToken } from "../workers/auth";


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
})

export const User = mongo.model('users', userRegisteration);
export const UserRegisters = (st: boolean) => { return User.find( { student: st } ); }
export const UserRegistersBy = (param: any) => { return User.find({ param }); }
export const UserRegisterByID = async (id: String) => {
    return await User.findById(id);
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
            if (result.verify) {
                return { success: false, message: "Attendee has already verified." }
            }
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
export const EventRegisters = async (st: boolean) => { return await Event.find( { student: st } ); }
export const EventRegistersBy = async (param: any) => { return await Event.find({ param }); }
export const EventRegisterByID = async (id: String) => {
    return await Event.findById(id);
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
    if (await Event.find({ _id: new mongo.Types.ObjectId(id), verify: true})) {
        return { success: false, message: 'Attendee is already verified.' }
    }else if (await Event.updateOne({ _id: new mongo.Types.ObjectId(id) }, { $set: { verify: true }})) {
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
        type: Number,
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
            info: {
                type: String,
                require: true
            },
            lead: {
                type: Boolean,
                require: false
            }
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
export const HackathonRegisters = async () => { return await Hackathon.find(); }
export const HackathonRegistersBy = async (param: any) => { return await Hackathon.find({ param }); }
export const HackathonRegisterByID = async (id: string) => { return await Hackathon.find({ _id: new mongo.Types.ObjectId(id) }); }

export const HackathonRegister = async (data: any) => {
    try {
        data.verify = false;
        const hackathon = new Hackathon(data);
        const info = await hackathon.save();
        var mails = Array()
        var lead;
        for (var i=0; i< (data.member).length; i++) {
            data.member[i].lead?lead=await User.findById(data.member[i].info).select('email'):mails.push(await User.findById(data.member[i].info).select('email'));
        }
        await User.updateMany(
            { mail: { $in: mails } },
            { $set: { hack: {
                team: info._id.toString()
            } } }
        );
        await User.updateOne(
            { mail: lead },
            { $set: { hack: {
                team: info._id.toString(),
                lead: true
            } } }
        );
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
            return (await UserRegisterByID(part[i].info)).email
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
