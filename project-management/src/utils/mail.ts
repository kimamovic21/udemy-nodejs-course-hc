import Mailgen from 'mailgen';

export function emailVerificationMailgenContent(
  username: string,
  verificationUrl: string
) {
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
) {
  return {
    body: {
      name: username,
      intro: 'We got a request to reset the password of your account',
      action: {
        instructions: 'To reset your password click on the following button or link',
        button: {
          color: '#22BC66',
          text: 'Verify your email',
          link: passwordResetUrl,
        },
      },
      outro: 'Need help or have a questions? Just reply to this email, we would love to help :)'
    },
  };
};