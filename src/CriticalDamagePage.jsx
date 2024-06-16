import React from 'react';
import StatCalculator from './StatCalculator';

const CriticalDamagePage = () => {
    const baseCriticalDamage = 50;
    const criticalDamageCheckboxes = [
        { label: 'Minor Force', value: 10, checked: false },
        { label: 'Major Force', value: 20, checked: false },
        { label: 'Minor Brittle', value: 10, checked: false },
        { label: 'Major Brittle', value: 20, checked: false },
        { label: 'Sul-Xan', value: 12, checked: false },
        { label: 'Elemental Catalyst', value: 15, checked: false },
        { label: 'Kilt 10 stacks', value: 10, checked: false },
        { label: 'Templar/Blade passive', value: 10, checked: false },
        { label: 'Arcanist passive', value: 12, checked: false },
        { label: 'Khajiit passive', value: 12, checked: false },
        { label: 'Fighting Finesse CP', value: 8, checked: false },
        { label: 'Backstabber CP', value: 10, checked: false },
        { label: 'Lucent Echoes', value: 11, checked: false },
        // Add more checkboxes as needed
    ];
    const criticalDamageSelects = [
        { label: 'Medium Armor', value: 0, multiplier: 2, qty: 8 },
        { label: 'Warden passive', value: 0, multiplier: 4, qty: 7 },
        // Add more selects as needed
    ];

    return (
        <StatCalculator
            baseValue={baseCriticalDamage}
            checkboxes={criticalDamageCheckboxes}
            selects={criticalDamageSelects}
            title="Critical Damage Calculator"
        />
    );
};

export default CriticalDamagePage;