const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV;
const host = env === "test" ? process.env.TEST_DB_HOST : process.env.DB_HOST;
const port = env === "test" ? process.env.TEST_DB_PORT : process.env.DB_PORT;
const username =
  env === "test" ? process.env.TEST_DB_USERNAME : process.env.DB_USERNAME;
const password =
  env === "test" ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
const database =
  env === "test" ? process.env.TEST_DB_DATABASE : process.env.DB_DATABASE;
const SnakeNamingStrategy =
  require("typeorm-naming-strategies").SnakeNamingStrategy;

module.exports = {
  type: "postgres",
  host: host,
  port: Number(port),
  username,
  password,
  database,
  entities: ["apps/**/*.entity.ts"],
  migrations: ["db/migrations/*.ts"],
  cli: {
    migrationsDir: "db/migrations",
  },
  seeds: ["apps/**/*.seed.ts"],
  factories: ["apps/**/*.factory.ts"],
  timezone: "Z",
  namingStrategy: new SnakeNamingStrategy(),
};
