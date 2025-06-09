export function getMongoURI(
  host: string,
  username: string,
  password: string,
  port: string,
  databaseName: string
) : {
  uri: string;
  params: {
    authSource: string;
    user: string;
    pass: string;
  };
} {
  return {
    uri: `mongodb://${host}:${port}/${databaseName}`,
    params: {
      authSource: 'admin',
      user: username,
      pass: password,
    },
  };
}
