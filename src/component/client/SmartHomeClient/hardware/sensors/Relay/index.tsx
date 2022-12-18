import { Table } from "react-bootstrap";
import React, {useState} from "react";

import ToggleButton from "../../../../../ToggleButton";
import {ActionCreatorsMapObject} from "redux";
import {ClientSettings, DeviceSettings, PinSetting} from "../../../index";

const name: string = "8-channel-relay";

interface Relay8ChannelProps {
    actions: ActionCreatorsMapObject
    settings: DeviceSettings
}

interface PinStatus {
    status: boolean;
    timeChanged: Date | null;
}

function Relay8Channel(props: Relay8ChannelProps) {
    const relay8ChannelSettings: PinSetting[] = props.settings.used_pins;//.filter((sensor: { type: string; }) => sensor.type == name)
    let pinStatuses: PinStatus[]  = Object.values(relay8ChannelSettings).map((key) => { return {
        status: false,
        timeChanged: null
    } as PinStatus});


    const [relayStatus, setStatus] = useState(pinStatuses);

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
        console.log("channel", index+1, value, "=>", newValue)
        console.log(`relay.${props.settings.client?.ip}.toggle`, [pin, newValue])
        props.actions.call(`relay.${props.settings.client?.ip}.toggle`, [pin, newValue]);
    }

    function formatTimestamp(d: Date | null) {
        if (d == null) {
            return "N/A"
        }
        const pad = (n: number,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    // console.log(props.settings)
    return (<>
        <h2>{props.settings.name}</h2><br />
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Toggle</th>
                <th>Status</th>
                <th>Channel Name</th>
                <th>Time Changed</th>
                <th>GPIO Pin</th>
                <th>Schedule</th>
            </tr>
            </thead>
            <tbody>
            { Object.values(relay8ChannelSettings).map((key, number) => {
                const pinStatus: PinStatus = relayStatus[number];
                return <tr key={`pin_${key}_${number}`}>
                    <td>{number + 1}</td>
                    <td>
                        <ToggleButton
                            id={number}
                            isOn={pinStatus?.status}
                            handleToggle={() => { handleToggle(number, key.pin, pinStatus?.status) }}
                        />
                    </td>
                    <td>{ pinStatus?.status ? "ON" : "OFF"}</td>
                    <td>{ key.id }</td>
                    <td>{ formatTimestamp(pinStatus?.timeChanged)}</td>
                    <td>{key.pin}</td>
                    <td>Add</td>
                </tr>
                }
            )}
            </tbody>
        </Table>
    </>
    )
}

export default Relay8Channel