import express from "express";
import { EventRegister, HackathonRegister, EventRegisterByID, HackathonRegisterByID, EventRegisterAddEvent, HackathonRegisterRemoveMembers, HackathonRegisterAddMembers } from "../db/sankalpUser";
import { decrypt, encrypt } from "../workers/crypt";
import { eventModel, hackathonModel } from "../workers/modal";
import { qrCreator, formID } from "../workers/qrcode";
import { sendCopyMail } from "../workers/mail";

const router = express.Router();

// Registraction event
router.post("/registration/:info", async(req, res) => {
    try {
        const info = Number(req.params.info);
        var register;
        if (info === 0) { // Event registration
            const data: eventModel = req.body;
            data.verify = false;
            register = await EventRegister(data);
            if (!register.success) {
                res.status(500).json({ success: false, message: register.message })
            }
            var dt = await qrCreator(await encrypt(register.id));
            if (!dt.success) {
                res.status(500).json({ success: false, message: dt.message })
            }
            var rs = await sendCopyMail(register.id, true, data.mail, dt.id);
            if (!rs.success) {
                res.status(500).json({ success: false, message: rs.message })
            }
            data.qrId = dt.id;
            res.status(200).json({ success: true, id: await encrypt(register.id), dl: dt.link })
        } else { // Hackathon registration
            const data: hackathonModel = req.body;
            data.verify = false;
            register = await HackathonRegister(data);
            if (!register.success) {
                res.status(500).json({ success: false, message: register.message })
            }
            var dt = await qrCreator(await encrypt(register.id));
            if (!dt.success) {
                res.status(500).json({ success: false, message: dt.message })
            }
            var rs = await sendCopyMail(register.id, false, data.tlEmail, dt.id);
            if (!rs.success) {
                res.status(500).json({ success: false, message: rs.message })
            }
            data.qrId = dt.id;
            res.status(200).json({ success: true, id: await encrypt(register.id), dl: dt.link })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

router.get("/info/:id", async(req, res) => {
    try {
        var id = req.params.id;
        id = await decrypt(id);
        var register;
        try { // Event registration
            register = await EventRegisterByID(id);
        } catch (e) { // Hackathon registration
            register = await HackathonRegisterByID(id);
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
router.patch("/modifier/:info/:id", async(req, res) => {
    try {
        const info = Number(req.params.info);
        const id = req.params.id;
        var modify;
        if (info === 0) {
            const events = req.body;
            modify = await EventRegisterAddEvent(id, events);
        } else {
            const data = req.body;
            if (data['add'] === true) {
                modify = await HackathonRegisterAddMembers(id, data['member']);
            } else {
                modify = await HackathonRegisterRemoveMembers(id, data['email']);
            } 
        }
        if (!modify.success) {
            res.status(500).json({ success: false, message: 'No info on this data.' })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

// Feedback
router.post("/feedback/:id", async(req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

export const User = router