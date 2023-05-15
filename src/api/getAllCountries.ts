import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../env";

export type TCountry = {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
  };
};

export const getAllCountries = async () => {
  const { data } = await axios({
    method: "get",
    url: `${API_URL}/all`,
  });
  const countryList = data.map((country: TCountry) => ({
    name: {
      common: country.name.common,
    },
    capital: country.capital,
    region: country.region,
    population: country.population,
    flags: {
      png: country.flags.png,
    },
  }));
  return countryList;
};

export const useGetAllCountries = () => {
  const countries = useQuery({
    queryKey: ["getuser"],
    queryFn: () => getAllCountries(),
  }) as UseQueryResult<TCountry[]>;
  return countries;
};
