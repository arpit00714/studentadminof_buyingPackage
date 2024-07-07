import apiUrl from "URLS/ApiUrl";

export const filesupload = async (data) => {
  try {
    const response = `${apiUrl}/api/filesupload`;
    const resp = await fetch(response, {
      method: "post",
      body: data
    });
    return await resp.json();
  } catch (err) {
    console.log("Err", err);
  }
};
