import apiUrl from "URLS/ApiUrl";

export const StudentDocument = async (uid) => {
  try {
    const response = `${apiUrl}/api/documentuploaded/getDocumentById/${uid}`;
    const resp = await fetch(response);
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};

export const UpdateStudentDocument = async (data, uid) => {
  try {
    const response = `${apiUrl}/api/documentuploaded/UpdateDocument/${uid}`;
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

export const UpdateStudentDocumentStatus = async (uid) => {
  try {
    const response = `${apiUrl}/api/documentuploaded/updatedocumentstatus/${uid}`;
    const resp = await fetch(response, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};

export const UpdateStudentVisaDocument = async (data, uid) => {
  try {
    const response = `${apiUrl}/api/visa/UpdateVisaDocument/${uid}`;
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
