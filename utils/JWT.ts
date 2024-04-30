import type {
  SignOptions,
  JwtPayload,
  VerifyOptions,
  VerifyErrors,
} from "jsonwebtoken";

// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';

export class AuthToken {
  accessSecret: string;
  refreshSecret: string;

  options: SignOptions;

  static readonly tokenGenerator = new AuthToken({
    algorithm: "HS256",
    keyid: "1",
    noTimestamp: false,
    expiresIn: "30d",
    notBefore: "0s",
  });

  constructor(options: SignOptions) {
    this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
    this.accessSecret = process.env.NUXT_ACCESS_SECRET || "";
    this.refreshSecret = process.env.NUXT_REFRESH_SECRET || "";
  }

  sign(payload: any, signOptions: SignOptions): string {
    const jwtSignOptions = Object.assign({}, this.options, signOptions);
    return jwt.sign(payload, this.accessSecret, jwtSignOptions);
  }

  signRefreshToken(payload: any, signOptions: SignOptions): string {
    const jwtSignOptions = Object.assign({}, this.options, signOptions);
    return jwt.sign(payload, this.refreshSecret, jwtSignOptions);
  }

  /**
   *  verify the access token
   * @param token verify the access token
   * @param verifyOptions {}
   * @returns  Promise<JwtPayload | VerifyErrors> the payload of the token
   */
  verify(
    token: string,
    verifyOptions: VerifyOptions
  ): Promise<(JwtPayload) | VerifyErrors> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.accessSecret,
        (error: VerifyErrors, payload: JwtPayload) => {
          if (error) {
            reject(error);
          } else {
            resolve(payload);
          }
        }
      );
    });
  }

  /**
   * Get the new access token
   * @param token the refresh token
   * @param verifyOptions {}
   * @returns string the new access token
   */
  refreshToken(
    token: string,
    verifyOptions?: VerifyOptions
  ): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.refreshSecret,
        (error: VerifyErrors, payload: JwtPayload) => {
          if (error) {
            reject(error);
          } else {
            resolve(this.sign({ id: payload.id }, this.options));
          }
        }
      );
    });
  }
}

export default AuthToken;
