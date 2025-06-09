export function getMongoURI(
  username: string,
  password: string,
  port: string,
  databaseName: string
): {
  uri: string;
  params: {
    authSource: string;
    user: string;
    pass: string;
  };
} {
  return {
    uri: `mongodb://localhost:${port}/${databaseName}`,
    params: {
      authSource: 'admin',
      user: username,
      pass: password,
    },
  };
}
