import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
import { Response } from 'express';
import { AuthenticatedRequest } from '../types/auth.types.js';

interface AuthRequestBody {
  fullName?: string;
  email: string;
  password: string;
  profilePic?: string;
}

export const signup = async (req: Response, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body as AuthRequestBody;
    
    if (!fullName || !email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters' });
      return;
    }

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id.toString(), res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in signup controller', (error as Error).message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req: Response, res: Response): Promise<void> => {
  const { email, password } = req.body as AuthRequestBody;
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    generateToken(user._id.toString(), res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error in login controller', (error as Error).message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req: Response, res: Response): void => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', (error as Error).message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { profilePic } = req.body as AuthRequestBody;
    const userId = req.user._id;

    if (!profilePic) {
      res.status(400).json({ message: 'Profile pic is required' });
      return;
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('error in update profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkAuth = (req: AuthenticatedRequest, res: Response): void => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log('Error in checkAuth controller', (error as Error).message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};