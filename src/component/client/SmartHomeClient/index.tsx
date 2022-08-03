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
    usedPins: number[];
    pinConfig: PinConfig;
}

export interface PinConfig {
    gpio: DeviceSettings[]
}

export interface DeviceSettings {
    id: number;
    type: string;
    pins: { [key: string]: PinSetting }
}

export interface PinSetting {
    name: string;
    pin: number;
}

export default (props: SmartHomeClientProps) => {
    return (
        <Container key={`Client_${props.settings.name}`}>
            <Row>
                <Col>
                    Device IP: { props.settings.ip }<br/>
                    <Relay actions={props.actions} settings={props.settings}/>
                </Col>
            </Row>
        </Container>
    );
}