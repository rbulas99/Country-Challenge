import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../env";

export type TCountry = {
  name: {
    common: string;
  };
  cca3: string;
  population: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
  };
};

export const getAllCountries = async (searchParams?: string | null) => {
  
  const { data } = await axios({
    method: "get",
    url: searchParams ? `${API_URL}/name/${searchParams}` : `${API_URL}/all`,
  });
  //returned data is very long so i cutted it
  const countryList = data.map((country: TCountry) => ({
    name: {
      common: country.name.common,
    },
    cca3: country.cca3,
    capital: country.capital,
    region: country.region,
    population: country.population,
    flags: {
      png: country.flags.png,
    },
  }));
  return countryList;
};

export const useGetAllCountries = (searchParams?: string | null) => {
  const countries = useQuery({
    queryKey: ["getAllCountries"],
    queryFn: () => getAllCountries(searchParams),
  }) as UseQueryResult<TCountry[]>;
  return countries;
};
