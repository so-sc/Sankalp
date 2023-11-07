
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';

export const verifyToken = (req: Request, res: Response, next: () => void) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    try {
        const decoded = jwt.verify(token, process.env.KEY) as { id: string };
        console.log(decoded);
        req.body.id = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
};