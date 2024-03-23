import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "../util/http";

const useFetchEvent = (id) => {
  const query = useQuery({
    queryKey: ["events", { id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  return query;
};

export default useFetchEvent;
