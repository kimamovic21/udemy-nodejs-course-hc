import { randomBytes, createHmac } from 'crypto';
import { type Request, type Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

export async function signUpUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required.' });
    };

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User with this email ${email} already exists.` });
    };

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      salt
    });

    res.status(201).json({
      status: 'success',
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error!', error });
  };
};


export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    };

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password.' });
    };

    const salt = existingUser.salt;
    const hashed = existingUser.password;

    const newHash = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    if (hashed !== newHash) {
      return res
        .status(400)
        .json({ error: `Invalid email or password ` });
    };

    const payload = {
      name: existingUser.name,
      _id: existingUser._id,
      email: existingUser.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    return res
      .status(200)
      .json({ status: 'success', token });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error!', error });
  };
};

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    name: string;
    email: string;
  };
};

export async function updateUserProfile(
  req: Request,
  res: Response,
) {
  try {
    const { name } = req.body;

    const { _id } = (req as AuthenticatedRequest).user || {};

    if (!_id) {
      return res.status(401).json({ error: 'User not authenticated!' });
    };

    await User.findByIdAndUpdate(_id, { name });

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error!', error });
  };
};