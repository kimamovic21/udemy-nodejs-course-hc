import { userTokenSchema } from '../validation/token.validation';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function createUserToken(payload: { id: string }) {
  const validationResult = await userTokenSchema.safeParseAsync(payload);

  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  };

  const payloadValidatedData = validationResult.data;

  const token = jwt.sign(payloadValidatedData, JWT_SECRET);

  return token;
};