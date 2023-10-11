import { ReactNode, createContext, useState } from "react";

export const ColorModeContext = createContext({
  isDarkMode: false,
  toggleColorMode: () => {}
});

export const ColorModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleColorMode = () => {
    setDarkMode(!isDarkMode)
  }

  return <ColorModeContext.Provider value={{ isDarkMode, toggleColorMode }}>{children}</ColorModeContext.Provider>
}
