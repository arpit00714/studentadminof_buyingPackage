import apiUrl from "URLS/ApiUrl";

export const persnoaldetails = async (data) => {
  try {
    const response = `${apiUrl}/api/pgfresher`;
    const resp = await fetch(response, {
      method: "post",
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
export const studentData = async (uid) => {
  try {
    const response = `${apiUrl}/api/studentuser/getSudentsdata/${uid}`;
    const resp = await fetch(response);
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};
export const generatetoken = async (data) => {
  try {
    const response = `${apiUrl}/api/generatetoken`;
    const resp = await fetch(response, {
      method: "post",
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
export const pgform = async (data) => {
  try {
    const response = `${apiUrl}/api/pgfresher/getpgfresherdata`;
    const resp = await fetch(response);
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};
export const persnoaldetailsupdate = async (data, userID) => {
  try {
    const response = `${apiUrl}/api/pgfresher/update/${userID}`;
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
