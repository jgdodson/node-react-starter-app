import { Request, Response, NextFunction } from 'express';

/**
 * Redirect all requests to the www subdomain
 *
 * @param req
 * @param res
 * @param next
 */
function requireWWW(req: Request, res: Response, next: NextFunction) {
  if (req.hostname.match(/^www\..*/i)) {
    next();
  } else {
    res.redirect(301, `${req.protocol}://www.${req.hostname}${req.url}`);
  }
}

/**
 * Redirect all requests to the https protocol
 *
 * @param req
 * @param res
 * @param next
 */
function requireHTTPS(req: Request, res: Response, next: NextFunction) {
  // Protocol of the original request
  const proto = req.get('X-Forwarded-Proto');

  if (!proto || proto !== 'https') {
    res.redirect(301, `https://${req.hostname}${req.url}`);
  } else {
    next();
  }
}

export default {
  requireWWW,
  requireHTTPS,
};
