

import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken, adminVerifyToken } from "../workers/auth";
import { decrypt } from "../workers/crypt";
import { UserDeleteByID, UserRegisterByID, UserRegister, UserRegistersVerifyByID, UserSigninChecker, UserRegistersGetIDByMail } from "../db/sankalpUser"; 
import { AdminData, AdminRegister, AdminSigninChecker } from "../db/sankalpAdmin";
import { AdminSiginModel, AdminSigupModel, SigninModal, SignupModal } from "../workers/model";
import { sendUserVerifyMail } from "../workers/mail";
import { Admin } from "./admin_api";


const router = express.Router();

/* ------ User ------- */

// Signup user
router.post("/signup", async(req, res) => {
    try {
        if (req.header('Authorization')) {
            return res.status(500).json({ success: false, message: "User has an active session." })
        }
        const data: SignupModal = req.body;
        data.verify = false;
        var result = await UserRegister(data);
        if (result.success) {
            var rs = await sendUserVerifyMail(data.email, result.id, data.name);
            if (rs.success) {
                return res.status(200).json({ success: true, id: result.id })
            } else {
                await UserDeleteByID(result.id);
                console.log(`auth_api>signup>sendUserVerifyMail: ${rs.message}`);
                return res.status(500).json({ success: false, message: `Unable to send the mail, Check the mail id again!` })
            }
        } else {
            await UserDeleteByID(result.id);
            console.log(`auth_api>signup>UserRegister: ${result.message}`);
            return res.status(500).json({ success: false, message: `Registration Failed: ${result.message}` })
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});

// Signin user
router.post("/signin", async(req, res) => {
    try {
        if (req.header('Authorization')) {
            return res.status(500).json({ success: false, message: "User has an active session." })
        }
        const data: SigninModal = req.body;
        const result = await UserSigninChecker(data);
        if (result.success) {
            return res.status(200).json({ success: true, token: result.token, verify: result.verify })
        } else {
            return res.status(500).json({ success: false, message: result.message })
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
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
            return res.status(500).json({ success: false, message: "Loggin to the account before verifying." })
        }
        const result = await UserRegistersVerifyByID(req.body.id);
        if (result.success) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(500).json({ success: true, message: result.message })
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


/* -------- Admin -------- */

// Signup admin
router.post("/signup-admin", adminVerifyToken, async(req, res) => {
    try {
        let adminRole = req.body.adminRole;
        if (!(adminRole === 1 || adminRole === 2)) {
            return res.status(500).json({ success: false, message: "You do not have privilege to add roles." })
        }
        let rs = await UserRegistersGetIDByMail(req.body.email);
        delete req.body.id, req.body.email, req.body.adminRole;
        if (!rs.success) {
            return res.status(500).json({ success: false, message: rs.message })
        }
        req.body._id = rs.id;
        const data: AdminSigupModel = req.body;
        const result = await AdminRegister(data);
        if (result.success) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(500).json({ success: false, message: result.message })
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});

// Signin admin
router.post("/signin-admin", async(req, res) => {
    try {
        if (req.header('Authorization')) {
            return res.status(500).json({ success: false, message: "An active session exists." })
        }
        const data: AdminSiginModel = req.body;
        const result = await AdminSigninChecker(data);
        if (result.success) {
            return res.status(200).json({ success: true, otp: result.otp, token: result.token })
        } else {
            return res.status(500).json({ success: false, message: result.message })
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


export const Auth = router