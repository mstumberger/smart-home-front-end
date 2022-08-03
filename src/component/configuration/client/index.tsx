import React, {useEffect, useState} from "react";
import {ActionCreatorsMapObject} from "redux";
import {ButtonGroup, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {ClientSettings} from "../../client/SmartHomeClient";
import RaspberryPi from "../../client/SmartHomeClient/hardware/boards/RaspberryPi";
import axios from "axios";

interface SmartHomeClientProps {
    actions: ActionCreatorsMapObject
    settings: ClientSettings
}

export default (props: SmartHomeClientProps) => {

    const defaultPosts:ClientSettings[] = [];
    const [availableSensors, setAvailableSensors] = useState(defaultPosts);

    useEffect(() => {
        axios
            .get("sensors/")
            .then(result => setAvailableSensors(result.data));
    }, []);




    const addBoardSensor = (sensorType: ClientSettings ) => {
        console.log(sensorType)
        /*        useEffect(() =>
                {
                    let dts = [];
                    for (let i = 0; i < boardSettings.enabledSensors.length; i++) {
                        dts.push(boardSettings.enabledSensors[i]);
                    }
                    setBoardSensors(dts);
                }, [boardSensors]);*/
    }

    // const addBoardSensor = (sensorType: string ) => {
    //     boardSensors.push(sensorType);
    //     boardSettings.enabledSensors = boardSensors;
    //     console.log(boardSettings)
    //     setBoardSettings(boardSettings);/**/
    //     /*        useEffect(() =>
    //             {
    //                 let dts = [];
    //                 for (let i = 0; i < boardSettings.enabledSensors.length; i++) {
    //                     dts.push(boardSettings.enabledSensors[i]);
    //                 }
    //                 setBoardSensors(dts);
    //             }, [boardSensors]);*/
    // }

    const [boardSettings, setBoardSettings] = useState(props.settings);

    // let activatedSensors = boardSensors.map((sensor, i) => <li key={`sensor_${sensor}_${i}`}> { sensor } </li>);




    return (
        <Container key={`Client_${props.settings.name}`}>
            <Row>
                <Col sm>
                    Device IP: { props.settings.ip }<br/>
                    Device Name: { props.settings.name}
                </Col>
                <Col sm>
                    Add module
                    <DropdownButton as={ButtonGroup} title={"Add sensor"} id="bg-nested-dropdown-sensor">
                        {
                            Object.keys(availableSensors).map((sensorType, i) =>
                                <Dropdown.Item
                                    key={`${sensorType}_Available_Sensor_Item_${i}`}
                                    eventKey={`${sensorType}_${i}`}
                                    onClick={() => addBoardSensor(availableSensors[i])}
                                >
                                    {availableSensors[i].name}
                                </Dropdown.Item> )
                        }
                    </DropdownButton>
                </Col>
                <Col sm>
                    Selected modules:
                    <ol>
                        {/*{ activatedSensors }*/}
                    </ol>
                </Col>
            </Row>
            <Row>
                <Col sm>
                    Used pins<br />
                    { JSON.stringify(boardSettings.usedPins) }
                    <br />
                </Col>
                <Col sm>
                    Available pins<br />
                    {/*{ JSON.stringify(JSON.parse().filter(pin => !boardSettings.usedPins.includes(pin))) }*/}
                    <br />
                </Col>
            </Row>

            <Row>
                <Col sm={5}>
                    <div>
                        <RaspberryPi
                            image={"https://www.bigmessowires.com/wp-content/uploads/2018/05/Raspberry-GPIO.jpg"}
                            usedPins={[1, 6]}
                            usedGPIOPins={props.settings.usedPins}
                        />
                    </div>
                </Col>
                <Col sm={7}>
                    Configure client:<br />
                    Add devices:<br />
                    {JSON.stringify(props.settings)}
                {/*    <Relay actions={props.actions} settings={props.settings}/>*/}
                {/*    <IRSensor />*/}
                {/*    <TemperatureSensorDallas />*/}
                {/*    <TemperatureSensorDH11 />*/}
                {/*    <HumiditySensor />*/}
                {/*    <RFIDSensor />*/}
                {/*    <CO2Sensor />*/}
                </Col>
            </Row>
        </Container>
    );
}