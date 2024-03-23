import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max }) {
  // eslint-disable-next-line no-useless-catch
  let url = "http://localhost:3000/events";

  if (searchTerm && max) {
    url += "?search=" + searchTerm + "&max=" + max;
  } else if (searchTerm) {
    url = `http://localhost:3000/events?search=${searchTerm}`;
  } else if (max) {
    url = `http://localhost:3000/events?max=${max}`;
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(url, { signal: signal });
    return response.data.events;
  } catch (error) {
    throw error;
  }
}

export async function createNewEvent(eventData) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(
      `http://localhost:3000/events`,
      eventData
    );
    return response.data.event;
  } catch (error) {
    throw error;
  }
}

export async function fetchSelectableImages({ signal }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`http://localhost:3000/events/images`, {
      signal,
    });

    return response.data.images;
  } catch (error) {
    throw error;
  }
}

export async function fetchEvent({ id, signal }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`http://localhost:3000/events/${id}`, {
      signal,
    });
    return response.data.event;
  } catch (error) {
    throw error;
  }
}

export async function deleteEvent({ id }) {
  // eslint-disable-next-line no-useless-catch
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.delete(`http://localhost:3000/events/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateEvent({ id, event }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`http://localhost:3000/events/${id}`, {
      event,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
