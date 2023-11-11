


import mongo from "mongoose";

const feedbackData = new mongo.Schema({
    name: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true,
        unique: true
    },
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
        type: Object,
        require: false
    }
}, {
    collection: "admins",
    timestamps: true,
})


export const AdminData = mongo.model('auth', adminAuth);

export const authSessionToken = (sToken: string) => AdminData.findOne({
    'authentication.sessionToken': sToken,
});



export const FeedbackData = mongo.model('auth', feedbackData);

