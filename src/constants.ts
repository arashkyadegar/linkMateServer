//constants.ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const PageSizeConstants = {
  pageSize: Math.min(
    Math.max(parseInt(process.env.PAGE_SIZE || '10', 10), 1),
    50,
  ),
};
