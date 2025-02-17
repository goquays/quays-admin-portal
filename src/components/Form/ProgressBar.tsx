import React from 'react'

const ProgressBar = () => {
    return (
        <div>
            <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200 mb-3'>
                <div className='bg-gray-900 h-2.5 rounded-full' style={{ width: "45%" }}></div>
            </div>
            <div className='flex justify-center'>
                Pet Details
            </div>
        </div>
    )
}

export default ProgressBar