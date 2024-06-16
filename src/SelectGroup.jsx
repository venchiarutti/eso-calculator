import React from 'react';

const SelectGroup = ({ options, onChange }) => {
    const handleSelectChange = (index, event) => {
        onChange(index, event.target.value);
    };

    return (
        <div className="select-group">
            {options.map((option, index) => (
                <div key={index} className="select-label">
                    <label className="label-container">
                        <span className="label-text">{option.label}</span>
                        <select
                            value={option.value}
                            onChange={(event) => handleSelectChange(index, event)}
                        >
                            {[...Array(option.qty)].map((_, i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default SelectGroup;