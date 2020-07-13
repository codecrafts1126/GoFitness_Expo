import types from './types';

const initialState = {
    event: {
        EVNT_OBJID: "",
        EVNT_DATE: "",
        EVNT_START_TIME: "",
        EVNT_END_TIME: "",
        EVNT_AVAILABILITY: "",
        EVNT_STATUS: "",
        CLSS_OBJID: "",
        CLSS_NAME: "",
        CLSS_IMG: "",
        PLCE_OBJID: "",
        PLCE_NAME: "",
        PLCE_LATI: "",
        PLCE_LONGI: "",
        ENRLL_USER: "",
        ENRLL_COUNT: "",
        EXPIRY_STATUS: "",
        EVNT_SCHEDULED_DATE: null,
        EVNT_SCHEDULED_TIME: null,
        COACH_ID: "",
        COACH_NAME: "",
        COACH_IMG: ""
    },
    event_users: []
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_EVENT:
            return {
                ...state,
                event: action.payload,
            }
        case types.SET_EVENT_USERS:
            return {
                ...state,
                event_users: action.payload,
            }
        default:
            return state;
    }
}