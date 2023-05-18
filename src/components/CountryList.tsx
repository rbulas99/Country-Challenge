import { useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Theme, useTheme } from "../theme/ThemeProvider";
import { useGetAllCountries } from "../api/getAllCountries";
import styled from "styled-components";
import DetailedInfo from "./DetailedInfo";
import LoadingIndicator from "./LoadingIndicator";
import Filters from "./Filters";

const CountryList = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams("");
  const [debouncedSearchParams] = useDebounce(searchParams.get("name"), 500); // Debounce delay of 500 milliseconds

  const countrylist = useGetAllCountries(debouncedSearchParams);


  useEffect(() => {
    countrylist.refetch();
  }, [debouncedSearchParams]);

  return (
    <>
      <Filters />
      {countrylist.isFetching ? (
        <LoadingIndicator />
      ) : (
        <>
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
                  <CountryName
                    theme={theme}
                    onClick={() => navigate(`/${country.cca3}`)}
                  >
                    {country.name.common}
                  </CountryName>
                  <DetailedInfo
                    label={"Population"}
                    value={country.population}
                  />
                  <DetailedInfo label={"Region"} value={country.region} />
                  <DetailedInfo label={"Capital"} value={country.capital} />
                </CountryDetailInfo>
              </CountryCard>
            ))}
          </CountryListWrapper>
        </>
      )}
    </>
  );
};

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
  cursor: pointer;
`;

export default CountryList;
