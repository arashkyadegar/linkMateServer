import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class RandomWordsService {
  private readonly characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  generateRandomString(min: number, max: number, list: Set<string>): string {
    if (min < 0 || max < min) {
      throw new Error(
        "Invalid arguments: 'min' should be >= 0 and 'max' should be >= min.",
      );
    }
    let result = '';
    do {
      const length = Math.floor(Math.random() * (max - min + 1)) + min;
      result = this.generateRandomStringFromBuffer(length);
    } while (list.has(result));

    return result;
  }

  private generateRandomStringFromBuffer(length: number): string {
    const buffer = randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i++) {
      const index = buffer[i] % this.characters.length;
      result += this.characters[index];
    }
    return result;
  }
}
