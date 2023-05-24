//
export const BASE_URL = process.env.NODE_ENV === "development"? "http://localhost:5660": "https://spirit-quiz-api.onrender.com";


//quiz routes
// eslint-disable-next-line
export const GET_RANDOM_QUESTIONS = `${BASE_URL}/quiz/questions/`;
// eslint-disable-next-line
export const GET_ALL_CATEGORY_QUESTIONS = `${BASE_URL}/quiz/questions/all/`;
// eslint-disable-next-line
export const GET_ALL_QUESTIONS = `${BASE_URL}/quiz/questions/all`;
// eslint-disable-next-line
export const SEARCH_QUESTIONS = `${BASE_URL}/quiz/questions/search`;
// eslint-disable-next-line
export const GET_CATEGORIES = `${BASE_URL}/quiz/categories`;
// eslint-disable-next-line
export const GET_OPTIONS = `${BASE_URL}/quiz/options/`;

//Auth Routes
// eslint-disable-next-line
export const LOGIN_URL = `${BASE_URL}/auth/login`;
// eslint-disable-next-line
export const SIGNUP_URL = `${BASE_URL}/auth/register`;
// eslint-disable-next-line
export const VERIFY_EMAIL_URL = `${BASE_URL}/auth/verify-email`;
// eslint-disable-next-line
export const REQUEST_PASSWORD_CHANGE_URL = `${BASE_URL}/auth/request-change-password`;
// eslint-disable-next-line
export const PASSWORD_RESET_URL = `${BASE_URL}/auth/reset-password`;

//image routes
// eslint-disable-next-line
export const UPLOAD_IMAGE = `${BASE_URL}/image/upload`;
// eslint-disable-next-line
export const DELETE_IMAGE = `${BASE_URL}/image/delete`;

//result routes
// eslint-disable-next-line
export const GET_RESULTS = `${BASE_URL}/result/user/`;
// eslint-disable-next-line
export const CREATE_RESULT = `${BASE_URL}/result/create`;

//user routes
// eslint-disable-next-line
export const UPDATE_USER = `${BASE_URL}/user/update`;
// eslint-disable-next-line
export const DELETE_USER = `${BASE_URL}/user/delete`;
// eslint-disable-next-line
export const GET_USER = `${BASE_URL}/user/get/`;
// eslint-disable-next-line
export const GET_USERS = `${BASE_URL}/user/users`;