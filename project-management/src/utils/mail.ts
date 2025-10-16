import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

interface EmailOptions {
  email: string;
  subject: string;
  mailgenContent: Mailgen.Content;
};

export async function sendEmail(options: EmailOptions) {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Task Manager',
      link: 'https://taskmanagerlink.com',
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: Number(process.env.MAILTRAP_SMTP_PORT),
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS
    },
  } as SMTPTransport.Options);

  const mail = {
    from: 'mail.taskmanager@example.com',
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    console.error(`Email service failed: ${err}`);
  };
};

export function emailVerificationMailgenContent(
  username: string,
  verificationUrl: string
): Mailgen.Content {
  return {
    body: {
      name: username,
      intro: 'Welcome to our Project Management App!',
      action: {
        instructions: 'To verify your email please click on the following button',
        button: {
          color: '#22BC66',
          text: 'Verify your email',
          link: verificationUrl,
        },
      },
      outro: 'Need help or have a questions? Just reply to this email, we would love to help :)'
    },
  };
};

export function forgotPasswordMailgenContent(
  username: string,
  passwordResetUrl: string
): Mailgen.Content {
  return {
    body: {
      name: username,
      intro: 'We got a request to reset the password of your account',
      action: {
        instructions: 'To reset your password click on the following button or link',
        button: {
          color: '#22BC66',
          text: 'Reset your password',
          link: passwordResetUrl,
        },
      },
      outro: 'Need help or have a questions? Just reply to this email, we would love to help :)'
    },
  };
};