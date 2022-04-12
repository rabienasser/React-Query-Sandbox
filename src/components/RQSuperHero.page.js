import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHeroPage = () => {
   const { heroId } = useParams();

   const { isLoading, isError, data, error } = useSuperHeroData(heroId);

   if (isLoading) {
      return <h2>Loading...</h2>;
   }

   if (isError) {
      return <h2>{error.message}</h2>;
   }

   return (
      <>
         <h2>Super Hero Details: {data?.name}</h2>
         <hr />
         <div>
            <h4>{data?.name}</h4>
            <p>{data?.alterEgo}</p>
         </div>
      </>
   );
};
