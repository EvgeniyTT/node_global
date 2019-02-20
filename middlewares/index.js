export const queryParser = (req, res, next) => {
  req.parsedQuery = req.query;
  next();
};

export const cookieParser = (req, res, next) => {
  req.parseCookie = {};
  if (req.headers.cookie) {
    req.headers.cookie.split('; ').forEach(pairString => {
      const pairArr = pairString.split('=');
      req.parseCookie[pairArr[0]] = pairArr[1];
    });
  }

  next();
};
