export interface DatabaseClient {
  connect({
    uri,
    params,
  }: {
    uri: string;
    params: {
      authSource: string;
      user: string;
      pass: string;
    };
  }): Promise<void>;
  disconnect(): Promise<void>;
}
