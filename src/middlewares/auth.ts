import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const isValidHostName = (req: Request, res: Response, next: NextFunction): void => {
  const validHosts = ['localhost', 'soat', 'google'];

  if (validHosts.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.headers;

    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = jwt.verify(token as string, process.env.JWT_SECRET!);

      req.sessionData = { userId: data.userId, role: data.role };
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token'
      };
    }
  } catch (e) {
    res.status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { role } = req.sessionData;

    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'invalid role'
      };
    }

    next();
  } catch (e) {
    res.status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

export { isValidHostName, isAuth, isAdmin };
