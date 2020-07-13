import types from './types';

export const setEvent = (data) => ({
    type: types.SET_EVENT,
    payload: data
});

export const setEventUsers = (data) => ({
    type: types.SET_EVENT_USERS,
    payload: data
});