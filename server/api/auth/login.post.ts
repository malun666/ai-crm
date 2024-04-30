import { CustomErrorCodes } from "~/constant";
import { eq, and } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import * as schema from "~/database/drizzle/schema";
import AuthToken from "~/utils/JWT";

export default defineEventHandler(async (event) => {
  const db = event.context.db as MySql2Database<typeof schema>;
  const user = schema.user;
  const { username, password } = await readBody(event);
  if (!username || !password) {
    return {
      error: "username or password is empty",
      msg: "failed",
      code: CustomErrorCodes.UNAUTHORIZED,
    };
  }
  const result = await db
    .select({
      id: user.id,
      deleteStatus: user.deleteStatus,
      userName: user.userName,
      userNick: user.userNick,
      userEmail: user.userEmail,
      userPhone: user.userPhone,
      userGender: user.userGender,
      userBirthday: user.userBirthday,
      userAvatar: user.userAvatar,
      createTime: user.createTime,
    })
    .from(user)
    .where(
      and(
        eq(user.userName, username),
        eq(user.userPassword, password),
        eq(user.deleteStatus, 1)
      )
    )
    .execute();

  if (result.length === 0) {
    return {
      error: "username or password is wrong",
      msg: "failed",
      code: CustomErrorCodes.WRONG_USERNAME_OR_PASSWORD,
    };
  }
  return {
    error: null,
    msg: "ok",
    result: {
      user: result,
      accessToken: AuthToken.tokenGenerator.sign(
        { id: result[0].id },
        { expiresIn: "1h" }
      ),
      refreshToken: AuthToken.tokenGenerator.signRefreshToken(
        { id: result[0].id },
        { expiresIn: "60d" }
      ),
    },
  };
});
