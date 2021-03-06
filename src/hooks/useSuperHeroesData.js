import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
   return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
   return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
   return useQuery("super-heroes", fetchSuperHeroes, {
      enabled: false,
      onSuccess,
      onError,
      //  DATA TRANSFORMATION
      //   select: (data) => {
      //      const heroNames = data.data.map((hero) => hero.name);
      //      return heroNames;
      //   },
   });
};

export const useAddSuperHeroData = () => {
   return useMutation(addSuperHero);
};
