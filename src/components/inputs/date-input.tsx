// app/dashboard/signups/components/DateInput.tsx
import React from 'react';

interface DateInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    onClick: () => void;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
    ({ value, onChange, placeholder, onClick }, ref) => (
        <div className="relative flex items-center cursor-pointer" onClick={onClick}>
            <span className="absolute left-2 text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
            <input
                type="date"
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 p-2 border border-gray-300 rounded-full text-gray-500 bg-transparent cursor-pointer"
            />
            {/* {!value && (
                <span className="absolute left-10 text-gray-400 pointer-events-none">
                    {placeholder}
                </span>
            )} */}
        </div>
    )
);

DateInput.displayName = 'DateInput'; // Add display name for debugging

export default DateInput;