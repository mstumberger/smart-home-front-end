import React from "react";
import {ActionCreatorsMapObject} from "redux";
import {Col, Container, Row} from "react-bootstrap";
import Relay from "./hardware/sensors/Relay";

interface SmartHomeClientProps {
    actions: ActionCreatorsMapObject
    settings: ClientSettings
}

export interface ClientSettings {
    id: number;
    name: string;
    ip: string;
    disabled: boolean
    frequency: number
    show_cpus: boolean
    show_disk: boolean
    show_memory: boolean
    boardType: string;
    enabledSensors: string[];
    configured_modules: DeviceSettings
    used_pins: PinSetting[];
    client_used_pins: PinSetting[]
}


export interface DeviceSettings {
    id: number;
    client: ClientSettings;
    type: string;
    name: string;
    used_pins: PinSetting[];
}

export interface ClientSetting {

}

export interface PinSetting {
    id: number
    pin: number
    module_pin: number;
    client_id: number;
    sensor_id: number;
    // client: number | ClientSetting
    // gpioPin: number
    // type: string;
    // inputType: "pull_up"
    // module: number
    // pinModuleNumber: number
}

export default (props: SmartHomeClientProps) => {
    return (
        <Container key={`Client_${props.settings.name}`}>
            <Row>
                <Col>
                    Device IP: { props.settings.ip }<br/>
                    configured sensors on client:<br/>

                    {/*<Relay actions={props.actions} settings={props.settings}/>*/}
                </Col>
            </Row>
        </Container>
    );
}