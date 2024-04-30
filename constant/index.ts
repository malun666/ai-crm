export const ErrorHttpCodes = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const CustomErrorCodes = {
  UNAUTHORIZED: 10001, // 用户名密码有一个为空
  WRONG_USERNAME_OR_PASSWORD: 10002, // 用户名密码错误
  FORBIDDEN: 10003, // 权限不足
  NOT_FOUND: 10004, // 未找到
  INTERNAL_SERVER_ERROR: 10005, // 服务器内部错误
  BAD_GATEWAY: 10006, // 网关错误
  SERVICE_UNAVAILABLE: 10007, // 服务不可用
  GATEWAY_TIMEOUT: 10008, // 网关超时
};

// session|local storage keys
export const StorageKeys = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_INFO: "user_info",
};