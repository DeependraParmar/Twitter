import React from 'react'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import { BiLogOut } from 'react-icons/bi'
import SidebarTweetButton from './SidebarTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
    const { data:currentUser } = useCurrentUser();

    const handleLogout = async() => {
        await signOut();
    }

    const items = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill,
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: BsBellFill,
            auth: true,
            alert: currentUser?.hasNotification,
        },
        {
            label: "Profile",
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true,
        },
    ]
    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className="flex flex-col items-end">
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo />
                    {
                        items.map((item, index) => (
                            <SidebarItem key={index} href={item.href} auth={item.auth} label={item.label} icon={item.icon} alert={item.alert} />
                        ))
                    }
                    {
                        currentUser &&
                            <SidebarItem label="Logout" icon={BiLogOut} onClick={handleLogout} />
                    }

                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
