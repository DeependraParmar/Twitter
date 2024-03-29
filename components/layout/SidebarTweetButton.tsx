import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
    const loginModal = useLoginModal();
    const {data: currentUser} = useCurrentUser();
    const router = useRouter();

    const onClick = useCallback(() => {
      if(!currentUser){
        return loginModal.onOpen();
      }
      router.push("/");
    }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick} className='flex justify-center items-center md:w-full'>
        <div className="mt-6 lg:hidden  rounded-full h-12 w-12 p-4 flex items-center
         justify-center bg-sky-500 hover:bg-opacity-80 cursor-pointer transition">
            <FaFeather size={24} color="white" />
         </div>
         <div className='mt-6 hidden lg:block w-full px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition'>
            <p className="hidden lg:block text-center font-semibold text-white text-[20px]">Tweet</p>
         </div>
    </div>
  )
}

export default SidebarTweetButton
