

import mongo from "mongoose";
import { AdminSigupModel } from "../workers/model";

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
        return { success: true }
    } catch (e) {
        return { success: false, message: '' }
    }
}

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
