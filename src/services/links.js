
export const BASE_URL = "https://spirit-quiz-api.onrender.com";


//auth routes
// eslint-disable-next-line
export const GET_RANDOM_20QUESTIONS = `${BASE_URL}/quiz/questions/`;
// eslint-disable-next-line
export const GET_CATEGORIES = `${BASE_URL}/quiz/categories`;

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