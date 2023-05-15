import styled from "styled-components";
import { Theme, useTheme } from "../theme/ThemeProvider";

const CountryList = () => {
  const { theme } = useTheme();
  return <Container theme={theme}></Container>;
};

const Container = styled.main<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  min-height: calc(100vh - 56px);`;

export default CountryList;
