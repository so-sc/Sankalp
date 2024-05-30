import express from "express";//HackathonRegisterAll
import { EventDeleteByID, UserRegisterGetInfoByMail, UserRegisterByMail, UserRegistersFindUser, HackathonRegisterFindDetailsByID, UserRegisterByID, hackathonRegisterGetLeadEmail, EventRegisterFindDetailsByID, EventRegister, HackathonRegister, EventQRAdder, HackathonQRAdder, HackathonRegisterAll, EventRegisterAll } from "../db/sankalpUser";
import { EventModels, HackathonModel, Member } from "../workers/model";
import { qrCreator, formID } from "../workers/qrcode";
import { sendCopyMail } from "../workers/mail";
import { adminVerifyToken, verifyToken } from "../workers/auth";
const router = express.Router();

/* --- Form --- */

// Registration for talk or event or hackathon
router.post("/registration/:info", verifyToken, async(req, res) => {
    try {
        const info = req.params.info;
        const id = req.body.id;
        var data: EventModels | HackathonModel | any = req.body;
        delete data.id;
        var register;
        if (info==='e' || info==='t') { // Event & Talk registration
            register = await EventRegister(id, data);
        } else if (info==='h') { // Hackathon registrationW
            data.verify = false;
            register = await HackathonRegister(id, data);
        } else {
            res.status(500).json({ success: false, message: "Check your info params." })
            return
        }
        if (!register.success) {
            res.status(500).json({ success: false, message: register.message });
            return
        }
        var dt = await qrCreator(register?.id);
        if (!dt.success) {
            await EventDeleteByID(register?.id)
            res.status(500).json({ success: false, message: dt.message })
            return
        }
        if (info==='e' || info==='t') { await EventQRAdder(register.id, dt.id) } else { await HackathonQRAdder(register.id, dt.id); }
        const qr: any =  {'e': 0, 't': 1, 'h': 2 };
        const mail = (info==='e' || info == 't')? (await UserRegisterByID(id))?.email : await hackathonRegisterGetLeadEmail(register.id);
        if (!mail) {
            await EventDeleteByID(register?.id)
            res.status(500).json({ success: false, message: "Issue with fetching the Email ID." })
            return
        }
        var name;
        if (info==='h') {
            name=data.name;
        } else {
            name=(await UserRegisterByID(id)).name;
        }
        var rs = await sendCopyMail(qr[info], (info==='h')? null: (info==='t')? Array.from(new Set(data.talk.map((talk: any) => talk.id))): data.event.eve, mail, name, dt.id);
        if (!rs['success']===true) {
            console.log("Mailed failed\n"+rs["message"]);
            await EventDeleteByID(register?.id)
            res.status(500).json({ success: false, message: "Failed to send email or had some issue" });
            return
        }
        res.status(200).json({ success: true, dl: dt.link })
        return
    } catch (e) {
        console.log(e);
        try{
            // await EventDeleteByID(register?.id)
        } catch (e) {}
        res.status(500).json({ success: false, message: "Application faced some error. Check your data. Contact Maintainers." })
        return
    }
});


// Get info for form info
router.get("/form-info-helper/:info", async(req, res) => {
    try {
        var info = req.params.info;
        var data = req.body;
        let result;
        if (info==='email') {
            result = await UserRegisterGetInfoByMail(data.email);
        };
        res.status(200).json(result);
        return
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: e.message })
        return
    }
});

// Get info of talk or event or hackathon
router.get("/info/:info", verifyToken, async(req, res) => {
    try {
        var info = req.params.info;
        var register;
        try {
            if(info === 'u') { // User information
                register = await UserRegistersFindUser(req.body.id);
            } else if (info === 'et') { // Event & Talk information (Not done)
                register = await EventRegisterFindDetailsByID(req.body.event);
            } else if (info === 'h') { // Hackathon information Not done)
                register = await HackathonRegisterFindDetailsByID(req.body.hackathon);
            } else {
                res.status(500).json({ success: false, message: "Check your info params." })
                return
            }
        } catch (e) { 
            return res.status(500).json({ success: false, message: `Error: ${e}` })
        }
        if (!register) {
            res.status(500).json({ success: false, message: 'No info on this ID.' })
            return
        }
        res.status(200).json(register)
        return
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
        return
    }
})

// Modifier
// router.post("/modifier/:info", verifyToken, async(req, res) => {
//     try {
//         const info = req.params.info;
//         var modify, data;
//         if (info==='e' || info==='t') {
//             modify = await ();
//         } else if (info==='') {
//             modify = await ();
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