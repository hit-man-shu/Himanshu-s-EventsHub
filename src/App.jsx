import {
  // Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent, {
  // action as editEventAction,
  loader as editEventLoader,
} from "./components/Events/EditEvent.jsx";
import { queryClient } from "./util/http.js";
import Hero from "./components/Events/Hero.jsx";
// import Hero from "./components/Events/Hero.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Navigate to="events" />,
    element: <Hero />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
        loader: editEventLoader,
        // action: editEventAction,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
