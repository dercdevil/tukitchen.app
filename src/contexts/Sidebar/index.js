import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SidebarContext = createContext({
  collapsed: false,
  toggle: () => {},
});

export const SidebarManager = ({ children, initialState }) => {
  const [collapsed, setCollapsed] = useState(initialState);
  useEffect(() => {
    setCollapsed(initialState);
  }, [initialState]);
  const toggle = () => {
    setCollapsed(!collapsed);
    AsyncStorage.setItem("sidebar", !collapsed);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};
