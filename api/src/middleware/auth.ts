import { Request, Response, NextFunction } from 'express';

/**
 * Rejects requests without a login session
 *
 * @param req
 * @param res
 * @param next
 */
function withSession(req: Request, res: Response, next: NextFunction): void {
  if (!req.session?.user?.id) {
    res.sendStatus(401);
    return;
  }

  next();
}

export default {
  withSession,
};
