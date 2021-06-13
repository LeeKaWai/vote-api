import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

/**
 * 加密工具类
 */
export class bcryptUtils {
  /**
   * bcypt 加密
   * @param plaintextPassword 明文密码
   * @returns 加密后的hash
   */
  public async encrypt(plaintextPassword: any): Promise<any> {
    const salt = await bcrypt.genSaltSync(saltOrRounds);
    const hash = await bcrypt.hashSync(plaintextPassword, salt);
    return hash;
  }

  /**
   * bcypt 验证密码
   * @param plaintextPassword 明文密码
   * @param hash 加密的hash
   * @returns true || false
   */
  public async compare(plaintextPassword: any, hash: string): Promise<any> {
    return bcrypt.compareSync(plaintextPassword, hash);
  }
}
