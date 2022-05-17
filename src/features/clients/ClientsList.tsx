import React  from 'react';
import {connect, ConnectedProps} from 'react-redux'
import {AppDispatch, RootState} from "../../app/store";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import reduxAutobahn from 'redux-autobahn-js';
import SmartHomeClient from '../../component/client/SmartHomeClient';


interface Props extends PropsFromRedux {
    backgroundColor: string
}

const clientList = (props: Props) => {
    return <>
        <SmartHomeClient actions={props.actions} settings={{
            id: -1,
            name: "Kitchen",
            ip: "192.168.0.129",
            boardType: "Raspberry Pi 2B",
            enabledSensors: [ "8-channel-relay", "temp-dallas", "ir-sensor", "single-relay" ],
            usedPins: [2, 3, 4, 17, 27, 22, 10, 9],
            pinConfig: {
            gpio: [
        {
            id: -4,
            type: "8-channel-relay",
            pins: {
            1: {name: "Switch 1", pin: 2},
            2: {name: "Switch 2", pin: 3},
            3: {name: "Switch 3", pin: 4},
            4: {name: "Switch 4", pin: 17},
            5: {name: "Luč", pin: 27},
            6: {name: "Switch 6", pin: 22},
            7: {name: "Switch 7", pin: 10},
            8: {name: "Switch 8", pin: 9}
        }
        }, {
            id: -2,
            type: "temp-dallas",
            pins: {
            1: {name: "kitchen window", pin: 8}
        }
        }, {
            id: -5,
            type: "ir-sensor",
            pins: {
            1: {name: "kitchen window", pin: 9}
        }
        }, {
            id: -6,
            type: "single-relay",
            pins: {
            1: {name: "kitchen window", pin: 26}
        }
        }
            ]
        }
        }}/>
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