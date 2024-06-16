import React from 'react';
import StatCalculator from './StatCalculator';

const PenetrationPage = () => {
    const basePenetration = 0;
    const penetrationCheckboxes = [
        { label: 'Major Breach', value: 5948, checked: false },
        { label: 'Minor Breach', value: 2974, checked: false },
        { label: 'Crusher', value: 2108, checked: false },
        { label: 'Piercing CP', value: 700, checked: false },
        { label: 'Velothi', value: 1650, checked: false },
        { label: 'Tremorscale', value: 2000, checked: false },
        { label: 'Alkosh', value: 6000, checked: false },
        { label: 'Crimson', value: 1650, checked: false },
        { label: 'Necro Passive', value: 1500, checked: false },
        { label: 'Crystal Weapon', value: 1000, checked: false },
        // Add more checkboxes as needed
    ];
    const penetrationSelects = [
        { label: 'Light Armor', value: 0, multiplier: 939, qty: 8 },
        { label: 'Arc Passive', value: 0, multiplier: 991, qty: 4 },
        { label: 'Set Pen Lines', value: 0, multiplier: 1487, qty: 3 },
        { label: 'Force of Nature', value: 0, multiplier: 660, qty: 4 },
        // Add more selects as needed
    ];

    return (
        <StatCalculator
            baseValue={basePenetration}
            checkboxes={penetrationCheckboxes}
            selects={penetrationSelects}
            title="Penetration Calculator"
        />
    );
};

export default PenetrationPage;