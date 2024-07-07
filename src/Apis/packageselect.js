import apiUrl from "URLS/ApiUrl";

export const universityselectBystudent = async (data) => {
  try {
    const response = `${apiUrl}/api/universitiesattach/byStudent`;
    const resp = await fetch(response, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log("universityselectBystudent", resp);
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};
