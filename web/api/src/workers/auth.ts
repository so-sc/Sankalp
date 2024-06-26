
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { decrypt, encrypt } from "../workers/crypt";
import { isAdmin, AdminRole } from "../db/sankalpAdmin";

export const verifyToken = async (req: Request, res: Response, next: () => void) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    try {
        const decoded = jwt.verify(token, process.env.KEY) as { id: string };
        req.body.id = await decrypt(decoded.id);
        console.log(req.body.id);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
};

export const adminVerifyToken = async (req: Request, res: Response, next: () => void) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    try {
        let decoded = jwt.verify(token, process.env.KEY) as { id: string };
        let rypt = await decrypt(decoded.id);
        if (await isAdmin(rypt)) {
            req.body.id = rypt;
            req.body.adminRole = Number(await AdminRole(rypt));
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Not an admin.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Authentication failed. Due to some internal issue.' });
    }
}

export const createToken = async (id: string) => {
    try { 
        const token = jwt.sign({ id: await encrypt(id) }, process.env.KEY, { expiresIn: '7d' });
        return { success: true, token: token }
    } catch (error) {
        console.log(`createToken: ${error}`);
        return { success: false, message: 'Authentication failed' };
    }
}


export const checkPassword = async (password: string) => {
    try {
        if (password.length < 8) {
            return { success: false, message: 'Password must be at least 8 characters.' }
        }
        if (!/[a-z]/.test(password)) {
            return { success: false, message: "At least one lowercase letter is required." }
        }
        if (!/[A-Z]/.test(password)) {
            return { success: false, message: "At least one uppercase letter is required." }
        }
        if (!/\d/.test(password)) {
            return { success: false, message: "At least one digit is required." }
        }
        if (!/[!@#$%^&*()-_=+[\]{};':"\\|,.<>/?]/.test(password)) {
            return { success: false, message: "At least one special character is required." }
        }
        return { success: true }
    } catch (e) {
        console.log(`checkPassword: ${e}`)
        return { success: false, message: 'The data provided is invalid. Check the fields again.' }
    }
}