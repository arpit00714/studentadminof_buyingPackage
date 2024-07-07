import apiUrl from "URLS/ApiUrl";

export const UpdateStudentSteps = async (data, uid) => {
  try {
    const response = `${apiUrl}/api/studentuser/update/${uid}`;
    const resp = await fetch(response, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};
