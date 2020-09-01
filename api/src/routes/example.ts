import { query } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { Router } from 'express';

import validators from '../middleware/validators';
import auth from '../middleware/auth';

import UserModel from '../models/example';

const router = Router();

/**
 * Route that returns JSON response
 */
router.get(
  '/',

  async (req, res) => {
    res.json({
      about: 'This is an API response',
    });
  },
);

/**
 * Route that accepts query params
 *
 * Invalid query params will result in a 4xx response
 */
router.get(
  '/query',

  query('param1').isInt({ min: 0 }).toInt().optional(),

  validators.handleErrors,

  async (req, res) => {
    const params = matchedData(req);

    return res.json({
      about: `The query param had value: ${params.param1}`,
    });
  },
);

/**
 * Route that requires a session
 */
router.get('/protected', auth.withSession, async (req, res) => {
  return res.json({
    about: 'This API endpoint requires a session',
  });
});

/**
 * Route that returns data fetched by the model layer
 */
router.get('/data', async (req, res) => {
  const data = await UserModel.modelFunction(3);

  return res.json({
    data,
  });
});

export default router;
