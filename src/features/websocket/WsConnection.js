import React, { Component } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import reduxAutobahn from 'redux-autobahn-js';
import { Connection } from 'autobahn';
import { store } from '../../app/store';

const isConnected = props => props.autobahnConnection.connection.isConnected;
const isSubscribed = (props, topic) =>
    props.autobahnConnection.subscriptions.filter(s => s.topic === topic).length >
    0;

export const url = `${document.location.protocol === 'http:' ? 'ws:' : 'wss:'}//${document.location.host.split(':')[0]}:8082/ws`;

class App extends Component {

    componentWillMount() {
        this.connect()
    }

    componentWillReceiveProps(newProps) {
        if (this.isNewConnection(newProps)) {
            function onevent(args) {
                console.log(args);
            }
            this.props.actions.subscribe('services_status', onevent);
            this.rpcCall()
        }
        if (this.isNewSubscription(newProps, 'services_status')) {
            console.log('new subscription to:', 'services_status');
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
                url,
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

    rpcCall2 = () => {
        this.props.actions.call('com.example.test.testCall', [1, 1]);
    };

    rpcCall = () => {
        this.props.actions.call('online_clients', []);
    };

    render() {
        console.log(this.props.message)
        return (
            <div className="App">
                <h2>Redux autobahn test</h2>
                <h3>{JSON.stringify(this.props.message)}</h3>
                <div>
                    <button onClick={() => this.connect()}>Connect</button>
                </div>
                <div>
                    <button
                        disabled={!this.props.connected || !this.props.subscription}
                        onClick={() => this.publishToSubscription()}
                    >
                        Publish to Subscription
                    </button>
                    <br />
                    <button
                        disabled={!this.props.connected || !this.props.subscription}
                        onClick={() => this.unsubscribe()}
                    >
                        Unsubscribe
                    </button>
                </div>
                <div>
                    <button
                        disabled={!this.props.connected}
                        onClick={() => this.registerMethod()}
                    >
                        Register RPC method
                    </button>
                </div>
                <div>
                    <button
                        disabled={!this.props.connected || !this.props.method}
                        onClick={() => this.rpcCall()}
                    >
                        RPC call
                    </button>
                </div>

                <div>
                    <button onClick={() => this.rpcCall()}>call</button>
                </div>
                <div>
                 <button onClick={() => this.publishToSubscription()}>publish</button>
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