import express from "express";
import { EventRegister, HackathonRegister, EventRegisterByID, HackathonRegisterByID, EventRegisterAddEvent, HackathonRegisterRemoveMembers, HackathonRegisterAddMembers, EventRegisterRemoveEvent, EventQRAdder, HackathonQRAdder } from "../db/sankalpUser";
import { decrypt, encrypt } from "../workers/crypt";
import { SigninModal, SignupModal, EventModels, HackathonModel } from "../workers/model";
import { qrCreator, formID } from "../workers/qrcode";
import { sendCopyMail } from "../workers/mail";
import { verifyToken } from "../workers/auth"
const router = express.Router();

// --- Auth --- 

// Signup user
router.post("/signup", verifyToken, async(req, res) => {
    try {
        const data: SignupModal = req.body;
        
        res.status(200).json({ success: true })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});

// Signin user
router.post("/signin", async(req, res) => {
    try {
        const data: SigninModal = req.body;
        
        res.status(200).json({ success: true })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});

// Verify the user
router.post("/verify", async(req, res) => {
    try {
        const data = req.body;

        res.status(200).json({ success: true })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});

// Signout
router.post("/signout", async(req, res) => {
    try {
        res.status(200).json({ success: true })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});


// --- Form ---

// Registraction event
router.post("/registration-event/:info", async(req, res) => {
    try {
        const info = Number(req.params.info);
        if (info === 0) { // Talk registration
            const data = req.body; //: EventModelET | EventModelST = req.body;
            data.verify = false;
            data.event = false;
            var register = await EventRegister(data);
            if (!register.success) {
                res.status(500).json({ success: false, message: register.message })
            }
            var dt = await qrCreator(register.id);
            if (!dt.success) {
                res.status(500).json({ success: false, message: dt.message })
            }
            await EventQRAdder(register.id, dt.id);
            var rs = await sendCopyMail(`${req.protocol}://${req.hostname}`, true, data.mail, dt.id);
            if (!rs['success']===true) {
                console.log("Mailed failed");
                res.status(500).json({ success: false, message: rs.message });
            }
            data.qrId = dt.id;
            res.status(200).json({ success: true, id: register.id, dl: dt.link })
        } else if (info==1) { // Event registration
            const data = req.body; //: EventModelEE | EventModelSE = req.body;
            data.verify = false;
            data.event = true;
            var register = await EventRegister(data);
            if (!register.success) {
                res.status(500).json({ success: false, message: register.message })
            }
            var dt = await qrCreator(register.id);
            if (!dt.success) {
                res.status(500).json({ success: false, message: dt.message })
            }
            await EventQRAdder(register.id, dt.id);
            var rs = await sendCopyMail(`${req.protocol}://${req.hostname}`, true, data.eventInfo.participant[0].email, dt.id);
            if (!rs['success']===true) {
                console.log("Mailed failed");
                res.status(500).json({ success: false, message: rs.message });
            }
            data.qrId = dt.id;
            res.status(200).json({ success: true, id: register.id, dl: dt.link })
        } else { // Hackathon registration
            const data: HackathonModel = req.body;
            data.verify = false;
            var register = await HackathonRegister(data);
            if (!register.success) {
                res.status(500).json({ success: false, message: register.message })
            }
            var dt = await qrCreator(register.id);
            if (!dt.success) {
                res.status(500).json({ success: false, message: dt.message })
            }
            await HackathonQRAdder(register.id, dt.id);
            var rs = await sendCopyMail(`${req.protocol}://${req.hostname}`, false, data.tlEmail, dt.id);
            if (!rs.success) {
                res.status(500).json({ success: false, message: rs.message })
            }
            data.qrId = dt.id;
            res.status(200).json({ success: true, id: register.id, dl: dt.link })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

// Get info of event or hackathon
router.get("/info/:info/:id", async(req, res) => {
    try {
        var info = Number(req.params.info);
        var id = req.params.id;
        var register;
        try {
            if (info === 0) { // Event registration
                register = await EventRegisterByID(id);
            } else { // Hackathon registration
                register = await HackathonRegisterByID(id);
            }
        } catch (e) { 
            return res.status(500).json({ success: false, message: `Error: ${e}` })
        }
        if (!register) {
            res.status(500).json({ success: false, message: 'No info on this ID.' })
        }
        res.status(200).json({ success: true, result: register })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

// Modifier
router.post("/modifier/:info/:id", async(req, res) => {
    try {
        const info = Number(req.params.info);
        const id = req.params.id;
        var modify;
        if (info === 0) {
            const data = req.body;
            if (data['add'] === true) { // Adds event
                modify = await EventRegisterAddEvent(id, data['events']);
            } else { // Removes events
                modify = await EventRegisterRemoveEvent(id, data['events']);
            }
        } else if (info === 1) {
            const data = req.body;
            if (data['add'] === true) { // Adds event
                modify = await EventRegisterAddEvent(id, data['events']);
            } else { // Removes events
                modify = await EventRegisterRemoveEvent(id, data['events']);
            }
        } else {
            const data = req.body;
            if (data['add'] === true) { // Adds member
                modify = await HackathonRegisterAddMembers(id, data['member']);
            } else { // Remove events
                modify = await HackathonRegisterRemoveMembers(id, data['email']);
            }
        }
        if (!modify.success) {
            res.status(500).json({ success: false, message: 'No info on this data.' })
        } else {
            res.status(200).json({ success: true, message: 'Updated the details.' })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

export const User = router