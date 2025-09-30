import { type Request, type Response } from 'express';
import {
  signUpPostRequestBodySchema,
  loginPostRequestBodySchema
} from '../validation/request.validation';
import { hashPasswordWithSalt } from '../utils/hash';
import { createNewUser, getUserByEmail } from '../services/user.service';
import jwt from 'jsonwebtoken';

export async function signUpUser(req: Request, res: Response) {
  try {
    const validationResult = await signUpPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.format() });
    };

    const { firstName, lastName, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists!` });
    };

    const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

    const user = await createNewUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    });

    return res
      .status(201)
      .json({ data: { userId: user!.id } });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error!' });
  };
};

export async function loginUser(req: Request, res: Response) {
  try {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.format() });
    };

    const { email, password } = validationResult.data;

    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ error: `Error with email: ${email} does not exists!` })
    };

    const { password: hashedPassword } = hashPasswordWithSalt(password, user.salt);

    if (user.password !== hashedPassword) {
      return res
        .status(404)
        .json({ error: `Invalid credentials!` })
    };

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    return res.status(200).json({ message: 'success', token });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error!' });
  };
};