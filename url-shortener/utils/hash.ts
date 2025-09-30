import { createHmac, randomBytes } from 'crypto';

export function hashPasswordWithSalt(
  password: string,
  userSalt?: string | undefined
) {
  const salt = userSalt ?? randomBytes(32).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  return { salt, password: hashedPassword };
};