import { userTokenSchema } from '../validation/token.validation';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function createUserToken(payload: { id: string }) {
  try {
    const validationResult = await userTokenSchema.safeParseAsync(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    };

    const payloadValidatedData = validationResult.data;

    const token = jwt.sign(payloadValidatedData, JWT_SECRET);

    return token;
  } catch (err) {
    console.error(err);
    throw new Error;
  };
};

export async function validateUserToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error(err);
    throw new Error;
  };
};