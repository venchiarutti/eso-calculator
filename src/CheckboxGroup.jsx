import React from 'react';

const CheckboxGroup = ({ options, onChange }) => {
    const handleCheckboxChange = (index) => {
        onChange(index);
    };

    return (
        <div className="checkbox-group">
            {options.map((option, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;