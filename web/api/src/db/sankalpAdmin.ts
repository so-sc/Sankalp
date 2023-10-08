


import mongo from "mongoose";

const feedbackData = new mongo.Schema({
    name: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    
}) 


const adminAuth = new mongo.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    volunter: {
        type: Boolean,
        default: false
    }
}, {
    collection: "admins",
    timestamps: true,
})


export const Admin = mongo.model('auth', adminAuth);

export const authSessionToken = (sToken: string) => Admin.findOne({
    'authentication.sessionToken': sToken,
});
