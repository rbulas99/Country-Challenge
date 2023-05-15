import React, { createContext, useContext, useState } from "react";

export type Theme = {
  theme: string;
  colors: {
    backgroundColor: string;
    elements: string;
    text: string;
    input: string;
  };
};



const lightTheme: Theme = {
  theme: "Light",
  colors: {
    backgroundColor: "hsl(0, 0%, 98%)",
    elements: "hsl(0, 0%, 100%)",
    text: "hsl(200, 15%, 8%)",
    input: "hsl(0, 0%, 52%)",
  },
};

const darkTheme: Theme = {
  theme: "Dark",
  colors: {
    backgroundColor: "hsl(207, 26%, 17%)",
    elements: "hsl(209, 23%, 22%)",
    text: "hsl(0, 0%, 100%)",
    input: "hsl(0, 0%, 52%)",
  },
};

type ThemeContextProviderProps = {
  children: React.ReactNode;
};
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {
    console.log("");
  },
});

export const ThemeProvider = ({
  children,
}: ThemeContextProviderProps): JSX.Element => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
