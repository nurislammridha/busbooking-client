import fetch from "isomorphic-unfetch";
import { API } from "../utils/config";

export const postSoldSeat = (slug, seat) =>
  axios.post(process.env.REACT_APP_API_URL + `/bookings/sold/${slug}`, { seatNumber: seat });

export const postBookSeat = async (slug, body) => {
  const resp = await fetch(`${API}/bookings/book/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const response = await resp.json();
  return response;
};
