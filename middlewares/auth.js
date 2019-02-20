import { decodeToken } from '../utils/jwt';

export const checkToken = (req, res, next) => {
  try {
    const decode = decodeToken(req.headers.token);
    req.userId = decode._doc.id;
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
