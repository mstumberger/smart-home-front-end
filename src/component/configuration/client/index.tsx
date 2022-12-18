import React, {useEffect, useState} from "react";
import {ActionCreatorsMapObject} from "redux";
import {Col, Container, Dropdown, DropdownButton, ListGroup, Row} from "react-bootstrap";
import {ClientSettings} from "../../client/SmartHomeClient";
import RaspberryPi from "../../client/SmartHomeClient/hardware/boards/RaspberryPi";
import axios from "axios";
import SetSensorToBoard from "../../client/SmartHomeClient/modals/SetSensorToBoard";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface SmartHomeClientProps {
    actions: ActionCreatorsMapObject
    settings: ClientSettings
}

export default (props: SmartHomeClientProps) => {
    const [boardSettings, setBoardSettings] = useState(props.settings);

    const filterAvailablePins = () => {

    }
    return (
        <Card style={{ width: '33rem' }}>
            <Card.Body>
                <Card.Title>
                    <ListGroup.Item>Device IP: { props.settings.ip }</ListGroup.Item>
                    <ListGroup.Item>Device Name: { props.settings.name}</ListGroup.Item>
                </Card.Title>
                <Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item> Used pins</ListGroup.Item>
                        <ListGroup.Item> { Object.values(props.settings?.client_used_pins).map(module => {
                        return <a>{module.pin}, </a>
                    }) }</ListGroup.Item>
                    <ListGroup.Item>Available pins</ListGroup.Item>
                    <ListGroup.Item>{/*{ JSON.stringify(JSON.parse().filter(pin => !boardSettings.usedPins.includes(pin))) }*/}</ListGroup.Item>

                    </ListGroup>
                </Card.Text>
                <Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Added Modules:</ListGroup.Item>
                        {
                            Object.values(props.settings?.configured_modules).map(module => {
                                return <ListGroup.Item>{module.name} - {module.type?.type}</ListGroup.Item>
                                }
                            )
                        }
                        <ListGroup.Item />
                    </ListGroup>
                </Card.Text>
                <Card.Text>
                    <SetSensorToBoard settings={boardSettings}/>
                </Card.Text>
                <Card.Text>
                    <div>
                        <RaspberryPi
                            image={"https://www.bigmessowires.com/wp-content/uploads/2018/05/Raspberry-GPIO.jpg"}
                            usedPins={props.settings?.client_used_pins}
                        />
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>

    );
}