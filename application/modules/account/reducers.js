import types from './types';

const initialState = {
    isRTL: false,
    logged: false,
    reseted: false,
    signup: false,
    user: {
        name: '',
        email: '',
        phone: '',
        unique_id: '',
        privClass: '',
        id: '',
        weight: '',
        height: '',
        age: '',
        sex: '',
        status: '',
        birthdate: '',
        user_image: ''
    }
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_RTL:
            return {
                ...state,
                isRTL: action.payload,
            }
        case types.SET_LOGIN:
            return {
                ...state,
                logged: action.payload,
            };
        case types.SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case types.SET_LOGOUT:
            return {
                logged: action.payload,
                user: initialState
            }
        case types.RESET_PASSWORD:
            return {
                ...state,
                reseted: action.payload,
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                signup: action.payload,
            }
        default:
            return state;
    }
}