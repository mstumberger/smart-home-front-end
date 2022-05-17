import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientsList from "./features/clients/ClientsList";
import SideBar from "./features/SideBar"

function App() {
  return (
    <div className="App">
      <SideBar />
      <header className="App-header">

      </header>
        <Routes>
            <Route path="/" element={
                <div>
                    <h2>Dashboard:</h2>
                    <h5>Add selected sensors from devices</h5>
                    <div>
                        Available devices: device list with Ips and names
                        Available sensors on device: drop down list
                        Select dashboard to add sensor too: +
                    </div>
                    <div>
                        list of unregistered devices
                    </div>
                    <div className={"Dashboard"}>
                        <div className={"Living room"}>
                            sensors lists, readings, toggles, + remove from dashboard
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
            <Route path="clientSetup" element={
                <ClientsList backgroundColor={"blue"} />
            } />
            <Route path="notifications" element={<div />} />
            <Route path="alarmSetup" element={<div />} />
            <Route path="eventHistory" element={<div />} />
            <Route path="statistics" element={<div />} />
            <Route path="userSetup" element={<div />} />
            <Route path="logIn" element={<div />} />
            <Route path="logOut" element={<div />} />
        </Routes>
    </div>
  );
}

export default App;
