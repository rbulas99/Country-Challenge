import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCountry } from "../api/getCountry";
import { Theme, useTheme } from "../theme/ThemeProvider";
import styled from "styled-components";
import DetailedInfo from "./DetailedInfo";
import LoadingIndicator from "./LoadingIndicator";
import { BsArrowLeftShort } from "react-icons/bs";

const CountryView = () => {
  const { name } = useParams();
  const { theme } = useTheme();
  const { data, isError, isLoading, refetch } = useGetCountry(name);
  const navigate = useNavigate();
  const [languagesArr, setLanguageArr] = useState([""]);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    refetch();
    if (data && data[0]) {
      setLanguageArr(Object.values(data[0]?.languages || []));
      const currencies = Object.values(
        (data[0]?.currencies as { name: string; symbol: string }[]) || []
      );
      if (currencies.length > 0) {
        setCurrency(currencies[0]?.name || "");
      }
    }
  }, [data, name, refetch]);

  const hasBorderCountries = "borders" in (data?.[0] ?? {});

  return (
    <Container>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Button theme={theme} onClick={() => navigate("/")}>
            <BsArrowLeftShort /> Back
          </Button>
          {isError ? (
            <>PAGE NOT FOUND</>
          ) : (
            <CountryData>
              <ImageWrapper>
                <img
                  src={data?.[0].flags.png}
                  alt={`Flag of ${data?.[0].name.common}`}
                />
              </ImageWrapper>
              <CountryDetailData theme={theme}>
                <CountryInfo>
                  <DetailedInfoGroup>
                    <CountryName>{data?.[0].name.common}</CountryName>
                    <DetailedInfo
                      label={"Native Name"}
                      value={data?.[0].altSpellings[2]}
                    ></DetailedInfo>
                    <DetailedInfo
                      label={"Population"}
                      value={data?.[0].population}
                    ></DetailedInfo>
                    <DetailedInfo
                      label={"Region"}
                      value={data?.[0].region}
                    ></DetailedInfo>
                    <DetailedInfo
                      label={"Sub Region"}
                      value={data?.[0].subregion}
                    ></DetailedInfo>
                    <DetailedInfo
                      label={"Capital"}
                      value={data?.[0].capital}
                    ></DetailedInfo>
                  </DetailedInfoGroup>

                  <DetailedInfoGroup>
                    <DetailedInfo
                      label={"Top Level Domain"}
                      value={`.${data?.[0].altSpellings[0].toLowerCase()}`}
                    ></DetailedInfo>
                    <DetailedInfo
                      label={"Languages"}
                      value={languagesArr}
                    ></DetailedInfo>
                    <DetailedInfo
                      label={"Currencies"}
                      value={currency}
                    ></DetailedInfo>
                  </DetailedInfoGroup>
                </CountryInfo>
                {hasBorderCountries && <p>Border Countries:</p>}
                <BorderCountries>
                  {hasBorderCountries &&
                    data?.[0].borders.map((country: string) => (
                      <Button
                        key={country}
                        theme={theme}
                        onClick={() => navigate(`/${country}`)}
                      >
                        {country}
                      </Button>
                    ))}
                </BorderCountries>
              </CountryDetailData>
            </CountryData>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 40px;
`;
const CountryData = styled.div`
  display: flex;

  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    height: 100%;
  }
`;
const Button = styled.button<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  padding: 5px 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.elements};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
const ImageWrapper = styled.div`
  margin: 40px 0;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  @media (min-width: 768px) {
    width: 50%;
    img {
      width: 65%;
      height: 100%;
      object-fit: fill;
    }
  }
`;
const CountryDetailData = styled.div<{ theme: Theme }>`
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  @media (min-width: 768px) {
    width: 50%;
  }
`;
const CountryName = styled.div`
  position: relative;
  top: -20px;
  font-size: 24px;
  font-weight: 900;
`;
const DetailedInfoGroup = styled.div`
  margin: 40px 0;
`;

const BorderCountries = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 40px auto;
`;

const CountryInfo = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 100px;
  }
`;

export default CountryView;
