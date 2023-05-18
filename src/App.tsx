import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Theme, useTheme } from './theme/ThemeProvider';
import styled from 'styled-components';

function App() {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <Header />
      <Outlet />
    </Container>
  );
}

const Container = styled.main<{ theme: Theme }>`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

export default App;
