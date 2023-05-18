import styled from "styled-components";
import { Theme, useTheme } from "../theme/ThemeProvider";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <FilterWrapper>
      <SearchInputWrapper theme={theme}>
        <FiSearch />
        <SearchInput
          theme={theme}
          onChange={(e) => {
            const newName = e.target.value;
            searchParams.set("name", newName);
            setSearchParams(searchParams);
          }}
        ></SearchInput>
      </SearchInputWrapper>
    </FilterWrapper>
  );
};

export default Filters;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px;
`;
const SearchInputWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.elements};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0 50px;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const SearchInput = styled.input.attrs({
  type: "search",
  placeholder: "Search for a country...",
})<{ theme: Theme }>`
  width: 100%;
  margin-left: 15px;
  padding: 15px 0;
  color: ${({ theme }) => theme.colors.text};
  background-color: inherit;
  font-weight: 600;
  border: none;
  border-radius: inherit;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;
