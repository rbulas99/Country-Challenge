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
        {theme.theme}
      </ThemeButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.elements};
  position: sticky;
  z-index: 100;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  @media (min-width: 768px) {
    padding: 0 50px;
  }
`;
const ThemeButton = styled.button<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.text};
  background-color: inherit;
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  font-weight: 600;
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
