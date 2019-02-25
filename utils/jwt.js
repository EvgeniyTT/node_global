import jwt from 'jsonwebtoken';

const tokenSecret = 'd3hA&bhYh2tn72bXvb';
export const makeToken = data => jwt.sign(data, tokenSecret, { expiresIn: '24h' });
export const decodeToken = token => jwt.verify(token, tokenSecret);
