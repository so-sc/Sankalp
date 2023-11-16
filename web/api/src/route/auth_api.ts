

import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../workers/auth";
import { decrypt } from "../workers/crypt";
import { UserRegisterByID, UserRegister, UserRegistersVerifyByID, UserSigninChecker } from "../db/sankalpUser"; 
import { SigninModal, SignupModal } from "../workers/model";
import { sendUserVerifyMail } from "../workers/mail";


const router = express.Router();


// Signup user
router.post("/signup", async(req, res) => {
    try {
        if (req.header('Authorization')) {
            res.status(500).json({ success: false, message: "User has an active session." })
        }
        const data: SignupModal = req.body;
        data.verify = false;
        var result = await UserRegister(data);
        if (result.success) {
            var rs = await sendUserVerifyMail(`${req.protocol}://${req.hostname}`, data.email, result.id, data.name);
            if (rs.success) {
                res.status(200).json({ success: true, id: result.id })
            } else {
                console.log(rs.message);
                res.status(500).json({ success: false, message: `Unable to send the mail, Check the mail id again!` })
            }
        } else {
            console.log(result.message);
            res.status(500).json({ success: false, message: `Registration Failed: ${result.message}` })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});

// Signin user
router.post("/signin", async(req, res) => {
    try {
        if (req.header('Authorization')) {
            res.status(500).json({ success: false, message: "User has an active session." })
        }
        const data: SigninModal = req.body;
        const result = await UserSigninChecker(data);
        if (result.success) {
            res.status(200).json({ success: true, token: result.token, verify: result.verify })
        } else {
            res.status(500).json({ success: false, message: result.message })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});


router.get("/token-checker", async(req, res) => {
    try {
        if (req.body.token) {
            const decoded = jwt.verify(req.body.token, process.env.KEY) as { id: string };
            if (!decoded.id) {
                return res.status(401).json({ success: false, message: 'Authentication failed. ID not found through token.' });
            }
            if (!(await UserRegisterByID(await decrypt(decoded.id)))) {
                return res.status(401).json({ success: false, message: `ID ${await decrypt(decoded.id)} is not available on database.` });
            }
            return res.status(401).json({ success: true });
        }
        if (!(req.header('Authorization'))) {
            return { success: false, message: 'You need to add authorization in header.' }
        }
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication failed.' });
        }
        const decoded = jwt.verify(token, process.env.KEY) as { id: string };
        if (!decoded.id) {
            return res.status(401).json({ success: false, message: 'Authentication failed. ID not found through token.' });
        }
        if (!(await UserRegisterByID(await decrypt(decoded.id)))) {
            return res.status(401).json({ success: false, message: `ID ${await decrypt(decoded.id)} is not available on database.` });
        }
        return res.status(401).json({ success: true });
    } catch (e) {
        return res.status(401).json({ success: false, message: `Error: ${e.message}` });
    }
});

// Verify the user
router.post("/verify", verifyToken, async(req, res) => {
    try {
        if (!req.body.id) {
            res.status(500).json({ success: false, message: "Loggin to the account before verifying." })
        }
        const result = await UserRegistersVerifyByID(req.body.id);
        if (result.success) {
            res.status(200).json({ success: true })
        } else {
            res.status(500).json({ success: true, message: result.message })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
});


export const Auth = router