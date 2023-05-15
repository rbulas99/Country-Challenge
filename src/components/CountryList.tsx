import styled from "styled-components";
import { Theme, useTheme } from "../theme/ThemeProvider";
import { useGetAllCountries } from "../api/getAllCountries";
import DetailedInfo from "./DetailedInfo";
import { FiSearch } from "react-icons/fi";

const CountryList = () => {
  const { theme } = useTheme();
  const countrylist = useGetAllCountries();

  return (
    <Container theme={theme}>
      <FilterWrapper>
        <SearchInputWrapper theme={theme}>
          <FiSearch />
          <SearchInput theme={theme}></SearchInput>
        </SearchInputWrapper>
      </FilterWrapper>
      <CountryListWrapper>
        {countrylist.data?.map((country) => (
          <CountryCard theme={theme} key={country.name.common}>
            <ImageWrapper>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
              />
            </ImageWrapper>
            <CountryDetailInfo theme={theme}>
              <CountryName theme={theme}>{country.name.common}</CountryName>
              <DetailedInfo label={"Population"} value={country.population} />
              <DetailedInfo label={"Region"} value={country.region} />
              <DetailedInfo label={"Capital"} value={country.capital} />
            </CountryDetailInfo>
          </CountryCard>
        ))}
      </CountryListWrapper>
    </Container>
  );
};

const Container = styled.main<{ theme: Theme }>`
  min-height: calc(100vh - 56px);
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const CountryListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const CountryCard = styled.li<{ theme: Theme }>`
  width: 320px;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.elements};
  border-radius: 5px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 5px;
  }
`;
const CountryDetailInfo = styled.div<{ theme: Theme }>`
  width: 100%;
  height: 50%;
  padding: 25px;
  background-color: ${({ theme }) => theme.colors.elements};
  border-radius: inherit;
`;

const CountryName = styled.div<{ theme: Theme }>`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 900;
  font-size: 16px;
`;
const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 40px;
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


export default CountryList;
