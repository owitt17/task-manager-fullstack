import { Request, Response, NextFunction } from "express";

export const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { fullName, username, password, retypePassword } = req.body;

    if (!fullName || !username || !password || !retypePassword) {
        res.status(400).json({ message: "Please fill all fields" });
        return;
    }
    
    if (password !== retypePassword) {
        res.status(400).json({ message: "Passwords do not match!"});
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ message: "Password must be at least 6 characters"});
        return;
    }

    next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}