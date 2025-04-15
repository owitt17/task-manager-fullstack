import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { isValidObjectId } from 'mongoose';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, username, password, retypePassword } = req.body;

    if (password !== retypePassword) {
        res.status(400).json({ message: "Passwords do not match!" });
        return;
    }
    

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(400).json({ message: "Username already exists!" });
        return;
    }
        

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, username, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "Registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error "});
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ message: "Username or password is invalid"});
    return;
  }

  const isPasswordValid = await bcrypt.compare(username, user.password);
  if (!isPasswordValid) {
    res.status(400).json({ message: "Username or password is invalid"});
    return;
  }

  res.status(200).json({ message: `Welcome back, ${user.fullName}!`, user: { fullName: user.fullName, username: user.username } });
}
