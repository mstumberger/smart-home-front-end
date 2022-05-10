import React, { useState } from 'react';
import {connect, ConnectedProps} from 'react-redux'
import {AppDispatch, RootState} from "../../app/store";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import reduxAutobahn from 'redux-autobahn-js';
import SmartHomeClient from '../../component/SmartHomeClient';


interface Props extends PropsFromRedux {
    backgroundColor: string
}

const clientList = (props: Props) => {
    const publishToSubscription = () => {
        props.actions.publish('com.example.test.subscription', [
            'Hello, world!'
        ]);
    };

    const rpcCall = () => {
        props.actions.call('com.example.test.testCall', [1, 1]);
    };

    return <>
        <button onClick={() => rpcCall()}>call</button>
        <button onClick={() => publishToSubscription()}>publish</button>
        <SmartHomeClient actions={props.actions}/>
    </>
}

const mapState = (state: RootState) => ({
    autobahn: state.autobahnConnection,
    websocket: state.websocketReducer
})

const mapDispatch = (dispatch: AppDispatch) => ({
    actions: bindActionCreators(reduxAutobahn.actions, dispatch),
    dispatch: dispatch
});

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(clientList)