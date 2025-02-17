import { MutationCache, QueryCache } from "@tanstack/react-query";

export function clearDataCache() {
  const queryCache = new QueryCache();
  const mutationCache = new MutationCache();

  queryCache.clear();
  mutationCache.clear();
}

export const getErrorMessage = (errObj: any) => {
  // if (errObj.code && errObj.code === "ERR_NETWORK") {
  //   return "Request status unconfirmed. Please refresh page before trying again.";
  // }
  const errResponse = errObj.response;
  const errorMessage =
    errResponse && errResponse.data ? errResponse.data.message : "Something went wrong! Please try again";
  return errorMessage;
};

export function formatEnum(enumValue: string) {
  if (!enumValue) return "";
  return String(enumValue).replaceAll("_", " ").toLowerCase();
}

export const maxAgeByMinutes = (minutes: number) => ({ maxAge: minutes * 60 * 1000 });
