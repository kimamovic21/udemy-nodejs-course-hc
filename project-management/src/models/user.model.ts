import crypto from 'crypto';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

export interface IUser extends Document {
  avatar: {
    url: string;
    localPath: string;
  };
  username: string;
  email: string;
  fullName?: string;
  password: string;
  isEmailVerified: boolean;
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateTemporaryToken(): {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: number;
  };
};

const userSchema = new Schema<IUser>(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: '',
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    emailVerificationToken: String,
    emailVerificationExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  const secret: Secret = process.env.ACCESS_TOKEN_SECRET!;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY || '15m';

  const options: SignOptions = { expiresIn: expiry as unknown as SignOptions['expiresIn'] };

  return jwt.sign(
    {
      _id: this._id.toString(),
      email: this.email,
      username: this.username,
    },
    secret,
    options
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  const secret: Secret = process.env.REFRESH_TOKEN_SECRET!;
  const expiry = process.env.REFRESH_TOKEN_EXPIRY || '7d';

  const options: SignOptions = { expiresIn: expiry as unknown as SignOptions['expiresIn'] };

  return jwt.sign(
    {
      _id: this._id.toString(),
      email: this.email,
      username: this.username,
    },
    secret,
    options
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString('hex');

  const hashedToken = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex');

  const tokenExpiry = Date.now() + (20 * 60 * 1000);

  return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model<IUser>('User', userSchema);