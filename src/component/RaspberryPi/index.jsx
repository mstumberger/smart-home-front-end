import React, {Component} from 'react';
/*import AnimeCropped from '../images/AnimeCropped.png';*/


class RaspberryPi extends Component {
    render() {
        return (
            <div>
                <svg height="670" width="800">
                    <image className='img-circle' xlinkHref={this.props.image} x='75.5' y="15" height="670" width="670"/>
                    <circle cx="576" cy="117" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="141" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="165" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="189" r="10" stroke="black" stroke-width="5" fill="red" />
{/*
                    <circle cx="576" cy="213" r="10" stroke="black" stroke-width="5" fill="red" />
*/}
                    <circle cx="576" cy="240" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="264" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="289" r="10" stroke="black" stroke-width="5" fill="red" />
{/*
                    <circle cx="576" cy="316" r="10" stroke="black" stroke-width="5" fill="red" />
*/}
                    <circle cx="576" cy="343" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="343" r="10" stroke="black" stroke-width="5" fill="red" />
                    {/*<circle cx="576" cy="343" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="343" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="343" r="10" stroke="black" stroke-width="5" fill="red" />
                    <circle cx="576" cy="592" r="10" stroke="black" stroke-width="5" fill="red" />



                    <circle cx="576" cy="343" r="10" stroke="black" stroke-width="5" fill="red" />*/}

                    <circle cx="620" cy="165" r="10" stroke="black" stroke-width="5" fill="red" />
                    </svg>
            </div>
        );
    }
}

export default RaspberryPi;