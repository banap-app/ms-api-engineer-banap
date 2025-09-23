import * as bcrypt from 'bcryptjs';
import { HashService } from 'src/core/shared/application/hash-service';

export class BcryptService implements HashService {
  async encode(data: string, salt: number): Promise<string> {
    return await bcrypt.hash(data, salt);
  }
  async verify(data: string, hashedData: string) {
    return await bcrypt.compareSync(data, hashedData);
  }
}
