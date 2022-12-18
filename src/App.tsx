import React, {useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientsList from "./features/clients/ClientsList";
import ClientsConfiguration from "./component/configuration/";
import SideBar from "./features/SideBar"
import {Container} from "react-bootstrap";
import Relay8Channel from "./component/client/SmartHomeClient/hardware/sensors/Relay";
import {AppDispatch, RootState} from "./app/store";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import reduxAutobahn from "redux-autobahn-js";
import {connect, ConnectedProps} from "react-redux";
import {ClientSettings, DeviceSettings} from "./component/client/SmartHomeClient";
import axios from "axios";
import SmartHomeClient from "./component/configuration/client";

interface Props extends PropsFromRedux {}

function App(props: Props) {
    const defaultPosts:DeviceSettings[] = [];
    const [data, setData] = useState(defaultPosts);

    useEffect(() => {
        axios
            .get("api/modules-detail/")
            .then(result => setData(result.data));
    }, []);
    // @ts-ignore
  return (
    <div className="App">
      <SideBar />
      <header className="App-header">

      </header>
        <Container  className="App-Container">
            <Routes>
                <Route path="/" element={
                    <div>
                        <h2>Dashboard:</h2>
                        <h5>Add selected sensors from devices</h5>
                        <div>
                            Available devices: device list with Ips and names
                            Available sensors on device: drop down list
                            Select dashboard to add sensor too: +
                        </div><br />
                        <div>
                            list of unregistered devices
                        </div><br />
                        <div className={"Dashboard"}>
                            <div>
                                Dashboard list (configured hardware to interact with)
                            </div><br />
                            <ClientsList backgroundColor={"blue"} />
                            <div className={"Living room"}>
                                sensors lists, readings, toggles, + remove from dashboard
                                {data.map(item => <Relay8Channel actions={props.actions} settings={item} />)}

                            </div>
                            <div className={"Bed room"}>

                            </div>
                            <div className={"Kitchen"}>

                            </div>
                            <div className={"Basement"}>

                            </div>
                            <div className={"Garden"}>

                            </div>
                        </div>
                    </div>
                } />
                <Route path="clientSetup" element={ <ClientsConfiguration backgroundColor={"blue"} /> } />
                <Route path="notifications" element={<div />} />
                <Route path="alarmSetup" element={<div />} />
                <Route path="eventHistory" element={<div />} />
                <Route path="statistics" element={<div />} />
                <Route path="userSetup" element={<div />} />
                <Route path="logIn" element={<div />} />
                <Route path="logOut" element={<div />} />
            </Routes>
        </Container>
    </div>
  );
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

export default connector(App)