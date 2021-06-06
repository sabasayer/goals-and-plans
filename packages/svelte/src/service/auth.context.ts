import { setContext } from "@apollo/client/link/context";

export const apolloAuthContext = setContext((_, prevContext: any) => {
  const jwt_token = sessionStorage.getItem("auth-token");

  return {
    headers: {
      ...prevContext.headers,
      "auth-token": jwt_token,
    },
  };
});
