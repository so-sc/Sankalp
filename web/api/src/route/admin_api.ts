
import express from "express";
import { HackathonCount, TalkCount, EventCount, UserRegisterYear, UserRegisterStudent, UserRegisterGender, EventRegisters, HackathonRegistersDetails, EventRegistersVerifyTalk, EventRegistersVerifyEvent, hackathonRegistersVerify } from '../db/sankalpUser';
import { adminVerifyToken } from "../workers/auth";

const router = express.Router();

// ----------------- Verify ------------------------

// Verify the attendee
router.get("/verify/:info", adminVerifyToken, async(req, res) => {
    try {
        var info = req.params.info;
        var data = req.body;
        var result;
        if (info==='t') {
            result = await EventRegistersVerifyTalk(data.eventID, data.event);
        } else if (info==='e') {
            result = await EventRegistersVerifyEvent(data.eventID);
        } else if (info==='h') {
            result = await hackathonRegistersVerify(data.eventID);
        } else {
            res.status(500).json({ success: false, message: "Check your info params." })
        }
        if (!result.success) {
            res.status(500).json({ success: false, message: result.message })
        }
        return res.status(500).json({ success: true })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});

// ---------------- Access data ---------------------

// Get all students (0) or employee (1) registered in event 
router.get("/get-event/:info", adminVerifyToken, async(req, res) => {
    try {
        var info = Number(req.params.info);
        if (info === 0) {
            var event = await EventRegisters(true);
        } else {
            var event = await EventRegisters(false);
        }
        return res.status(500).json({ success: true, result: event })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

// Get all hackathon team registered for hackathon
router.get("/get-hackathon", adminVerifyToken, async(req, res) => {
    try {
        var hackathon = await HackathonRegistersDetails();
        return res.status(500).json({ success: true, result: hackathon })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})


// ----------------- Feedback ------------------------

// Feedback
router.post("/feedback", async(req, res) => {
    try {
        var feedback = req.body;

        res.status(500).json({})
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

router.get("/get-feedbacks", async(req, res) => {
    try {
        res.status(500).json({})
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

router.get("/get-feedback", async(req, res) => {
    try {

        res.status(500).json({})
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})


// ----------------- STATISTICS ----------------------

// 
router.get("/statistics/count", async(req, res) => {
    try {
        return res.status(500).json({ 
            success: true, 
            gender: await UserRegisterGender(), 
            student: await UserRegisterStudent(), 
            year: await UserRegisterYear(), 
            hack: await HackathonCount(),
            talk: await TalkCount(),
            event: await EventCount()
        })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})



export const Admin = router