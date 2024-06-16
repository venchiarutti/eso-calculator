import React, { useState, useEffect } from 'react';
import CheckboxGroup from './CheckboxGroup';
import SelectGroup from './SelectGroup';
import './App.css';

const StatCalculator = ({ baseValue, checkboxes, selects, title }) => {
    const [checkboxOptions, setCheckboxOptions] = useState(checkboxes);
    const [selectOptions, setSelectOptions] = useState(selects);
    const [total, setTotal] = useState(baseValue);

    useEffect(() => {
        calculateTotal();
    }, [checkboxOptions, selectOptions]);

    const handleCheckboxChange = (index) => {
        const newCheckboxOptions = [...checkboxOptions];
        newCheckboxOptions[index].checked = !newCheckboxOptions[index].checked;
        setCheckboxOptions(newCheckboxOptions);
    };

    const handleSelectChange = (index, value) => {
        const newSelectOptions = [...selectOptions];
        newSelectOptions[index].value = Number(value);
        setSelectOptions(newSelectOptions);
    };

    const calculateTotal = () => {
        let newTotal = baseValue;
        checkboxOptions.forEach(option => {
            if (option.checked) {
                newTotal += option.value;
            }
        });
        selectOptions.forEach(option => {
            newTotal += option.value * option.multiplier;
        });
        setTotal(newTotal);
    };

    let a = "";
    let color = "red";
    let additionalText = "";

    if (title === "Critical Damage Calculator") {
        a = "%";
        if (total >= 125) {
            color = "green";
            additionalText = "Overcrit: " + (total - 125);
        }
    } else if (title === "Penetration Calculator") {
        a = "";
        if (total >= 18200) {
            color = "green";
            additionalText = "Overpen: " + (total - 18200);
        }
    }

    return (
        <div className="calculator-container">
            <div className="background-container">
                <img src={"image.png"} alt=""/>
                <div className="form-container">
                    <h2>{title}</h2>
                    <CheckboxGroup options={checkboxOptions} onChange={handleCheckboxChange}/>
                    <SelectGroup options={selectOptions} onChange={handleSelectChange}/>
                    <div className="total-container">
                        <p className={color}>Total: {total}{a}</p>
                        {additionalText ? <p className="additional-text">{additionalText}{a}</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCalculator;