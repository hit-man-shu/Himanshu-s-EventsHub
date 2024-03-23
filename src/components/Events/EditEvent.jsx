import {
  Link,
  useNavigate,
  useParams,
  // redirect,
  useNavigation,
  // useSubmit,
} from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function EditEvent() {
  const navigate = useNavigate();

  const { id } = useParams();
  // const submit = useSubmit();
  const { data, isError, error } = useQuery({
    queryKey: ["events", { id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10000,
  });
  const { state } = useNavigation();

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({ queryKey: ["events", { id }] });
      const prevEvent = queryClient.getQueryData(["events", { id }]);
      queryClient.setQueryData(["events", { id }], newEvent);
      return { prevEvent };
    },

    onError: (error, data, context) => {
      queryClient.setQueryData(["events", { id }], context.prevEvent);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["events", { id }]);
    },
  });

  function handleSubmit(formData) {
    // submit(formData, { method: "PUT" });
    mutate({ event: formData, id });
    navigate(`/events/${id}`);
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export const loader = ({ params }) => {
  const id = params.id;

  return queryClient.fetchQuery({
    queryKey: ["events", { id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });
};

// export const action = async ({ params, request }) => {
//   const formData = await request.formData();

//   const updatedEventData = Object.fromEntries(formData);
//   await updateEvent({ id: params.id, event: updatedEventData });
//   queryClient.invalidateQueries(["events"]);
//   return redirect("../");
// };
