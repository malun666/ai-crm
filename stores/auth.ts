import { defineStore } from "pinia";
import { StorageKeys } from "~/constant";
import type { UserInfo } from "~/types/UserInfo";

export const useAuthStore = defineStore("auth", () => {
  // const siteMenuCollapsed = ref(false);
  const accessToken = ref(sessionStorage.getItem(StorageKeys.ACCESS_TOKEN));
  const refreshToken = ref(localStorage.getItem(StorageKeys.REFRESH_TOKEN));
  const user = ref<UserInfo | null>(
    JSON.parse(sessionStorage.getItem(StorageKeys.USER_INFO) || "null")
  );

  function setAccessToken(token: string) {
    accessToken.value = token;
    // add to the session storage
    sessionStorage.setItem(StorageKeys.ACCESS_TOKEN, token);
  }

  function setRefreshToken(token: string) {
    refreshToken.value = token;
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, token);
  }

  function setUser(userInfo: UserInfo) {
    user.value = userInfo;
    sessionStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(user));
  }

  async function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const res: any = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });
      return res;
    } catch (error) {
      return {
        code: 500,
        msg: "Internal Server Error",
        error,
      };
    }
  }

  return {
    accessToken,
    refreshToken,
    user,
    setAccessToken,
    setRefreshToken,
    login,
    setUser,
  };
});
