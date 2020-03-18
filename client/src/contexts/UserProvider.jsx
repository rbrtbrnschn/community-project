import React, { createContext, useState, useEffect } from "react";
const context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/auth/test")
      .then(res => res.json())
      .then(data => {
        setUser(data);
        console.log(data);
      });
  }, []);

  return <context.Provider value={user}>{children}</context.Provider>;
};

UserProvider.context = context;

export default UserProvider;
