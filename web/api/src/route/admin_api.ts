
import express from "express";
import { UserRegisterTotal, HackathonCount, TalkCount, EventCount, UserRegisterYear, UserRegisterStudent, UserRegisterGender, EventRegisters, HackathonRegistersDetails, EventRegistersVerifyTalk, EventRegistersVerifyEvent, hackathonRegistersVerify, User, EventRegisterAll, HackathonRegisterAll, EventRegisterOfEvent, UserRegisterGetDetails, HackathonGetPhoneNo, HackathonGetLeaderPhoneNo, EventRegistersGetEventPhoneNo, EventRegistersGetPhoneNo, UserRegisterGetInfoDetails, HackathonGetTeamwiseDetails, EventGetTeamwiseDetails, SendMail } from '../db/sankalpUser';
import { adminVerifyToken } from "../workers/auth";

const router = express.Router();

/* ----------------- Verify ------------------------ */

// Verify the attendee
router.post("/verify/:info", adminVerifyToken, async(req, res) => {
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


router.get("/get-users-info/:info", adminVerifyToken, async(req, res) => {
    try {
        let data = await UserRegisterGetInfoDetails(req.params.info);
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
        return res.status(200).json(data)
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


router.get("/get-events-phone-no", adminVerifyToken, async(req, res) => {
    try {
        let data = await EventRegistersGetPhoneNo();
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json(data)
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


router.get("/get-event-phone-no/:eve", adminVerifyToken, async(req, res) => {
    try {
        let eve = Number(req.params.eve);
        if (!eve) {
            return { success: false, message: 'eve params is missing.' }
        }
        let data = await EventRegistersGetEventPhoneNo(eve);
        if (!data.success) {
            return res.status(500).json({ success: false, message: data.message })
        }
        return res.status(200).json(data)
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


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

// Get all hackathon participants phone numbers
router.get("/get-hackathons-phone-no", adminVerifyToken, async(req, res) => {
    try {
        let data = await HackathonGetPhoneNo();
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json(data)
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})

// Get all hackathon team leaders phone number
router.get("/get-hackathons-leader-phone-no", adminVerifyToken, async(req, res) => {
    try {
        let data = await HackathonGetLeaderPhoneNo();
        if (!data.success) {
            return res.status(500).json({ success: true, message: data.message })
        }
        return res.status(200).json(data)
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


router.get("/hackathon-teamwise", adminVerifyToken, async (req, res) => {
    try {
        let result = await HackathonGetTeamwiseDetails();
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true, result: result.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})


router.get("/event-teamwise/:eve", adminVerifyToken, async (req, res) => {
    try {
        let result = await EventGetTeamwiseDetails(Number(req.params.eve));
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true, result: result.data })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
})

/* ----------------- Sending Mail ----------------- */

router.post("/hackathon-mail-leader", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await SendMail(data, 1);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


router.post("/event-mail", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await SendMail(data, 3);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


router.post("/hackathon-mail-all", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await SendMail(data, 2);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


router.post("/event-mail-all", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await SendMail(data, 4);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});

// send mail to all
router.post("/send-mail", adminVerifyToken, async(req, res) => {
    try {
        let data = req.body;
        let result = await SendMail(data, 5);
        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }
        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


/* ----------------- Feedback ------------------------ */

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
router.get("/statistics/count", adminVerifyToken, async(req, res) => {
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