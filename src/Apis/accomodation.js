import apiUrl from "URLS/ApiUrl";

export const Accomodation = async (uid) => {
  try {
    const response = `${apiUrl}/api/accomodation/getaccomodation/${uid}`;
    const resp = await fetch(response);
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};
