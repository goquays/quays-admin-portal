'use client';
import React, { useState } from 'react';
import { PiInfoLight } from 'react-icons/pi';
import { CurrencyInput, DateInput, RadioInput, RadioInputVertical, SelectInput, TextInput } from './FormInputs';

const Form = () => {
    const [petType, setPetType] = useState('Dog');
    const [petName, setPetName] = useState('');
    const [petGender, setPetGender] = useState('Male');
    const [petDob, setPetDob] = useState('');
    const [petBreed, setPetBreed] = useState('Pedigree');
    const [donation, setDonation] = useState(0);

    // Function to dynamically replace "your pet" with the pet's name
    const replacePetName = (label: string) => {
        return label.replace(/your pet/gi, petName || 'your pet');
    };

    return (
        <div>
            <div className="mb-4">
                <h3>About your pet</h3>
            </div>
            <div className="flex flex-row items-baseline gap-8">
                <div className="basis-1/2 font-semibold">What type of pet do you have?</div>
                <div className="basis-1/2">
                    <SelectInput
                        options={['Dog', 'Cat', 'Horse', 'Rabbit']}
                        value={petType}
                        onChange={setPetType}
                    />
                </div>
            </div>
            <div className="flex flex-row items-baseline gap-8">
                <div className="basis-1/2 font-semibold">What is their name?</div>
                <div className="basis-1/2">
                    <TextInput
                        placeholder="e.g Bingo, Jack, Caesar"
                        value={petName}
                        onChange={setPetName}
                    />
                </div>
            </div>
            <div className="flex flex-row items-baseline mb-8 gap-8">
                <div className="basis-1/2 font-semibold">
                    Is {replacePetName('your pet')} male or female?
                </div>
                <div className="basis-1/2">
                    <RadioInput
                        options={['Male', 'Female']}
                        selected={petGender}
                        onChange={setPetGender}
                    />
                </div>
            </div>
            <div className="flex flex-row items-baseline mb-8 gap-8">
                <div className="basis-1/2">
                    <div className="mb-2 font-semibold">
                        What is {replacePetName('your pet')}’s date of birth?
                    </div>
                    <div className="text-xs text-gray-500" style={{ width: '70%' }}>
                        If {replacePetName('your pet')} is over 5 weeks old and you don't know the exact day, you can enter 01.
                    </div>
                </div>
                <div className="basis-1/2">
                    <DateInput value={petDob} onChange={setPetDob} />
                </div>
            </div>
            <div className="flex flex-row items-baseline mb-8 gap-8">
                <div className="basis-1/2">
                    <div className="mb-2 font-semibold">
                        Is {replacePetName('your pet')} a ...?
                    </div>
                    <button data-tooltip-target="age-help" type='button' className="flex items-center text-xs font-semibold underline gap-1" style={{ width: '70%' }}>
                        <PiInfoLight size={20} data-tooltip-trigger="click"/> Need help?
                    </button>
                    <div id="age-help" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip">
                    Just like humans, insurance costs for pets can vary due to their age. We need to know how old your pet is so that we can show you the most accurate quotes that we can. Your pet needs to be at least 5 weeks old to be covered, although some insurers' policies start from 8 weeks and over.
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div className="basis-1/2">
                    <RadioInputVertical
                        options={['Pedigree', 'Crossbreed', 'Mongrel']}
                        selected={petBreed}
                        onChange={setPetBreed}
                    />
                </div>
            </div>
            <div className="flex flex-row items-baseline gap-8">
                <div className="basis-1/2 font-semibold">How much did you pay or donate <br/>for {replacePetName('your pet')}?</div>
                <div className="basis-1/2">
                    <CurrencyInput
                        placeholder="0 - 999999"
                        value={donation}
                        onChange={setDonation}
                    />
                </div>
            </div>

        </div>
    );
};

export default Form;