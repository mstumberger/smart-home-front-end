
const initialState = {
    connected: false,
    method: false,
    subscription: false,
    message: ''
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'autobahn/CONNECTION_OPENED':
            return {
                ...state,
                connected: true,
                message: `Connected to WAMP`
            };

        case 'autobahn/SUBSCRIBED':
            return {
                ...state,
                subscription: action.topic,
                message: `Subcribed to ${action.topic}`
            };

        case 'autobahn/UNSUBSCRIBED':
            return {
                ...state,
                subscription: false,
                message: `Unsubcribed from ${action.topic}`
            };

        case 'autobahn/PUBLISHED':
            return {
                ...state,
                message: `Published ${action.args[0]} to ${action.topic}`
            };

        case 'autobahn/REGISTERED':
            return {
                ...state,
                message: 'Registered a method to the WAMP server',
                method: true
            };

        case 'autobahn/RESULT':
            return {
                ...state,
                message: `Published ${action.args} to WAMP method, received ${
                    action.results
                }`
            };

        case 'autobahn/EVENT':
            return {
                ...state,
                message: `${action.args[0]}`
            };

        default:
            return state;
    }
};

export default reducer;