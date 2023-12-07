

import mongo from "mongoose";
import { AdminSigupModel, AdminSiginModel } from "../workers/model";
import { sendAdminVerifyMail } from "../workers/mail";
import { createToken } from "../workers/auth";
import { UserRegisterByID } from "./sankalpUser";

const adminAuth = new mongo.Schema<AdminSigupModel>({
    _id: {
        type: mongo.Types.ObjectId,
        require: true
    },
    username: {
        type: String,
        unique: true
    },
    role: {
        type: Number,
        require: true
    },
    volunter: {
        type: {
            hack: Boolean,
            events: [Number],
            talks: [Number]
        },
        _id: false,
        require: false
    }
}, {
    collection: "admins"
})


export const AdminData = mongo.model('auth', adminAuth);

export const isAdmin = async (id: string) => {
    try {
        return (await AdminData.findOne({ _id: new mongo.Types.ObjectId(id) }))?true:false
    } catch (e) {
        console.log(e);
        return false
    }
}

export const AdminRole = async (id: string) => {
    try {
        return (await AdminData.findOne({ _id: id }).select('role -_id'))["role"]
    } catch(e) {
        return null
    }
}

export const AdminRegister = async (data: AdminSigupModel) => {
    try {
        if (await AdminData.findOne({ _id: data._id })) {
            return { success: false, message: 'Admin access already exists.' }
        }
        data._id = new mongo.Types.ObjectId(data._id);
        const admin = new AdminData(data);
        const info = await admin.save();
        return { success: true }
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Check you data.' }
    }
}

export const AdminSigninChecker = async (data: AdminSiginModel) => {
    try {
        if (await AdminData.findOne({ username: data.username }) && await AdminData.findOne({ username: data.username, _id: data.id })) {
            var rs = await createToken(data.id);
            if (rs.success) {
                let otp = '';
                for (let i = 0; i < 6; i++) {
                    otp += Math.floor(Math.random() * 10).toString();
                } 
                let res = await sendAdminVerifyMail((await UserRegisterByID(data.id))["email"], otp);
                if (!res.success) {
                    return { success: false, message: res.message }
                }
                return { success: true, otp: otp, token: rs.token };
            } else {
                return { success: false, message: rs.message }
            }
        } else {
            return { success: false, message: "Attendee not found." }
        }
    } catch (e) {
        return { success: false, message: 'Something went wrong.' }
    }
}


/* -------- Feedback ------- */
const feedbackData = new mongo.Schema({
    id: {
        type: String,
        require: true
    },
    response: {
        type: Object,
        require: true
    }
}, {
    collection: "feedback",
    timestamps: true,
}) 


export const FeedbackData = mongo.model('feedback', feedbackData);
