import React, { Component } from 'react';
import { ParentsizeSVG } from '@cutting/svg';

class RaspberryPi extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    isPinEnabled(pin, gpioPin) {
        return this.props.usedPins.includes(pin) || this.props.usedGPIOPins.includes(gpioPin)
    }

    getPosition(row, col) {
        return {x: (col * 31) + 366, y: (row * 18.3) + 110.7 }
    }

    drawCircle(row, col, pin, gpioPin) {
        const enabled = this.isPinEnabled(pin, gpioPin)
        const circlePosition = this.getPosition(row, col)
        return <circle cx={circlePosition.x} cy={circlePosition.y} r="9" stroke="black" strokeWidth="3" fill={enabled ? "red": "green"} opacity='0.5'/>
    }

    render() {
        return (
            <div className={"RaspberryPiImage"} style={{height: "500px"}} ref={this.myRef}>
                <ParentsizeSVG parentRef={this.myRef}>
                    <image className='img-circle' xlinkHref={this.props.image} x='0' y="0" height="600" width="491"/>

                    { this.drawCircle(1, 0, 1, null) }
                    { this.drawCircle(2, 0, null, 2) }
                    { this.drawCircle(3, 0, null, 3) }
                    { this.drawCircle(4, 0, null, 4) }
                    { this.drawCircle(5, 0, 9, null) }
                    { this.drawCircle(6, 0, null, 17) }
                    { this.drawCircle(7, 0, null, 27) }
                    { this.drawCircle(8, 0, null, 22) }
                    { this.drawCircle(9, 0, 17, null) }
                    { this.drawCircle(10, 0, null, 10) }
                    { this.drawCircle(11, 0, null, 9) }
                    { this.drawCircle(12, 0, null, 11) }
                    { this.drawCircle(13, 0, 25, null) }
                    { this.drawCircle(14, 0, 27, null) }
                    { this.drawCircle(15, 0, null, 5) }
                    { this.drawCircle(16, 0, null, 6) }
                    { this.drawCircle(17, 0, null, 13) }
                    { this.drawCircle(18, 0, null, 19) }
                    { this.drawCircle(19, 0, null, 26) }
                    { this.drawCircle(20, 0, 39, null) }

                    {/* COL TWO */}
                    { this.drawCircle(1, 1, 2, null) }
                    { this.drawCircle(2, 1, 4, null) }
                    { this.drawCircle(3, 1, 6, null) }
                    { this.drawCircle(4, 1, null, 14) }
                    { this.drawCircle(5, 1, null, 15) }
                    { this.drawCircle(6, 1, null, 18) }
                    { this.drawCircle(7, 1, 14, null) }
                    { this.drawCircle(8, 1, null, 23) }
                    { this.drawCircle(9, 1, null, 24) }
                    { this.drawCircle(10, 1, 20, null) }
                    { this.drawCircle(11, 1, null, 25) }
                    { this.drawCircle(12, 1, null, 8) }
                    { this.drawCircle(13, 1, null, 7) }
                    { this.drawCircle(14, 1, 28, null) }
                    { this.drawCircle(15, 1, 30, null) }
                    { this.drawCircle(16, 1, null, 12) }
                    { this.drawCircle(17, 1, 34, null) }
                    { this.drawCircle(18, 1, null, 16) }
                    { this.drawCircle(19, 1, null, 20) }
                    { this.drawCircle(20, 1, null, 21) }

                </ParentsizeSVG>
            </div>
        );
    }
}

export default RaspberryPi;