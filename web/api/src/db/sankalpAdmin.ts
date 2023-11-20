

import mongo from "mongoose";
import { AdminSigupModel, AdminSiginModel } from "../workers/model";
import { createToken } from "../workers/auth";

const adminAuth = new mongo.Schema<AdminSigupModel>({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    isVolunter: {
        type: Boolean,
        require: false
    },
    volunter: {
        type: {
            hack: Boolean,
            events: [Number]
        },
        require: false
    }
}, {
    collection: "admins",
    timestamps: true,
})


export const AdminData = mongo.model('auth', adminAuth);

export const isAdmin = async (id: string) => {
    try {
        return (await AdminData.findOne({ _id: id }))?true:false
    } catch (e) {
        return false
    }
}

export const AdminRegister = async (data: any) => {
    try {
        const admin = new AdminData(data);
        const info = await admin.save();
        return { success: true, id: info._id }
    } catch (e) {
        return { success: false, message: 'Check you data.' }
    }
}

export const AdminSigninChecker = async (data: AdminSiginModel) => {
    try {
        var result = await AdminData.findOne({ _id: data.id, username: data.username });
        if (result) {
            var rs = await createToken(data.id);
            if (rs.success) {
                return { success: true, token: rs.token };
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
