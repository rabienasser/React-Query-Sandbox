import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ queryKey }) => {
   const pageNumber = queryKey[1];
   return axios.get(
      `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
   );
};

export const PaginatedQueriesPage = () => {
   const [pageNumber, setPageNumber] = useState(1);
   const { isLoading, isError, data, error } = useQuery(
      ["colors", pageNumber],
      fetchColors,
      //   Keep previous data prevents UI layout shift when changing pages
      {
         keepPreviousData: true,
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
         <div>
            <button
               onClick={() => setPageNumber((page) => page - 1)}
               disabled={pageNumber === 1}
            >
               Prev Page
            </button>
            <button
               onClick={() => setPageNumber((page) => page + 1)}
               disabled={pageNumber === 4}
            >
               Next Page
            </button>
         </div>
      </>
   );
};
