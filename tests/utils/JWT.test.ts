import { AuthToken } from "./../../utils/JWT";
// @vitest-environment node
import { it, test, expect, expectTypeOf } from "vitest";

it("JWT test", async () => {
  const data = { id: 1 };
  const token = AuthToken.tokenGenerator.sign(data, {
    expiresIn: "1s",
  });
  const decoded = await AuthToken.tokenGenerator.verify(token, {});

  expect(decoded.id).toEqual(data.id);
});

it("JWT test expired", async () => {
  const data = { id: 1 };
  const token = AuthToken.tokenGenerator.sign(data, {
    expiresIn: "1s",
  });
  const expire = new Promise((resolve, reject) => {
    setTimeout(async () => {
      AuthToken.tokenGenerator.verify(token, {}).catch((error) => {
        reject(error);
      });
    }, 1300);
  });
  expect(expire).rejects.toThrow("jwt expired");
});

it("JWT test wrong token", async () => {
  const data = { id: 1 };
  let token = AuthToken.tokenGenerator.sign(data, { expiresIn: "23s" });
  token = token.slice(0, token.length - 1);
  AuthToken.tokenGenerator.verify(token, {}).catch((error) => {
    expect(error).toBeInstanceOf(Error);
  });
});

it("JWT refresh token test", async () => {
  const data = { id: 1 };
  const token = AuthToken.tokenGenerator.sign(data, { expiresIn: "1d" });
  const refreshToken = AuthToken.tokenGenerator.signRefreshToken(data, {});
  const newToken = await AuthToken.tokenGenerator.refreshToken(refreshToken, {});
  expectTypeOf(newToken).toMatchTypeOf<string>();
});

it("JWT refresh token error", async () => {
  const data = { id: 1 };
  const token = AuthToken.tokenGenerator.sign(data, { expiresIn: "1d" });
  let refreshToken = AuthToken.tokenGenerator.signRefreshToken(data, {});
  const newToken = AuthToken.tokenGenerator.refreshToken(refreshToken, {});
  expectTypeOf(newToken).toMatchTypeOf<string>();
  refreshToken = refreshToken.slice(0, refreshToken.length - 1);
  AuthToken.tokenGenerator.refreshToken(refreshToken, {}).catch((error) => {
    expect(error).toBeInstanceOf(Error);
  });
});
