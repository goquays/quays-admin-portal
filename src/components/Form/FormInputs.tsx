import React from 'react';

// Text Input Component
export const TextInput: React.FC<{ placeholder: string; value: string; onChange: (value: string) => void }> = ({
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div className="mb-6">
            <input type="text" placeholder={placeholder} value={value}
                onChange={(e) => onChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5" />
        </div>

    );
};

// Currency Input Component
export const CurrencyInput: React.FC<{ placeholder: string; value: number; onChange: (value: number) => void }> = ({
    placeholder,
    value,
    onChange,
}) => {
    // Convert the number value to a string for the input element
    const stringValue = value === 0 ? '' : value.toString(); // Handle empty input case

    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                £
            </div>
            <input
                type="number"
                placeholder={placeholder}
                value={stringValue} // Use the string value
                onChange={(e) => {
                    // Convert the string value back to a number
                    const numericValue = parseFloat(e.target.value);
                    // Pass the number to the onChange handler
                    onChange(isNaN(numericValue) ? 0 : numericValue); // Handle NaN case
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 pl-8"
            />
        </div>
    );
};

// Checkbox Component
export const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({
    label,
    checked,
    onChange,
}) => {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                {label}
            </label>
        </div>
    );
};

// Select Dropdown Component
export const SelectInput: React.FC<{ options: string[]; value: string; onChange: (value: string) => void }> = ({
    options,
    value,
    onChange,
}) => {
    return (
        <div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5" value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

// Radio Button Component
export const RadioInput: React.FC<{ options: string[]; selected: string; onChange: (value: string) => void }> = ({
    options,
    selected,
    onChange,
}) => {
    return (
        <div className='flex justify-between flex-row gap-4'>
            {options.map((option, index) => (
                <div key={index} className="flex items-center ps-4 border border-gray-200 rounded-lg basis-1/2">
                    <label className="flex w-full py-3 text-sm font-medium text-gray-900">
                        <input
                            type="radio"
                            value={option}
                            className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 focus:ring-gray-900 self-center mr-2"
                            checked={selected === option}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

// Vertical Radio Button Component
export const RadioInputVertical: React.FC<{ options: string[]; selected: string; onChange: (value: string) => void }> = ({
    options,
    selected,
    onChange,
}) => {
    return (
        <div className='flex flex-col gap-4'>
            {options.map((option, index) => (
                <div key={index} className="flex items-center ps-4 border border-gray-200 rounded-lg basis-1/2">
                    <label className="flex w-full py-3 text-sm font-medium text-gray-900">
                        <input
                            type="radio"
                            value={option}
                            className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 focus:ring-gray-900 self-center mr-2"
                            checked={selected === option}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

// Textarea Component
export const Textarea: React.FC<{ label: string; placeholder: string; value: string; onChange: (value: string) => void }> = ({
    label,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div>
            <label>{label}</label>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

// Date Input Component
export const DateInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({
    value,
    onChange,
}) => {
    return (
        <div className="relative max-w-sm">
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full ps-10 p-2.5"
            />
        </div>
    );
};

// File Input Component
export const FileInput: React.FC<{ label: string; onChange: (file: File | null) => void }> = ({
    label,
    onChange,
}) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type="file"
                onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
            />
        </div>
    );
};