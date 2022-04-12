import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ pageParam = 1 }) => {
   return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
   //    const [pageNumber, setPageNumber] = useState(1);
   const { isLoading, isError, data, error } = useInfiniteQuery(
      ["colors"],
      fetchColors,
      {
         getNextPageParam: (_lastPage, pages) => {
            if (pages.length < 4) {
               return pages.length + 1;
            } else {
               return undefined;
            }
         },
      }
   );

   if (isLoading) {
      return <h2>Loading...</h2>;
   }

   if (isError) {
      return <h2>{error.message}</h2>;
   }

   return (
      <>
         {data?.data.map((color) => (
            <h1 key={color.id}>{color.label}</h1>
         ))}
      </>
   );
};
