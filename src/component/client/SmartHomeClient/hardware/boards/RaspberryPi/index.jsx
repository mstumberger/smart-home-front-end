import React, { Component } from 'react';
import { ParentsizeSVG } from '@cutting/svg';

class RaspberryPi extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        console.log(this.props.usedPins)
        console.log()
    }

    isPinEnabled(pin, gpioPin) {
        return this.props.usedPins.map(pin => pin.pin).includes(pin) || this.props.usedPins.map(pin => pin.gpioPin).includes(gpioPin)
    }

    getPosition(row, col) {
        return {x: (col * 31) + 366, y: (row * 18.3) + 110.7 }
    }

    drawCircle(row, col, pin, gpioPin) {
        const enabled = this.isPinEnabled(pin, gpioPin)
        const circlePosition = this.getPosition(row, col)
        return <circle cx={circlePosition.x} cy={circlePosition.y} r="9" stroke="black" strokeWidth="3" fill={enabled ? "red": "green"} opacity='0.5'/>
    }
    logPins() {
        Object.values(this.props.usedPins).forEach((value, index) => {
            console.log(value, index);
        })
        return null
    }
    render() {
        return (
            <div className={"RaspberryPiImage"} style={{height: "500px"}} ref={this.myRef}>
                <ParentsizeSVG parentRef={this.myRef}>
                    <image className='img-circle' xlinkHref={this.props.image} x='0' y="0" height="600" width="491"/>
                    {/*{*/}
                    {/*    Object.values(this.props.usedPins).map((value, index) => {*/}
                    {/*        console.log(value.pin)*/}
                    {/*        const row = value.pin*/}
                    {/*        const column = value.pin%2 !== 0 ? 0: 1*/}
                    {/*        return this.drawCircle(row, column)*/}
                    {/*    } )*/}
                    {/*}*/}

                    {
                       [...Array(20).keys()].map(pin => {
                           const row = pin+1
                           const column = 0
                           return this.drawCircle(row, column, (pin * 2) + 1 )
                       })
                    }


                    {/* COL TWO */}
                    {
                       [...Array(20).keys()].map(pin => {
                           const row = pin+1
                           const column = 1
                           return this.drawCircle(row, column, (pin * 2) + 2)
                       })
                    }
                    {/*{ this.drawCircle(2, 0, null, 2) }*/}
                    {/*{ this.drawCircle(3, 0, null, 3) }*/}
                    {/*{ this.drawCircle(4, 0, null, 4) }*/}
                    {/*{ this.drawCircle(5, 0, 9, null) }*/}
                    {/*{ this.drawCircle(6, 0, null, 17) }*/}
                    {/*{ this.drawCircle(7, 0, null, 27) }*/}
                    {/*{ this.drawCircle(8, 0, null, 22) }*/}
                    {/*{ this.drawCircle(9, 0, 17, null) }*/}
                    {/*{ this.drawCircle(10, 0, null, 10) }*/}
                    {/*{ this.drawCircle(11, 0, null, 9) }*/}
                    {/*{ this.drawCircle(12, 0, null, 11) }*/}
                    {/*{ this.drawCircle(13, 0, 25, null) }*/}
                    {/*{ this.drawCircle(14, 0, 27, null) }*/}
                    {/*{ this.drawCircle(15, 0, null, 5) }*/}
                    {/*{ this.drawCircle(16, 0, null, 6) }*/}
                    {/*{ this.drawCircle(17, 0, null, 13) }*/}
                    {/*{ this.drawCircle(18, 0, null, 19) }*/}
                    {/*{ this.drawCircle(19, 0, null, 26) }*/}
                    {/*{ this.drawCircle(20, 0, 39, null) }*/}

                </ParentsizeSVG>
            </div>
        );
    }
}

export default RaspberryPi;