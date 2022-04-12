import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { useAddSuperHeroData } from "../hooks/useSuperHeroesData";

// const fetchSuperHeroes = () => {
//    return axios.get("http://localhost:4000/superheroes");
// };

export const RQSuperHeroesPage = () => {
   const [name, setName] = useState("");
   const [alterEgo, setAlterEgo] = useState("");

   const onSuccess = (data) => {
      console.log("success", data);
   };

   const onError = () => {
      console.log("error");
   };

   //    const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
   //       "super-heroes",
   //       fetchSuperHeroes,

   //       {
   //          enabled: false,
   //          onSuccess,
   //          onError,
   //          //  DATA TRANSFORMATION
   //          select: (data) => {
   //             const heroNames = data.data.map((hero) => hero.name);
   //             return heroNames;
   //          },
   //       }
   //    );

   const { isLoading, isError, data, error, isFetching, refetch } =
      useSuperHeroesData(onSuccess, onError);

   const { mutate } = useAddSuperHeroData();

   if (isLoading || isFetching) {
      return <h2>Loading...</h2>;
   }

   if (isError) {
      return <h2>{error.message}</h2>;
   }

   const addHero = () => {
      const hero = { name, alterEgo };
      mutate(hero);

      setAlterEgo("");
      setName("");
   };

   return (
      <>
         <h2>React Query Super Heroes Page</h2>
         <div>
            <label>Name</label>
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <label>Alter Ego</label>
            <input
               type="text"
               value={alterEgo}
               onChange={(e) => setAlterEgo(e.target.value)}
            />
            <button onClick={addHero}>Add Hero</button>
         </div>
         <button onClick={refetch}>Fetch Heroes</button>
         {data?.data.map((hero) => (
            <div key={hero.id}>
               <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>
         ))}
         {/* {data?.map((hero) => (
            <div key={hero}>{hero}</div>
         ))} */}
      </>
   );
};
