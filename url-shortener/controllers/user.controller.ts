import { type Request, type Response } from 'express';
import { signUpPostRequestBodySchema } from '../validation/request.validation';
import { hashPasswordWithSalt } from '../utils/hash';
import { createNewUser, getUserByEmail } from '../services/user.service';

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