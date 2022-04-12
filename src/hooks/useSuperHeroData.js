import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
   // queryKey refers to array passed into useQuery below
   const heroId = queryKey[1];
   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
   const queryClient = useQueryClient();
   return useQuery(["super-hero", heroId], fetchSuperHero, {
      //  DATA TRANSFORMATION
      select: (data) => {
         return data.data;
      },
      // INITIAL DATA
      initialData: () => {
         const hero = queryClient
            .getQueryData("super-heroes")
            ?.data?.find((hero) => hero.id === parseInt(heroId));

         if (hero) {
            return {
               data: hero,
            };
         } else {
            return undefined;
         }
      },
   });
};
