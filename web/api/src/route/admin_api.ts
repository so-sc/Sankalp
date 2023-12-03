
import express from "express";
import { UserRegisterTotal, HackathonCount, TalkCount, EventCount, UserRegisterYear, UserRegisterStudent, UserRegisterGender, EventRegisters, HackathonRegistersDetails, EventRegistersVerifyTalk, EventRegistersVerifyEvent, hackathonRegistersVerify, User, EventRegisterAll, HackathonRegisterAll, EventRegisterOfEvent, UserRegisterGetDetails, EventSendEmailEve, EventSendEmailAll, HackathonSendEmailLead, HackathonSendEmailAll } from '../db/sankalpUser';
import { adminVerifyToken } from "../workers/auth";

const router = express.Router();

/* ----------------- Verify ------------------------ */

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
            return res.status(500).json({ success: false, message: "Check your info params." })
        }
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});



/* ---------------- Access data --------------------- */


router.get("/get-users", adminVerifyToken, async(req, res) => {
    try {
        let data = await UserRegisterGetDetails();
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json({ success: true, result: data.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})

router.get("/get-events", adminVerifyToken, async(req, res) => {
    try {
        let data = await EventRegisterAll();
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json({ success: true, result: data.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


router.get("/get-events", adminVerifyToken, async(req, res) => {
    try {
        let data = await EventRegisterAll();
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json({ success: true, result: data.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


router.get("/get-event/:eve", adminVerifyToken, async(req, res) => {
    try {
        var eve = Number(req.params.eve);
        if (!eve) {
            return res.status(500).json({ success: false, message: 'Provide the which event details you need.' })
        }
        let data = await EventRegisterOfEvent(eve);
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json({ success: true, result: data.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


// router.get("/get-talks", adminVerifyToken, async(req, res) => {
//     try {
//         return res.status(200).json({ success: true, result: await EventRegisterAll() })
//     } catch (e) {
//         return res.status(500).json({ success: false, message: e.message })
//     }
// })

// router.get("/get-talk/", adminVerifyToken, async(req, res) => {
//     try {
//         var info = Number(req.params.info);
//         if (info === 0) {
//             var event = await EventRegisters(true);
//         } else {
//             var event = await EventRegisters(false);
//         }
//         return res.status(500).json({ success: true, result: event })
//     } catch (e) {
//         return res.status(500).json({ success: false, message: e.message })
//     }
// })


// Get all hackathon team registered for hackathon
router.get("/get-hackathons", adminVerifyToken, async(req, res) => {
    try {
        let data = await HackathonRegisterAll();
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json({ success: true, result: data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


/* Generator */


/*  */
/*  */
// import fs from "fs";
// import xlsx from 'xlsx';
// router.get("/excel/", adminVerifyToken, async(req, res) => {
//     try {
//         const dataFromMongo = await HackathonRegisterAll();
//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(dataFromMongo);
//         xlsx.utils.book_append_sheet(wb, ws, 'HackathonData');
    
//         const filePath = './data.xlsx'; // File path to save the Excel file
    
//         xlsx.writeFile(wb, filePath); // Write Excel file to the server
    
//         res.download(filePath, 'HackathonData.xlsx', (err) => {
//           if (err) {
//             console.error('Error downloading file:', err);
//           } else {
//             // Delete the file after download is complete
//             fs.unlinkSync(filePath);
//             console.log('File deleted successfully');
//           }
//         });
//     } catch (error) {
//         console.error('Error generating Excel:', error);
//         res.status(500).send('Error generating Excel');
//     }
// });


/* ----------------- Sending Mail ----------------- */

router.post("/hackathon-mail-leader", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await HackathonSendEmailLead(data);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true, result: result.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


router.post("/event-mail/:eve", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await EventSendEmailEve(Number(req.params.eve), data);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true, result: result.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


router.post("/hackathon-mail-all", async(req, res) => {
    try {
        let data = req.body;
        let result = await HackathonSendEmailAll(data);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true, result: result.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


router.post("/event-mail-all", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await EventSendEmailAll(data);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true, result: result.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


// ----------------- Feedback ------------------------

// Feedback
router.post("/feedback", adminVerifyToken, async(req, res) => {
    try {
        var feedback = req.body;

        return res.status(200).json({})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})

router.get("/get-feedbacks", adminVerifyToken, async(req, res) => {
    try {
        return res.status(200).json({})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})

router.get("/get-feedback", adminVerifyToken, async(req, res) => {
    try {

        return res.status(200).json({})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


// ----------------- STATISTICS ----------------------

// 
router.get("/statistics/count", async(req, res) => {
    try {
        return res.status(200).json({ 
            success: true, 
            users: await UserRegisterTotal(),
            gender: await UserRegisterGender(), 
            student: await UserRegisterStudent(), 
            year: await UserRegisterYear(), 
            hack: await HackathonCount(),
            talk: await TalkCount(),
            event: await EventCount()
        })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})



export const Admin = router