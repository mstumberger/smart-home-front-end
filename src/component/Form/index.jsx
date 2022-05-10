import React, { Component } from 'react';
import Toggle from 'react-bootstrap-toggle';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { toggleActive: false };
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState({ toggleActive: !this.state.toggleActive });
    }

    render() {
        return (
            <form>
                <Toggle
                    onClick={this.onToggle}
                    on={<h2>ON</h2>}
                    off={<h2>OFF</h2>}
                    size="xs"
                    offstyle="danger"
                    active={this.state.toggleActive}
                />
                <input id="toggle-trigger" type="checkbox" data-toggle="toggle" />
            </form>
        )
    }

}

export default Form;