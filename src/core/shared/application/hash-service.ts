export interface HashService {
  encode(data: string, salt: number): Promise<string>;
  verify(data: string, hashedData: string): Promise<boolean>;
}
