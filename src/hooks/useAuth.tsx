import type { AuthUser } from "../components/model/handler";
import { getAccessToken, getUserProfile, putAccessToken, removeAccessToken } from "../utils/data";
import React from "react";

const useAuth = () => {
  const [check, setCheck] = React.useState(true);
  const [valid, setValid] = React.useState(false);
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [token, setToken] = React.useState<string | null>(() => getAccessToken());

  React.useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setValid(false);
        setUser(null);
        setCheck(false);
        return;
      }

      setCheck(true);
      try {
        const { error, data } = await getUserProfile();

        if (error) {
          removeAccessToken();
          setValid(false);
          setUser(null);
        } else {
          setValid(true);
          setUser(data);
        }
      } catch (error) {
        removeAccessToken();
        setValid(false);
        setUser(null);
        setToken(null);
      } finally {
        setCheck(false);
      }
    };

    validateToken();
  }, [token]);

  const saveToken = (newToken : string | null) => {
    if (newToken) {
      putAccessToken(newToken);
      setToken(newToken);
    } else {
      removeAccessToken();
      setToken(null);
    }
  };

  const logout = () => {
    saveToken(null);
  };

  return { check, valid, user, setUser, saveToken, logout };
};

export default useAuth;
