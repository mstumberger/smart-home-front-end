import {Col, Container, Row, Table } from "react-bootstrap";
import React, {useState} from "react";

import ToggleButton from "../../ToggleButton";
import {ActionCreatorsMapObject} from "redux";

interface Relay8ChannelProps {
    actions: ActionCreatorsMapObject
    settings: object
}

function Relay8Channel(props: Relay8ChannelProps) {
    const [value, setValue] = useState(false);

    const handleToggle = () => {
        props.actions.call('com.smart.home.relay.toggle', [27, !value]);
        setValue(!value)
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>GPIO Pin</th>
                <th>Toggle</th>
                <th>Status</th>
                <th>Actual Status</th>
                <th>Time Changed</th>
                <th>Schedule</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            <tr>
                <td>2</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            <tr>
                <td>3</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            <tr>
                <td>4</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            <tr>
                <td>5</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            <tr>
                <td>6</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            <tr>
                <td>7</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            <tr>
                <td>8</td>
                <td>21</td>
                <td>
                    <ToggleButton
                        isOn={value}
                        handleToggle={() => handleToggle()}
                    />
                </td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>{ value ? "ON" : "OFF"}</td>
                <td>3.3.2020</td>
                <td>Add</td>
            </tr>
            </tbody>
        </Table>
    )
}

export default Relay8Channel