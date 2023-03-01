import { body } from 'express-validator';

export const loginValidation = [
    body('login'),
    body('password', 'Пароль должет состоять как минимум из 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('name', 'Имя должно состоять как минимум из 3 символов').isLength({ min: 3 }),
    body('secondName', 'Имя должно состоять как минимум из 3 символов').isLength({ min: 3 }),
    body('login'),
    body('password', 'Пароль должет состоять как минимум из 5 символов').isLength({ min: 5 }),
    body('confirmPassword', 'Пароль должет состоять как минимум из 5 символов').isLength({ min: 5 }),
    body('email', 'Почта не верна').isEmail(),
    body('confirmEmail', 'Почта не верна').isEmail(),
];

