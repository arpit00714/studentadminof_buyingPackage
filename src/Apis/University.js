import apiUrl from "URLS/ApiUrl";

export const UniversityList = async (uid) => {
  try {
    const response = `${apiUrl}/api/adduniversities/getuniversities`;
    const resp = await fetch(response);
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};

export const UniversityListByAdmin = async (uid) => {
  try {
    const response = `${apiUrl}/api/universitiesattach/byAdmin/${uid}`;
    const resp = await fetch(response);
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};

export const UpdateStudentUniverstatus = async (data, uid) => {
  try {
    const response = `${apiUrl}/api/universitiesattach/updatestudentSelectionstatus/${uid}`;
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
