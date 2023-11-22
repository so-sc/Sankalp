//

import mongo from "mongoose";
import { EventModels, HackathonModel, Member, SigninModal, SignupModal, Talk, UserResponseModal, gender } from "../workers/model";
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

export const UserRegisterByMail = async (email: string) => {
    return User.findOne({ email: email })
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
        console.log(`Error: ${e.message}`);
        return { success: false, message: 'Some error in fetching the data.' }
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
                temp= await User.findById(member.info).select('name email -_id');
                if (member.lead) {hackon.hacklead = true}
                if (temp) { hackon.member.push(temp) } else { 
                    return { success: false, message: "Unable to find the user in the team, Please contact developer for support." } 
                }
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
            }
        }
        return { success: true, data: data }
    } catch (e) {
        console.log(e);
        return { success: false, message: `Error: ${e.message}` }
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
        if (!(await User.find({ email: data.email }))) {
            return { success: false, message: "The Email ID already exists." }
        }
        const user = new User(data);
        const info = await user.save();
        return { success: true, id: info._id.toString() }
    } catch (e) {
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

export const EventRegister = async (id: string, data: any) => {
    try { 
        if (data.isEvent) { 
            data.event.participant.map((member: Member) => { if(!(User.findOne({ email: member.info }))){return { success: false, message: `The ${member.info} is not registered. Check your Email ID or Confirm whether the participant is registered in the platform.` } } } );
            for (const participant of data.event.participant) {
                const rs = await UserRegistersGetIDByMail(participant.info);
                if (!rs.success) { return rs; }
                participant.info = rs.id;
            }
            data.verify = false; data.event.participant.push({ info: id, lead: true }); 
        }      
        data.event.participant.map((member: Member) => { 
            let user: any = User.findOne({ email: member.info });
            user.event.map((event: string) => {
                if(Event.find({ _id: { $in: event }, 'event.type.eve': data.eve})){
                return { success: false, message: `The ${member.info} is already in a event. Opt someone else.` } 
            } } ) 
        } );
        const event = new Event(data);
        const info = await event.save();
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
        return { success: false, message: 'Check the provided fields.' }
    }
}

export const EventQRAdder = async (id: string, qId: string) => {
    await Event.updateOne(
        { _id: new mongo.Types.ObjectId(id) },
        { $set: { qrId: qId } }
    )
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


export const HackathonRegistersDetails = async () => {
    try {
        let data = await Hackathon.find();
        return { success: true }
    } catch (e) {
        console.log(e);
        return { success: false, message: e.message}
    }
}


export const HackathonRegister = async (id: string, data: any) => {
    try {
        if (data.member.length<1 && data.member.length>3) {
            return { success: false, message: 'The size of an hackathon team should be strictly 2-4.' }
        }
        data.member.map((member: Member) => { 
            if(!(User.findOne({ email: member.info }))){return { success: false, message: `The ${member.info} is not registered. Check your Email ID or Confirm whether the participant is registered in the platform.` } } 
        } );
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
        const hackathon = new Hackathon(data);
        const info = await hackathon.save();
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
        console.log(e);
        return { success: false, message: 'The data is invalid.' }
    }
}

export const HackathonQRAdder = async (id: string, qId: string) => {
    await Event.updateOne(
        { _id: new mongo.Types.ObjectId(id) },
        { $set: { qrId: qId } }
    )
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
