import ProgressBar from '@/components/Form/ProgressBar'
import Image from 'next/image'
import { PiArrowCircleLeftThin } from "react-icons/pi";
import React from 'react'
import Form from '@/components/Form/Form';

const quoteForm = () => {
    return (
        <div className='flex flex-col container p-4'>
            {/* Navigation */}
            <div className='flex flex-row justify-between items-baseline'>
                <div className='basis-1/5'>
                    <Image src='/Quays-Logo.png' alt='Logo' width={143} height={46} objectFit='contain' />
                </div>
                <div className='basis-3/5 flex flex-row justify-evenly gap-8'>
                    <div className='basis-1/2'><ProgressBar /></div>
                    <div className='basis-1/2'><ProgressBar /></div>
                </div>
                <div className='basis-1/4'></div>
            </div>
            {/* Head Section */}
            <section className=' flex flex-row gap-16 w-4/5 items-baseline self-center'>
                <div style={{ color: 'black' }}>
                    <PiArrowCircleLeftThin size={40} />
                </div>
                
                <div className='flex flex-col gap-12'>
                    {/* Form Info */}
                    <div className='font-[family-name:montserrat]'>
                        <div className=''>
                            <h1 className='text-center'>Paw-some Protection for Your <br /> Furry BFF</h1>
                        </div>
                        <div className='text-base leading-8 font-medium'>
                            <p><b>For your cover to be valid,</b> please make sure that the below statements are correct:</p>
                            <ul>
                                <li>You are the owner of your pet</li>
                                <li>You live with them at the same address</li>
                                <li>You are a full-time UK resident</li>
                            </ul>
                            <p>We'll send your pet's details to insurers to find the best plan for you both.</p>
                        </div>
                    </div>
                    {/* Form */}
                    <Form />
                </div>
            </section>
        </div>
    )
}

export default quoteForm