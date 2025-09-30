import { createHmac, randomBytes } from 'crypto';

export function hashPasswordWithSalt(password: string) {
  const salt = randomBytes(32).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  return { salt, password: hashedPassword };
};