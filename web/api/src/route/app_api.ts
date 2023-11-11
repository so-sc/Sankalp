import express from "express";
import { UserRegisterByID, hackathonRegisterGetLeadEmail, EventRegisterByID, HackathonRegisterByID, EventRegister, HackathonRegister, EventQRAdder, HackathonQRAdder } from "../db/sankalpUser";
import { EventModels, HackathonModel, Member } from "../workers/model";
import { qrCreator, formID } from "../workers/qrcode";
import { encrypt } from "workers/crypt";
import { sendCopyMail } from "../workers/mail";
import { verifyToken } from "../workers/auth";
const router = express.Router();

// --- Form ---

// Registration for talk or event or hackathon
router.get("/registration/:info", verifyToken, async(req, res) => {
    try {
        const info = req.params.info;
        var data: EventModels | HackathonModel = req.body;
        var register;
        data.verify = false;
        if (info==='e' || info==='t') { // Event & Talk registration
            register = await EventRegister(data);
        } else if (info==='h') { // Hackathon registration
            register = await HackathonRegister(data);
        } else {
            res.status(500).json({ success: false, message: "Check your info params." })
        }
        var dt = await qrCreator(register.id);
        if (!dt.success) {
            res.status(500).json({ success: false, message: dt.message })
        }
        (info==='e' || info==='t') ? await EventQRAdder(register.id, dt.id): await HackathonQRAdder(register.id, dt.id);
        const qr: { [key: string]: string } = {'e': "Event", 't': "Talk",'h': "Hackathon"};
        const mail = (info==='e' || info == 't')? (await UserRegisterByID(req.body.id)).get('email') : await hackathonRegisterGetLeadEmail(register.id);
        var rs = await sendCopyMail(`${req.protocol}://${req.hostname}`, qr[info], mail, dt.id);
        if (!rs['success']===true) {
            console.log("Mailed failed");
            res.status(500).json({ success: false, message: rs.message });
        }
        res.status(200).json({ success: true, dl: dt.link })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});


// Get info of talk or event or hackathon
router.get("/info/:info", verifyToken, async(req, res) => {
    try {
        var info = req.params.info;
        var register;
        try {
            if (info === 'et') { // Event & Talk registration
                register = await EventRegisterByID(req.body.id);
            } else if (info === 'h') { // Hackathon registration
                register = await HackathonRegisterByID(req.body.id);
            } else {
                res.status(500).json({ success: false, message: "Check your info params." })
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
// router.post("/modifier/:info", verifyToken, async(req, res) => {
//     try {
//         const info = Number(req.params.info);
//         var modify;
//         if (info === 0) {
//             const data = req.body;
//             if (data['add'] === true) { // Adds event
//                 modify = await EventRegisterAddEvent(req.body.id, data['events']);
//             } else { // Removes events
//                 modify = await EventRegisterRemoveEvent(req.body.id, data['events']);
//             }
//         } else if (info === 1) {
//             const data = req.body;
//             if (data['add'] === true) { // Adds event
//                 modify = await EventRegisterAddEvent(req.body.id, data['events']);
//             } else { // Removes events
//                 modify = await EventRegisterRemoveEvent(req.body.id, data['events']);
//             }
//         } else {
//             const data = req.body;
//             if (data['add'] === true) { // Adds member
//                 modify = await HackathonRegisterAddMembers(req.body.id, data['member']);
//             } else { // Remove events
//                 modify = await HackathonRegisterRemoveMembers(req.body.id, data['email']);
//             }
//         }
//         if (!modify.success) {
//             res.status(500).json({ success: false, message: 'No info on this data.' })
//         } else {
//             res.status(200).json({ success: true, message: 'Updated the details.' })
//         }
//     } catch (e) {
//         res.status(500).json({ success: false, message: e.message })
//     }
// })

export const App = router