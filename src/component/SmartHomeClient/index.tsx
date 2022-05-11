import Relay8Channel from "../Relay/Relay8Channel";
import IRSensor from "../IRSensor"
import TemperatureSensorDallas from "../TemperatureSensorDallas"
import {useState} from "react";
import {ActionCreatorsMapObject} from "redux";
import RaspberryPi from "../RaspberryPi";

interface SmartHomeClientProps {
    actions: ActionCreatorsMapObject
}

export interface ClientSettings {
    id: number;
    name: string;
    ip: string;
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
    const [usedPins, setUsedPins] = useState([2, 3, 4, 17, 27, 22, 10, 9]);
    const settings: ClientSettings = {
        id: -1,
        name: "Kitchen",
        ip: "192.168.0.129",
        boardType: "raspberry pi 2",
        enabledSensors: [ "8-channel-relay", "temp-dallas", "ir-sensor", "single-relay" ],
        usedPins,
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
    }
    return (
        <div style={{ width: "300px", height: "400px" }}>
            Device IP: { settings.ip }
            <br />
            <RaspberryPi image={"https://www.bigmessowires.com/wp-content/uploads/2018/05/Raspberry-GPIO.jpg"}/>
            <br />
            { JSON.stringify(usedPins) }
            <br />
            Configure client:<br />
            Add devices:<br />
            - relay<br />
            - relay 8 channel<br />
            <Relay8Channel actions={props.actions} settings={settings}/>
            - IR sensor<br />
            <IRSensor />
            - Temperature sensor Dallas
            <TemperatureSensorDallas />
        </div>
    );
}