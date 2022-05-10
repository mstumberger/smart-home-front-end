import React, { Component } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import reduxAutobahn from 'redux-autobahn-js';
import { Connection } from 'autobahn';
import { store } from '../../app/store';
import {
    setAmount,
} from '../counter/counterSlice';

const isConnected = props => props.autobahnConnection.connection.isConnected;
const isSubscribed = (props, topic) =>
    props.autobahnConnection.subscriptions.filter(s => s.topic === topic).length >
    0;

class App extends Component {
    componentDidMount() {}

    componentWillReceiveProps(newProps) {
        if (this.isNewConnection(newProps)) {
            function onevent(args) {
                console.log(args);
            }
            this.props.actions.subscribe('example.oncounter', onevent);
        }
        if (this.isNewSubscription(newProps, 'example.oncounter')) {
            console.log('new subscription to:', 'example.oncounter');
        }
    }

    isNewConnection(newProps) {
        return !isConnected(this.props) && isConnected(newProps);
    }

    isNewSubscription(newProps, topic) {
        return !isSubscribed(this.props, topic) && isSubscribed(newProps, topic);
    }

    unsubscribe = () => {
        // unsubscribe by string should work
        // this.props.actions.unsubscribe('com.example.test.subscription');
        this.props.actions.unsubscribe(
            this.props.autobahnConnection.subscriptions[0]
        );
    };

    connect = () => {
        store.setAutobahnConnection(
            new Connection({
                url: `ws://localhost:8080/ws`,
                realm: 'realm1'
            })
        );
        console.log('open connection', this.props.actions);
        this.props.actions.openConnection();
    };

    publishToSubscription = () => {
        this.props.actions.publish('com.example.test.subscription', [
            'Hello, world!'
        ]);
    };

    registerMethod = () => {
        function add2(args) {
            return args[0] + args[1];
        }
        this.props.actions.register('com.example.test.testCall', add2);
    };

    rpcCall = () => {
        this.props.actions.call('com.example.test.testCall', [1, 1]);
    };

    render() {
        return (
            <div className="App">
                <h2>Redux autobahn test</h2>
                <h3>{this.props.message}</h3>
                <div>
                    <button onClick={e => this.connect()}>Connect</button>
                </div>
                <div>
                    <button
                        disabled={!this.props.connected || !this.props.subscription}
                        onClick={e => this.publishToSubscription()}
                    >
                        Publish to Subscription
                    </button>
                    <br />
                    <button
                        disabled={!this.props.connected || !this.props.subscription}
                        onClick={e => this.unsubscribe()}
                    >
                        Unsubscribe
                    </button>
                </div>
                <div>
                    <button
                        disabled={!this.props.connected}
                        onClick={e => this.registerMethod()}
                    >
                        Register RPC method
                    </button>
                </div>
                <div>
                    <button
                        disabled={!this.props.connected || !this.props.method}
                        onClick={e => this.rpcCall()}
                    >
                        RPC call
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(reduxAutobahn.actions, dispatch),
    dispatch: dispatch
});

const mapStateToProps = state => ({
    autobahnConnection: state.autobahnConnection,
    message: state.websocketReducer.message,
    connected: state.websocketReducer.connected,
    method: state.websocketReducer.method,
    subscription: state.websocketReducer.subscription
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);