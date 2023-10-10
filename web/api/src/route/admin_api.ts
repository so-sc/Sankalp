import express from "express";

const router = express.Router();

// registraction
router.post("/", async(req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

// 
router.post("/", async(req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

// 
router.post("/", async(req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

export const admin = router