import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");
  const configuredFilename = env("DATABASE_FILENAME", ".tmp/data.db");
  const appRoot = __dirname.includes(`${path.sep}dist${path.sep}config`)
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
  const sqliteFilename = path.isAbsolute(configuredFilename)
    ? configuredFilename
    : path.resolve(appRoot, configuredFilename);

  const connections = {
    sqlite: {
      connection: {
        filename: sqliteFilename,
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
