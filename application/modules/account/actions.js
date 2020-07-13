import types from './types';

export const setRTL = (data) => ({
    type: types.SET_RTL,
    payload: data
});

export const setLogin = (data) => ({
    type: types.SET_LOGIN,
    payload: data,
});

export const setUser = (data) => ({
    type: types.SET_USER,
    payload: data,
});

export const setLogout = (data) => ({
    type: types.SET_LOGOUT,
    payload: data,
});

export const resetPassword = (data) => ({
    type: types.RESET_PASSWORD,
    payload: data,
});

export const signupSuccess = (data) => ({
    type: types.SIGNUP_SUCCESS,
    payload: data
});
