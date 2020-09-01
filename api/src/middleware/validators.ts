import { Request, Response, NextFunction } from 'express';

import checkAPI from 'express-validator/check';

/**
 * Validators for user-related data
 * @type {{user_id: ValidationChain, email: ValidationChain, password: ValidationChain, username: ValidationChain, first_name: ValidationChain, last_name: ValidationChain, bio: ValidationChain, country: ValidationChain, current_country: ValidationChain}}
 */
const user = {
  user_id: checkAPI.body('user_id').exists().isInt({ min: 0 }).toInt().withMessage('Invalid user ID'),

  email: checkAPI.body('email').exists().trim().isEmail().normalizeEmail().withMessage('Must be a valid email'),

  password: checkAPI
    .body('password')
    .exists()
    .matches(/^\S{8,20}$/)
    .withMessage('Between 8 and 20 characters, no spaces.'),

  username: checkAPI
    .body('username')
    .exists()
    .trim()
    .matches(/^[\w\d]{5,20}$/)
    .withMessage('Between 5 and 20 letters and digits'),

  first_name: checkAPI
    .body('first_name')
    .trim()
    .matches(/^[\w]{0,20}$/)
    .withMessage('Between 0 and 20 letters'),

  last_name: checkAPI
    .body('last_name')
    .trim()
    .matches(/^[\w]{0,30}$/)
    .withMessage('Between 1 and 30 letters'),

  bio: checkAPI
    .body('bio')
    .exists()
    .isLength({ min: 0, max: 2048 })
    .trim()
    .withMessage('Your bio cannot be longer than 2048 characters'),
};

/**
 * Validators for message-related data
 *
 * @type {{text: ValidationChain, recip_id: ValidationChain, lon: ValidationChain, lat: ValidationChain}}
 */
const message = {
  text: checkAPI.body('text').exists().not().isEmpty().withMessage('Invalid message body'),

  recip_id: checkAPI.body('recip_id').exists().isInt({ min: 0 }).toInt().withMessage('Invalid recipient ID'),

  lon: checkAPI.body('lon').optional().isFloat({ min: -180, max: 180 }).toFloat(),

  lat: checkAPI.body('lat').optional().isFloat({ min: -90, max: 90 }).toFloat(),
};

function handleErrors(req: Request, res: Response, next: NextFunction): void {
  const errors = checkAPI.validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.mapped());
  } else {
    next();
  }
}

export default {
  user,
  message,
  handleErrors,
};
