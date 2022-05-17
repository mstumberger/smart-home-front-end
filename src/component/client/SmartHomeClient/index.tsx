import Relay from "./hardware/sensors/Relay";
import IRSensor from "./hardware/sensors/IRSensor"
import TemperatureSensorDallas from "./hardware/sensors/TemperatureSensorDallas"
import {useState} from "react";
import {ActionCreatorsMapObject} from "redux";
import RaspberryPi from "./hardware/boards/RaspberryPi";
import {ButtonGroup, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import TemperatureSensorDH11 from "./hardware/sensors/TemperatureSensorDH11";
import HumiditySensor from "./hardware/sensors/HumiditySensor";
import RFIDSensor from "./hardware/sensors/RFIDSensor";
import CO2Sensor from "./hardware/sensors/CO2Sensor";

interface SmartHomeClientProps {
    actions: ActionCreatorsMapObject
    settings: ClientSettings
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
    const availableBoards = {
        "Raspberry Pi 2B": {
            image: "https://www.bigmessowires.com/wp-content/uploads/2018/05/Raspberry-GPIO.jpg",
            availablePins: [3,5,7,8,11,12,13,15,16,18,19,21,22,23,24,26,29,31,32,33,35,36,37,38,40],
            availableGPIOPins: [2,3,4,14,15,17,18,27,22,23,24,10,9,25,11,8,7,5,6,12,13,19,16,26,20,21]
        },
/*        "Banana Pro": {
            image: "https://www.bigmessowires.com/wp-content/uploads/2018/05/Raspberry-GPIO.jpg",
            availablePins: []
        },
        "ESP32": {
            image: "https://www.bigmessowires.com/wp-content/uploads/2018/05/Raspberry-GPIO.jpg",
            availablePins: []
        }*/
    };

    const availableFeatures = {
        "Relay": {
            requiredPins: 1,
            details: "Relay requires at least one active GPIO pin"
        },
        "IRSensor": {
            requiredPins: 1,
            details: "Relay requires at least one active GPIO pin"
        },
        "TemperatureSensorDallas": {
            requiredPins: [],
            details: "Relay requires at least one active GPIO pin"
        },
        "TemperatureSensorDH11": {
            requiredPins: [],
            details: "Relay requires at least one active GPIO pin"
        },
        "HumiditySensor": {
            requiredPins: [],
            details: "Relay requires at least one active GPIO pin"
        },
        "RFIDSensor": {
            requiredPins: [],
            details: "Relay requires at least one active GPIO pin"
        },
        "CO2Sensor": {
            requiredPins: [],
            details: "Relay requires at least one active GPIO pin"
        },
    }

    const [boardSettings, setBoardSettings] = useState(props.settings);

    const setBoardType = (selectedBoard: string) => {
        boardSettings.boardType = selectedBoard;
        setBoardSettings(boardSettings);
    }
    // @ts-ignore
    const boardImage: string | null = availableBoards[boardSettings.boardType]?.image;
    // @ts-ignore
    const boardAvailablePins: number[] = availableBoards[boardSettings.boardType]?.availableGPIOPins;

    return (
        <Container>
            <Row>
                <Col sm>
                    Device IP: { props.settings.ip }
                </Col>
                <Col sm>
                    Selected board:
                    <DropdownButton as={ButtonGroup} title={boardSettings.boardType} id="bg-nested-dropdown">
                        {
                            Object.keys(availableBoards).map((board, i) =>
                                <Dropdown.Item
                                    key={`${board}_Available_Item_${i}`}
                                    eventKey={`${board}_${i}`}
                                    onClick={() => setBoardType(board)}
                                >
                                    {board}
                                </Dropdown.Item> )
                        }
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col sm>
                    Used pins<br />
                    { JSON.stringify(props.settings.usedPins) }
                    <br />
                </Col>
                <Col sm>
                    Available pins<br />
                    { JSON.stringify(boardAvailablePins.filter(pin => !props.settings.usedPins.includes(pin))) }
                    <br />
                </Col>
            </Row>
            <Row>
                <Col sm={5}>
                    <div>
                        <RaspberryPi image={boardImage} usedPins={[1, 6]} usedGPIOPins={props.settings.usedPins}/>
                    </div>
                </Col>
                <Col sm={7}>
                    Configure client:<br />
                    Add devices:<br />
                    <Relay actions={props.actions} settings={props.settings}/>
                    <IRSensor />
                    <TemperatureSensorDallas />
                    <TemperatureSensorDH11 />
                    <HumiditySensor />
                    <RFIDSensor />
                    <CO2Sensor />
                </Col>
            </Row>
            <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
        </Container>
    );
}