import React, { useEffect, useState } from "react";
import axios from "axios";
import {connect, ConnectedProps} from 'react-redux'
import {AppDispatch, RootState} from "../../app/store";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import reduxAutobahn from 'redux-autobahn-js';
import {ClientSettings} from '../client/SmartHomeClient';
import SmartHomeClient from './client'
import { Container } from "react-bootstrap";


interface Props extends PropsFromRedux {
    backgroundColor: string
}

const ClientList = (props: Props) => {
    const defaultPosts:ClientSettings[] = [];
    const [data, setData] = useState(defaultPosts);

    useEffect(() => {
        axios
            .get("api/clients/")
            .then(result => setData(result.data));
    }, []);
    // @ts-ignore
    return <>
        <Container key={`Client_Container`}>
            {data.map(item => <SmartHomeClient actions={props.actions} settings={item} />)}
        </Container>
    </>
}

const mapDispatch = (dispatch: AppDispatch) => ({
    actions: bindActionCreators(reduxAutobahn.actions, dispatch),
    dispatch: dispatch
});

// @ts-ignore
const mapState = (state: RootState) => ({
    autobahn: state.autobahnConnection,
    websocket: state.websocketReducer,
    clients: state.clientsReducer?.clients,
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ClientList)