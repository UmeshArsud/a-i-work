// import axios from 'axios';

// // --- 1. Configuration ---
// const BASE_URL = 'http://localhost:8080';

// // --- 2. Create the Axios Client ---
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   // CRITICAL: This forces the browser to send/receive HttpOnly Cookies
//   withCredentials: true, 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // --- 3. Interceptors (Optional but Recommended) ---
// // This makes the response cleaner. Instead of getting the whole HTTP object,
// // you just get the data you need.
// apiClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     // If the server sends an error message (like "User not found"), return that.
//     if (error.response && error.response.data) {
//       // If the backend sent a specific string message
//       if (typeof error.response.data === 'string') {
//          return Promise.reject(new Error(error.response.data));
//       }
//       // If the backend sent a JSON object with a 'message' field
//       return Promise.reject(new Error(error.response.data.message || "An error occurred"));
//     }
//     return Promise.reject(error);
//   }
// );

// // --- 4. API Functions ---

// /**
//  * Signs in a user.
//  * Corresponds to: POST /api/auth/signin
//  */
// export const signIn = (data: { username: string; password: string }) => {
//   return apiClient.post('/api/auth/signin', data);
// };

// /**
//  * Registers a new user.
//  * Corresponds to: POST /api/auth/signup
//  */
// export const signUp = (formData: {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   mobile: string;
//   password: string;
// }) => {
//   return apiClient.post('/api/auth/signup', formData);
// };

// /**
//  * Validates the current session.
//  * Corresponds to: GET /api/auth/validate-token
//  * Used by AuthContext to check if user is logged in on page refresh.
//  */
// export const validateToken = () => {
//   return apiClient.get('/api/auth/validate-token');
// };

// /**
//  * Signs out the user.
//  * Corresponds to: POST /api/auth/signout
//  * Tells server to delete the HttpOnly cookie.
//  */
// export const signOut = () => {
//   return apiClient.post('/api/auth/signout');
// };

// export default apiClient;








const BASE_URL = 'http://localhost:8080';



/**
 * A helper function to handle common fetch logic and errors.
 * @param {string} endpoint The API endpoint (e.g., '/api/auth/signin')
 * @param {object} options The options for the fetch call (method, headers, body)
 * @returns {Promise<any>} The response data
 */
async function apiFetch(endpoint: string, options: RequestInit): Promise<any> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Get the response text or JSON
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        data = await response.text(); // For plain text responses
    }

    if (!response.ok) {
        // If the server returns an error, 'data' will be the error message
        const errorMessage = (typeof data === 'object' && data.message) ? data.message : data;
        throw new Error(errorMessage || `HTTP error! Status: ${response.status}`);
    }

    return data;
}

// --- 3. Your signIn Function (which was correct) ---

/**
 * Signs in a user.
 * Corresponds to: POST /api/auth/signin
 */
export async function signIn(username: string, password: string) {
  const signInRequest = {
    username,
    password,
  };

  return apiFetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInRequest),
  });
}

// --- 4. Added signUp function (based on your controller) ---

/**
 * Registers a new user.
 * Corresponds to: POST /api/auth/signup
 */
export async function signUp(formData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
}){

  // We send the whole formData object, which matches your SignUpRequest DTO
  return apiFetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // We send the object directly
    body: JSON.stringify(formData), 
  });
}