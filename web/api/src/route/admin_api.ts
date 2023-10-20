import express from "express";

import { EventRegisters, HackathonRegisters } from '../db/sankalpUser'
import {  } from "db/sankalpAdmin";

const router = express.Router();

// Get all students (0) or employee (1) registered in event 
router.get("/get-event/:info", async(req, res) => {
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
router.get("/get-hackathon", async(req, res) => {
    try {
        var hackathon = await HackathonRegisters();
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
router.get("/", async(req, res) => {
    try {
        return res.status(500).json({ success: false, })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

export const Admin = router