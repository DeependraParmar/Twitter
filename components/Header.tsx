import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { TiArrowBack } from 'react-icons/ti'

interface HeaderProps {
    label: string
    showBackArrow: boolean
}

const Header: React.FC<HeaderProps> = ({label, showBackArrow}) => {
    const router = useRouter();

    // navigating the user to the back page from arrow
    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <div className='border-b-[1px] border-neutral-800 p-5'>
            <div className='flex flex-row items-center gap-2'>
                {
                    showBackArrow && (
                        <TiArrowBack size={28} onClick={handleBack} color='white' className='cursor-pointer hover:opacity-70 transition' />
                    )
                }
                <h1 className='text-white text-xl font-semibold'>{label}</h1>
            </div>
        </div>
    )
}

export default Header
