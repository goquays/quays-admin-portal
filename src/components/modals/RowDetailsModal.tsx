import React from 'react';
import { MdClose } from 'react-icons/md';

interface RowDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    rowData: any; // Data of the clicked row
    type: 'signup' | 'policy'; // Add a type discriminator
}

const RowDetailsModal: React.FC<RowDetailsModalProps> = ({ isOpen, onClose, rowData, type }) => {
    if (!isOpen || !rowData) return null;

    // Function to format keys into user-friendly labels
    const formatLabel = (key: string) => {
        const labels: { [key: string]: string } = {
            firstname: 'First Name',
            lastname: 'Last Name',
            fullName: 'Full Name',
            email: 'Email Address',
            phoneNumber: 'Phone Number',
            dateOfBirth: 'Date of Birth',
            address: 'Address',
            city: 'City',
            postCode: 'Post Code',
            profileImage: 'Profile Image',
            dateCreated: 'Date Created',
            policyNumber: 'Policy Number',
            emailAddress: 'Email Address',
            claimsLimit: 'Claims Limit',
            startDate: 'Start Date',
            daysLeft: 'Days Left',
            name: 'Pet Name',
            type: 'Type of Pet',
            gender: 'Pet Gender',
            breed: 'Breed Name',
            category: 'Breed Type',
            neutered: 'Is the Pet neutered?',
            chipped: 'Is the Pet chipped?',
            coverPreExistingConditions: 'Does the policy cover pre-existing conditions?',
            amount: 'Pet Purchase/Loan Amount',
        };
        return labels[key] || key; // Return the formatted label or the original key if not found
    };

    // Function to render a section with a title and data
    const renderSection = (title: string, data: { [key: string]: any }) => (
        <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">{title}</h4>
            <div className='flex flex-wrap gap-2'>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="pb-2 mb-2 w-[45%]">
                        <p className="text-base font-medium text-black">{formatLabel(key)}</p>
                        <p className="border border-gray-200 rounded-full text-sm text-gray-600 p-2 mt-2 truncate">
                            {typeof value === 'string' || typeof value === 'number' ? value : 'N/A'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    // Function to render pet information
    const renderPetInformation = (pets: any[]) => (
        <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Pet Information</h4>
            {pets.map((pet, index) => (
                <div key={index} className="mb-4">
                    <h5 className="text-md font-medium mb-2">Pet {index + 1}</h5>
                    <div className='flex flex-wrap gap-2'>
                        {Object.entries(pet).map(([key, value]) => (
                            <div key={key} className="pb-2 mb-2 w-[45%]">
                                <p className="text-base font-medium text-black">{formatLabel(key)}</p>
                                <p className="border border-gray-200 rounded-full text-sm text-gray-600 p-2 mt-2 truncate">
                                    {typeof value === 'string' || typeof value === 'number' ? value : 'N/A'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50" onClick={onClose}>
            <div
                className="w-1/4 bg-white h-screen shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out"
                style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }} // Slide in/out animation
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                <MdClose size={24} className="text-black cursor-pointer mb-6" onClick={onClose} />
                <div className="space-y-4">
                    {/* Conditional Rendering Based on Type */}
                    {type === 'signup' ? (
                        // Signup Page Data
                        renderSection('User Information', {
                            firstname: rowData.firstname,
                            lastname: rowData.lastname,
                            email: rowData.email,
                            phoneNumber: rowData.phoneNumber,
                            dateOfBirth: rowData.dateOfBirth,
                            address: rowData.address,
                            city: rowData.city,
                            postCode: rowData.postCode,
                            profileImage: rowData.profileImage,
                            dateCreated: rowData.dateCreated,
                        })
                    ) : (
                        // Policy Page Data
                        <>
                            {renderSection('Pet Owner Details', {
                                fullName: rowData.fullName,
                                emailAddress: rowData.emailAddress,
                                phoneNumber: rowData.phoneNumber,
                                address: rowData.address,
                                dateCreated: rowData.dateCreated,
                            })}
                            {rowData.pets && rowData.pets.length > 0 && renderPetInformation(rowData.pets)}
                            {renderSection('Payment Information', {
                                claimsLimit: rowData.claimsLimit,
                                startDate: rowData.startDate,
                                daysLeft: rowData.daysLeft,
                            })}
                            {rowData.pets && rowData.pets.length > 0 && (
                                renderSection('Pet Cover Details', {
                                    coverPreExistingConditions: rowData.pets[0].coverPreExistingConditions,
                                    amount: rowData.pets[0].amount,
                                })
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RowDetailsModal;