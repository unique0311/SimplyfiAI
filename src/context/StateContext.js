import React, { createContext, useEffect, useState } from "react";
let logoutTimer;

export const StateContext = createContext({
  Login: () => {},
  logout: () => {},
  authorized: false,
});

export const StateProvider = ({ children }) => {
  const api_url = `${process.env.BACKEND_URL}`;
  console.log("api_url: ", api_url);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [teamId, setSetTeamId] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(null);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    setToken(null);
    setAuthorized(false);
  };
  const Login = async (body) => {
    await fetch(`${api_url}/login`, body)
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          setAuthorized(true);
          setToken(json.token);
          const storedPhone = localStorage.getItem("phone");
          setPhoneNumber(storedPhone);
          localStorage.setItem("token", json.token);
        }
      })
      .catch((err) => console.error("error:" + err));
  };
  useEffect(() => {
    let logoutTimer;
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const expirationTime = new Date().getTime() + 1000 * 60 * 60; // 1 hour
      logoutTimer = setTimeout(
        logoutHandler,
        expirationTime - new Date().getTime()
      );
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, []);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedPhone = localStorage.getItem("phone");
    setToken(storedToken);
    setPhoneNumber(storedPhone);
    if (storedToken) {
      setAuthorized(true);
    }
  }, []);
  return (
    <StateContext.Provider
      value={{
        api_url,
        token,
        setToken,
        phoneNumber,
        setPhoneNumber,
        authorized,
        setAuthorized,
        Login,
        logoutHandler,
        setSuccess,
        success,
        setSetTeamId,
        teamId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
