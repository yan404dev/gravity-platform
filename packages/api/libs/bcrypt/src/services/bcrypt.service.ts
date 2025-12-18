import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly logger = new Logger(BcryptService.name);

  hash(password: string, salt: number = 10): Promise<string> {
    this.logger.log(`⚙️ [${this.hash.name}]: Criando hash para senha`);

    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    this.logger.log(`⚙️ [${this.compare.name}]: Comparando hash para senha`);

    const result = await bcrypt.compare(password, hash);

    if (result) {
      this.logger.log(`✅ Senha correta`);
    } else {
      this.logger.log(`❌ Senha incorreta`);
    }

    return result;
  }
}
