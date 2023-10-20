//

import mongo from "mongoose";
import { HackathonModel, Member } from "workers/model";

const eventRegistration = new mongo.Schema({
    stName: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    college: {
        type: String,
        require: false
    },
    branch: {
        type: String,
        require: false
    },
    year: {
        type: Number,
        require: false
    },
    eventOpt: [{
        type: Number,
        require: true
    }],
    student: {
        type: Boolean,
        default: false
    },
    gender: {
        type: Number,
        default: false
    },
    company: {
        type: String,
        require: false
    },
    designation: {
        type: String,
        require: false
    },
    verify: {
        type: Boolean,
        default: false
    }, 
    hack: {
        type: Object,
        default: {
            isHack: false,
            team: null
        },
        require: true
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
    // Convert the eventOpt array into a Set to remove duplicates
    const uniqueEventOpt = Array.from(new Set(this.eventOpt));
    this.eventOpt = uniqueEventOpt;
    next();
});

const hackathonRegistration = new mongo.Schema({
    TmName: {
        type: String,
        require: true
    },
    college: {
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
    tlName: {
        type: String,
        require: true
    },
    tlEmail: {
        type: String,
        require: true
    },
    tlYear: {
        type: Number,
        require: true
    },
    tlPhNo: {
        type: Number,
        require: true
    },
    memNo: {
        type: Number,
        require: true
    },
    member: {
        type: [{
            name: {
                type: String,
                require: true,
            },
            email: {
                type: String,
                require: true,
            },
            year: {
                type: String,
                require: true,
            }
        }],
        require: false
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
    // Convert the eventOpt array into a Set to remove duplicates
    const uniqueMember = Array.from(new Set(this.member));
    this.member = uniqueMember;
    next();
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

export const EventRegisterAddEvent = async (id: string, no: Array<number> ) => {
    try {
        await Event.updateOne(
            { _id: new mongo.Types.ObjectId(id) },
            { $addToSet: { eventOpt: { $each: no } } },
            {  upsert: true, new: true }
        );
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}

export const EventRegisterRemoveEvent = async (id: string, no: Array<number> ) => {
    try {
        await Event.updateOne(
            { _id: new mongo.Types.ObjectId(id) },
            { $pull: { eventOpt: { $in: no } } },
            { new: true }
        );
        // console.log(result); { acknowledged: true, modifiedCount: 1, upsertedId: null, upsertedCount: 0, matchedCount: 1 }
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}

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
        for (var i=0; i< (data.member).length; i++) {
            mails.push(data.member[i].email)
        }
        await Event.updateMany(
            { mail: { $in: mails } },
            { $set: { hack: {
                team: info._id.toString(),
                isHack: true
            } } }
        );
        await Event.updateOne(
            { mail: data.tlEmail },
            { $set: { hack: {
                team: info._id.toString(),
                isHack: true,
                leader: true
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

export const HackathonRegisterAddMembers = async (id: string, data: Array<Member> ) => {
    try {
        var mails = Array()
        for (var i=0; i< (data).length; i++) {
            mails.push(data[i].email)
        }
        // await Event.updateOne(
        //     { mail: { $in: mails } },
        //     { $set: { hack: {
        //         team: id,
        //         isHack: true
        //     } } }
        // )
        await Hackathon.updateOne(
            { _id: new mongo.Types.ObjectId(id) }, 
            { $addToSet: { member: { $each: data } } }, 
            { upsert: true, new: true }
        );
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}

export const HackathonRegisterRemoveMembers = async (id: string, email: Array<string>) => {
    try {
        // await Event.updateOne(
        //     { mail: { $in: email } },
        //     { $set: { hack: {
        //         team: null,
        //         isHack: false
        //     } } }
        // )
        await Hackathon.updateOne(
            { _id: new mongo.Types.ObjectId(id) }, 
            { $pull: { member: { email: { $in: email} } }  },
            { new: true }
        );
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}
