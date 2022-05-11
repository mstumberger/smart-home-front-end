import {Col, Container, Row, Table } from "react-bootstrap";
import React, {useState} from "react";

import ToggleButton from "../../ToggleButton";
import {ActionCreatorsMapObject} from "redux";
import {DeviceSettings, PinSetting} from "../../SmartHomeClient";

const name: string = "8-channel-relay";

interface Relay8ChannelProps {
    actions: ActionCreatorsMapObject
    settings: any
}

interface RelayStatus {
    channels: Map<string, PinStatus>
}
interface PinStatus {
    status: boolean;
    timeChanged: Date | null;
}

function Relay8Channel(props: Relay8ChannelProps) {

    function setPinValue(index: number, value: any) {
        let pinStatus: PinStatus = relayStatus[index];
        pinStatus.status = value;
        pinStatus.timeChanged = new Date()
        setStatus((statuses) => {
            return [...statuses.slice(0, index), pinStatus , ...statuses.slice(index +1)]
        })

        console.log(relayStatus)
    }

    const handleToggle = (index: number, pin: number, value: any) => {
        const newValue: boolean = !value;
        setPinValue(index, newValue);
        console.log(value, "=>", newValue)
        console.log(pin, newValue)
        props.actions.call('com.smart.home.relay.toggle', [pin, newValue]);
    }

    const relay8ChannelSettings: DeviceSettings = props.settings.pinConfig.gpio.filter((sensor: { type: string; }) => sensor.type == name)[0]
    let pinStatuses: PinStatus[]  = Object.values(relay8ChannelSettings.pins).map((key) => { return {
        status: false,
        timeChanged: null
    } as PinStatus});
/*    Object.values(relay8ChannelSettings.pins).forEach((key) => pinStatuses.set(key, {
        status: false,
        timeChanged: null
    }))*/

    function formatTimestamp(d: Date | null) {
        if (d == null) {
            return "N/A"
        }
        const pad = (n: number,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    const [relayStatus, setStatus] = useState(pinStatuses);
    console.log(relayStatus)

    // @ts-ignore
    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Toggle</th>
                <th>Status</th>
                <th>Channel Name</th>
                <th>Time Changed</th>
                <th>GPIO Pin</th>
                {/*<th>Schedule</th>*/}
            </tr>
            </thead>
            <tbody>
            { Object.values(relay8ChannelSettings.pins).map((key, number) => {
                const pinStatus: PinStatus = relayStatus[number];
                return <tr>
                    <td>{number + 1}</td>
                    <td>
                        <ToggleButton
                            id={number}
                            isOn={pinStatus?.status}
                            handleToggle={() => {
                                console.log(pinStatus?.status);
                                handleToggle(number, key.pin, pinStatus?.status)

                            }}
                        />
                    </td>
                    <td>{ pinStatus?.status ? "ON" : "OFF"}</td>
                    <td>{ key.name }</td>
                    <td>{ formatTimestamp(pinStatus?.timeChanged)}</td>
                    <td>{key.pin}</td>
                    {/*<td>Add</td>*/}
                </tr>
                }
            )}
            </tbody>
        </Table>
    )
}

export default Relay8Channel