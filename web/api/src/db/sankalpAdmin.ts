


import mongo from "mongoose";

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


const adminAuth = new mongo.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    volunter: {
        type: Boolean,
        require: false
    }
}, {
    collection: "admins",
    timestamps: true,
})


export const AdminData = mongo.model('auth', adminAuth);

export const isAdmin = async () => {
    try {

    } catch (e) {
        return { success: false, message: e.message}
    }
}



export const FeedbackData = mongo.model('auth', feedbackData);
