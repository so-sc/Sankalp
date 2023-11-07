import express from "express";

const router = express.Router();


// ------------------------- User -------------------------

// 
router.post("/user/", async(req, res) => {
    try {
        return res.status(500).json({ success: false, })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})


// ------------------------- Admin -------------------------

// 
router.post("/admin/", async(req, res) => {
    try {
        return res.status(500).json({ success: false, })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
})

export const Auth = router