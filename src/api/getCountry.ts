import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../env";

type TCurrency = any;

export type TDetailedCountry = {
  name: {
    common: string
  }
  altSpellings: string[],
  area: number;
  population: number;
  borders: string[],
  capital: string[],
  car:{
    side: string,
    signs: string[]
  }
  flags:{
    png: string
  },
  languages: unknown,
  region: string,
  subregion: string,
  currencies: unknown,
};

export const getCountry = async (countryName: string | undefined) => {
  !countryName && Promise.reject('Country Name is undefined')
  const { data } = await axios({
    method: "get",
    url: `${API_URL}/alpha/${countryName}`,
  });

 
  return data;
};

export const useGetCountry = (countryName: string | undefined) => {
  const country = useQuery({
    queryKey: ["getCountry"],
    queryFn: () => getCountry(countryName),
  }) as UseQueryResult<TDetailedCountry[]>;
  return country;
};
