import * as joi from 'joi';

const common = {
  PORT: joi.number().required(),
  ADMIN_PORT: joi.number().required(),
  BATCH_PORT: joi.number().required(),
  APP_ENV: joi
    .string()
    .valid('test', 'dev', 'staging', 'production')
    .required(),
  SYNC: joi.boolean().required(),
  JWT_SECRET: joi.string().required(),
  // ...and more
};

const db =
  process.env.NODE_ENV === 'test'
    ? {
        TEST_DB_HOST: joi.string().required(),
        TEST_DB_DATABASE: joi.string().required(),
        TEST_DB_PORT: joi.number().required(),
        TEST_DB_USERNAME: joi.string().required(),
        TEST_DB_PASSWORD: joi.string().required(),
      }
    : {
        DB_HOST: joi.string().required(),
        DB_DATABASE: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
      };

export const envValidationSchema = joi.object({
  ...common,
  ...db,
});
