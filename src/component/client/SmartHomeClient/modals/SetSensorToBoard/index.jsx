import React, {useEffect, useState, useReducer} from "react";
import {Button, Dropdown, DropdownButton, Form, InputGroup, Modal} from "react-bootstrap";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SetSensorToBoard(props) {
    const [availableSensors, setAvailableSensors] = useState([]);
    const [configuredSensorPins, setConfiguredSensorPins] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        {}
    );
    const [selectedModule, setSelectedModule] = useState({
        id: 1,
        type: "None",
        signal_pins: 0,
    });

    const [sensorName, setSensorName] = useState("");
    const [sensorDescription, setSensorDescription] = useState("");
    const [sensorEnabled, setSensorEnabled] = useState(true);



    useEffect(() => {
        axios
            .get("api/available-modules/")
            .then(result => setAvailableSensors(result.data));
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setModule = (moduleType) => {
        moduleType = JSON.parse(moduleType)
        console.log(moduleType)
        setSelectedModule(moduleType)
        setConfiguredSensorPins({})
        /*        useEffect(() =>
                {
                    let dts = [];http://127.0.0.1:8082/api/sensors/get_module_types
                    for (let i = 0; i < boardSettings.enabledSensors.length; i++) {
                        dts.push(boardSettings.enabledSensors[i]);
                    }
                    setBoardSensors(dts);
                }, [boardSensors]);*/
    }

    const configurePin = (modulePin, selectedPin, type) => {
        setConfiguredSensorPins({[modulePin]: {
            pin: selectedPin,
            module_pin: modulePin,
            client_id: props.settings.id,
            sensor_id: selectedModule.id,
            type: type
        }})
    };

    const getUsedPins = ()  => {
        return Object.keys(configuredSensorPins).map(usedPin => configuredSensorPins[usedPin].pin)
    }

    const filterAvailablePins = () => {
        // const usedPins = configuredSensorPins
        // return props.settings.availablePins.filter(availableBoardPins => availableBoardPins );
    };
    console.log(props.settings)
    let availablePins = props.settings.boardType.availablePins !== undefined ? props.settings.boardType.availablePins : [];
    console.log(selectedModule)

    const request = {
        "client": props.settings.id,
        "type": selectedModule,
        "name": sensorName,
        "description": sensorDescription,
        "used_pins": Object.values(configuredSensorPins)
    }
    console.log(request);
    console.log(Object.values(configuredSensorPins));
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add module
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Sensor to client: {props.settings.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="sensor_name">
                            <Form.Label>Sensor details</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width: "120px"}}>Name</InputGroup.Text>
                                <Form.Control
                                    value={sensorName}
                                    onChange={e => setSensorName(e.target.value)}
                                    placeholder="Enter sensor name"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width: "120px"}}>Description</InputGroup.Text>
                                <Form.Control
                                    value={sensorDescription}
                                    onChange={e => setSensorDescription(e.target.value)}
                                    placeholder="Enter sensor description"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="select_module">
                            <Form.Label>Select sensor type</Form.Label>
                            <Form.Select
                                aria-label="Sensor type"
                                onChange={(e) => setModule(e.target.value)}
                            >
                                <option>Sensor type</option>
                                { Object.keys(availableSensors).map( i =>
                                    <option
                                        value={JSON.stringify(availableSensors[i])}
                                        key={`${i+1}_Available_Sensor_Item_${i}`}

                                    >
                                        {availableSensors[i].type}
                                    </option> )
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sensor_enabled_checkbox">
                            <Form.Check type="checkbox" label="Enabled" checked={sensorEnabled} onChange={() => {
                                console.log("set to", !sensorEnabled)
                                setSensorEnabled(!sensorEnabled)
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="configure_pins">
                            <Form.Label>Configure power pins:</Form.Label>
                            { [...Array(selectedModule.power_pins).keys()].map(modulePin =>
                                <Row className="mb-1" key={modulePin}>
                                    <Form.Group as={Col} controlId="module_channel">
                                        <Form.Label>Power Pin {modulePin+1}</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId={`module_gpio_pin_${modulePin}`}>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            title={
                                                !Object.keys(configuredSensorPins).hasOwnProperty(modulePin)
                                                    ? "Select pin"
                                                    : configuredSensorPins[modulePin]?.pin
                                            }
                                            id="bg-nested-dropdown-sensor"
                                        >
                                            {
                                                availablePins !== undefined && availablePins.map(availablePin =>
                                                    <Dropdown.Item
                                                        disabled={getUsedPins().includes(availablePin)}
                                                        name={modulePin}
                                                        value={availablePin}
                                                        key={`${availablePin}_availablePins_for_sensor_${modulePin}`}
                                                        eventKey={`${modulePin}_${modulePin}`}
                                                        onClick={(e) => configurePin(modulePin, availablePin, "power")}
                                                    >
                                                        {availablePin}
                                                    </Dropdown.Item> )
                                            }
                                        </DropdownButton>
                                    </Form.Group>
                                </Row>
                            )}
                            { [...Array(selectedModule.ground_pins).keys()].map(modulePin =>
                                <Row className="mb-1" key={modulePin}>
                                    <Form.Group as={Col} controlId="module_channel">
                                        <Form.Label>Ground Pin {modulePin+1}</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId={`module_gpio_pin_${modulePin}`}>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            title={
                                                !Object.keys(configuredSensorPins).hasOwnProperty(modulePin)
                                                    ? "Select pin"
                                                    : configuredSensorPins[modulePin]?.pin
                                            }
                                            id="bg-nested-dropdown-sensor"
                                        >
                                            {
                                                availablePins !== undefined && availablePins.map(availablePin =>
                                                    <Dropdown.Item
                                                        disabled={getUsedPins().includes(availablePin)}
                                                        name={modulePin}
                                                        value={availablePin}
                                                        key={`${availablePin}_availablePins_for_sensor_${modulePin}`}
                                                        eventKey={`${modulePin}_${modulePin}`}
                                                        onClick={(e) => configurePin(modulePin, availablePin, "ground")}
                                                    >
                                                        {availablePin}
                                                    </Dropdown.Item> )
                                            }
                                        </DropdownButton>
                                    </Form.Group>
                                </Row>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="configure_pins">
                            <Form.Label>Configure signal pins:</Form.Label>
                            { [...Array(selectedModule.signal_pins).keys()].map(modulePin =>
                                <Row className="mb-1" key={modulePin}>
                                    <Form.Group as={Col} controlId="module_channel">
                                        <Form.Label>Pin {modulePin+1}</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId={`module_gpio_pin_${modulePin}`}>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            title={
                                                !Object.keys(configuredSensorPins).hasOwnProperty(modulePin)
                                                    ? "Select pin"
                                                    : configuredSensorPins[modulePin]?.pin
                                            }
                                            id="bg-nested-dropdown-sensor"
                                        >
                                            {
                                                availablePins !== undefined && availablePins.map(availablePin =>
                                                    <Dropdown.Item
                                                        disabled={getUsedPins().includes(availablePin)}
                                                        name={modulePin}
                                                        value={availablePin}
                                                        key={`${availablePin}_availablePins_for_sensor_${modulePin}`}
                                                        eventKey={`${modulePin}_${modulePin}`}
                                                        onClick={(e) => configurePin(modulePin, availablePin, "signal")}
                                                    >
                                                        {availablePin}
                                                    </Dropdown.Item> )
                                            }
                                        </DropdownButton>
                                    </Form.Group>
                                </Row>
                            )}
                        </Form.Group>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        axios.post("api/sensors/", request)
                             .then(result => console.log(result.data));

                    }}>Add module to sensor</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SetSensorToBoard;