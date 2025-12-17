export const environment = {
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN,
    METHODS: process.env.CORS_METHODS?.split(',') || [],
  },
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV as 'PRODUCTION' | 'HOMOLOG' | 'DEVELOPMENT',
  IS_PRODUCTION: process.env.NODE_ENV === 'PRODUCTION',
  VERSION: process.env.npm_package_version || '1.0.0',
};
