const BASE_URL = "http://127.0.0.1:8000/";
import axios from "axios";
import Cookies from "js-cookie";
const csrfToken = Cookies.get("csrftoken"); // Fetch CSRF token from cookies
export interface Response {
  success: boolean;
  message: string;
  data?: any; // Adjust according to the actual response structure
  user?: any;
  session?: any;
}

export const signin = async (
  username: string,
  password: string
): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(
      BASE_URL,
      {
        username: username,
        pass1: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const logout = async (
  userId: string,
): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(
      BASE_URL + "logout",
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const signup = async (
  username: string,
  firstName: string,
  lastName: string,
  idNumber: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(
      BASE_URL + "signup",
      {
        username,
        firstName,
        lastName,
        idNumber,
        email,
        phoneNumber,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
};

export const signout = async (): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(BASE_URL + "signout", {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const test_shift = async (
  userId: string | null,
  sessionId: string | null
): Promise<Response | null> => {
  console.log("HERE");
  console.log(userId);
  console.log(sessionId);
  if (!userId || !sessionId) {
    return null;
  }
  try {
    const response = await axios.post<Response>(
      BASE_URL + "shift",
      {
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: `Session ${sessionId}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const get_my_shifts = async (
  userId: string | null,
  sessionId: string | null
): Promise<Response | null> => {
  console.log("HERE");
  console.log(userId);
  console.log(sessionId);
  if (!userId || !sessionId) {
    return null;
  }
  try {
    const params = new URLSearchParams();
    params.append("userId", userId);
    const response = await axios.get<Response>(`${BASE_URL}myshifts`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        Authorization: `Session ${sessionId}`,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const get_employees_shifts = async (
  userId: string | null,
  sessionId: string | null
): Promise<Response | null> => {
  console.log("HERE");
  console.log(userId);
  console.log(sessionId);
  if (!userId || !sessionId) {
    return null;
  }
  try {
    const params = new URLSearchParams();
    const response = await axios.get<Response>(`${BASE_URL}employeesinfo`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        Authorization: `Session ${sessionId}`,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const get_profile = async (
  userId: string | null,
  sessionId: string | null
): Promise<Response | null> => {
  if (!userId || !sessionId) {
    return null;
  }
  try {
    const params = new URLSearchParams();
    params.append("userId", userId);
    const response = await axios.get<Response>(`${BASE_URL}profile`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        Authorization: `Session ${sessionId}`,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const post_edit_profile = async (
  userId: string | null,
  sessionId: string | null,
  first_name: string, 
  last_name : string,
  email:string,
  cell_phone:string
): Promise<Response | null> => {
  if (!userId || !sessionId) {
    return null;
  }
  try {
    const response = await axios.post<Response>(
      `${BASE_URL}editprofile`,
      {
        userId,
        first_name,
        last_name,
        email,
        cell_phone
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          // Authorization: `Session ${sessionId}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const post_start_shift = async (user_id:string, shift_id : string): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(BASE_URL + `start-shift/${user_id}/${shift_id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const post_join_shift = async (user_id:string, shift_id : string): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(BASE_URL + `register-for-shift/${user_id}/${shift_id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};

export const get_all_shifts = async (
  userId: string | null,
  sessionId: string | null
): Promise<Response | null> => {
  if (!userId || !sessionId) {
    return null;
  }
  try {
    const params = new URLSearchParams();
    params.append("userId", userId);
    const response = await axios.get<Response>(`${BASE_URL}get_all_shifts`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        Authorization: `Session ${sessionId}`,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
};