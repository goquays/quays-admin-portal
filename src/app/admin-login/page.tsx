import LoginForm from '@/components/login-form/loginForm';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/assets/images/Quays-Logo-Updated.png'
import { AuthProvider } from '@/context/AuthContext';

export default function Page() {
    return <div className="min-h-screen flex-1 relative flex flex-col justify-center">
        <div className="max-w-[524px] md:px-[42px] md:py-[44px] p-7  mx-auto w-full text-2xl text-default-900  mb-3 flex flex-col justify-center font-[Montserrat]">
            <div className="flex justify-center items-center text-center mb-10 ">
                <Image src={Logo} alt='Quays Logo' width={116} height={48} />
            </div>
            <div className="text-center 2xl:mb-6 mb-4">
                <h4 className="font-semibold text-3xl">Sign in as admin</h4>
                <div className="text-gray-500 text-base">
                    Enter your details to proceed
                </div>
            </div>
            <AuthProvider><LoginForm /></AuthProvider>
            <div className="md:max-w-[345px] mx-auto font-normal text-default-500 mt-12 text-sm">
                Not an admin?{" "}
                <Link
                    href="#"
                    className="text-default-900  font-medium hover:underline"
                >
                    Sign up
                </Link>
            </div>
        </div>
    </div>
        ;
}