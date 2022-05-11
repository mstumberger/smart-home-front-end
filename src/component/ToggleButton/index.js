import React from 'react';
import './Switch.css';

const Switch = ({ id, isOn, handleToggle }) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={`react-switch-new_${id}`}
                type="checkbox"
            />
            <label
                style={{ background: isOn && '#06D6A0' }}
                className="react-switch-label"
                htmlFor={`react-switch-new_${id}`}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch;