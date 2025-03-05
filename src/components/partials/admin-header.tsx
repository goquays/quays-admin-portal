import Image from 'next/image'
import React from 'react'
import User from '/public/assets/images/user-image.png'
import { MdKeyboardArrowDown } from "react-icons/md";

export const AdminHeader = () => {
    return (
        <header className='flex flex-row px-10 py-6 items-center justify-between shadow-md font-[Inter] sticky top-0 z-10 bg-[#fffaf6]'>
            <div className="text-2xl font-semibold">Welcome, Samantha</div>
            <div className='flex gap-4 p-2 cursor-pointer items-center rounded-md hover:shadow-md'>
                <Image src={User} alt='User Image' className='rounded-sm'/>
                <span className='text-base font-medium'>Samantha Cook</span>
                <MdKeyboardArrowDown />
            </div>
        </header>
    )
}
