export const request = actionType => {
    return {
        type: actionType,
    };
};

export const success = (actionType, payload = {}) => {
    return {
        type: actionType,
        payload: payload,
    };
};

export const failure = (actionType, error = {}) => {
    return {
        type: actionType,
        error: error,
    };
};
