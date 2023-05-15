import styled from "styled-components";
import { Theme, useTheme } from "../theme/ThemeProvider";
import { BsMoon } from "react-icons/bs";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <HeaderContainer theme={theme}>
      <Logo theme={theme}>Where in the world?</Logo>
      <ThemeButton onClick={toggleTheme} theme={theme}>
        <BsMoon />
        {theme.theme === "Light" ? "Dark Mode" : "Light Mode"}
      </ThemeButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header<{ theme: Theme }>`
  position: sticky;
  top: 0px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  width: 100%;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.elements};
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  @media (min-width: 768px) {
    padding: 0 50px;
  }
`;
const ThemeButton = styled.button<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.text};
  border: none;
  font-weight: 600;
  cursor: pointer;
`;
const Logo = styled.h2<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  @media (min-width: 768px) {
    font-size: 18px;
    font-weight: 900;
  }
`;

export default Header;
