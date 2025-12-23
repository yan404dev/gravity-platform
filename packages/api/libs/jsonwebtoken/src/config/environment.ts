export const environment = {
  JWT: {
    ACCESS_TTL: process.env.JWT_ACCESS_TTL
      ? +process.env.JWT_ACCESS_TTL
      : 60 * 60 * 1000,
    REFRESH_TTL: process.env.JWT_REFRESH_TTL
      ? +process.env.JWT_REFRESH_TTL
      : 60 * 60 * 1000,
    SECRET: process.env.JWT_SECRET,
  },
};
