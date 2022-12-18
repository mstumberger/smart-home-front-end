import React, { useEffect, useState } from "react";
import axios from "axios";
import {connect, ConnectedProps} from 'react-redux'
import {AppDispatch, RootState} from "../../app/store";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import reduxAutobahn from 'redux-autobahn-js';
import SmartHomeClient, {ClientSettings} from '../../component/client/SmartHomeClient';


interface Props extends PropsFromRedux {
    backgroundColor: string
}

const ClientList = (props: Props) => {

    return <>
        { props.clients.services !== undefined ?
            Object.keys(props.clients.services).filter((client:any) => typeof props.clients.services[client] === "object").map((client:any) => {
                // @ts-ignore
                return <SmartHomeClient actions={props.actions} settings={{
                id: -1,
                name: "Kitchen",
                ip: props.clients.services[client].ip,
                boardType: "Raspberry Pi 2B",
                enabledSensors: [ "8-channel-relay", "temp-dallas", "ir-sensor", "single-relay" ],
                used_pins: [{
                    "id": 1,
                    "pin": 3,
                    "module_pin": 0,
                    "client_id": 14,
                    "sensor_id": 2
                },{
                    "id": 2,
                    "pin": 5,
                    "module_pin": 1,
                    "client_id": 14,
                    "sensor_id": 2
                },{
                    "id": 3,
                    "pin": 7,
                    "module_pin": 2,
                    "client_id": 14,
                    "sensor_id": 2
                },{
                    "id": 4,
                    "pin": 8,
                    "module_pin": 3,
                    "client_id": 14,
                    "sensor_id": 2
                },{
                    "id": 5,
                    "pin": 11,
                    "module_pin": 4,
                    "client_id": 14,
                    "sensor_id": 2
                },{
                    "id": 6,
                    "pin": 12,
                    "module_pin": 5,
                    "client_id": 14,
                    "sensor_id": 2
                },{
                    "id": 7,
                    "pin": 13,
                    "module_pin": 6,
                    "client_id": 14,
                    "sensor_id": 2
                },{
                    "id": 8,
                    "pin": 15,
                    "module_pin": 7,
                    "client_id": 14,
                    "sensor_id": 2
                }
                ],
            }}/>
        })
        : <div>CALL</div>}

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