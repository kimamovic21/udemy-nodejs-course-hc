import { body } from 'express-validator';

export function userRegisterValidator() {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Email is invalid!'),
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required!')
      .isLowercase()
      .withMessage('Username must be in lower case!')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long!'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required!'),
    body('fullName')
      .optional()
      .trim()
  ];
};

export function userLoginValidator() {
  return [
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('Email is invalid!'),
    body('password')
      .notEmpty()
      .withMessage('Password is required!')
  ];
};

export function userChangeCurrentPasswordValidator() {
  return [
    body('oldPassword')
      .notEmpty()
      .withMessage('Old password is required!'),
    body('newPassword')
      .notEmpty()
      .withMessage('New password is required!')
  ];
};

export function userForgotPasswordValidator() {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Email is invalid!')
  ];
};

export function userResetForgotPasswordValidator() {
  return [
    body('newPassword')
      .notEmpty()
      .withMessage('Password is required!')
  ];
};