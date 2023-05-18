import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Theme, useTheme } from "../theme/ThemeProvider";
import { BsArrowLeftShort } from "react-icons/bs";
import { useGetCountry } from "../api/getCountry";
import DetailedInfo from "./DetailedInfo";
import LoadingIndicator from "./LoadingIndicator";
import { useEffect } from "react";

const CountryView = () => {
  const { name } = useParams();
  const { theme } = useTheme();
  const { data, isError, isLoading, refetch } = useGetCountry(name);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [name, refetch]);

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
                <CountryName>{data?.[0].name.common}</CountryName>
                <DetailedInfoGroup>
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
                  <DetailedInfo
                    label={"Top Level Domain"}
                    value={`.${data?.[0].altSpellings[0].toLowerCase()}`}
                  ></DetailedInfo>
                </DetailedInfoGroup>
              <BorderCountries>
                {data?.[0].borders.map((country) => (
                  <Button key={country} theme={theme} onClick={() => navigate(`/${country}`)}>
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
    height: 100%;
    flex-direction: row;
    align-items: center;
  }
`;
const Button = styled.button<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content:center;
  width: 76px;
  padding: 5px 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.colors.elements};
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.text};
  @media (min-width: 768px) {
    width: 50%;
   
  }`;
const CountryName = styled.div`
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

export default CountryView;
