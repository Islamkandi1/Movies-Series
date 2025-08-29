import React, { createContext, useEffect, useState } from "react";
export const ChangeIconContext = createContext();

const ChangeIcon = ({ children }) => {
  const [icon, setIcon] = useState(
    localStorage.icon ? JSON.parse(localStorage.icon) : []
  );

  useEffect(() => {
    localStorage.setItem("icon", JSON.stringify(icon));
  }, [icon]);
  const values = {
    icon,
    setIcon,
  };
  return (
    <ChangeIconContext.Provider value={values}>
      {children}
    </ChangeIconContext.Provider>
  );
};

export default ChangeIcon;
