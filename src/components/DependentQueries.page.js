import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = ({ queryKey }) => {
   const email = queryKey[1];
   return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = ({ queryKey }) => {
   const channelId = queryKey[1];
   return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
   const { data: user } = useQuery(["user", email], fetchUserByEmail);
   const channelId = user?.data.channelId;

   const { data: channel } = useQuery(
      ["courses", channelId],
      fetchCoursesByChannelId,
      {
         enabled: !!channelId,
      }
   );
   const courses = channel?.data.courses;

   return <h2>Dependent Queries</h2>;
};
