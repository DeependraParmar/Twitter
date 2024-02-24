import Header from "@/components/Header"
import NotificationsFeed from "@/components/NotificationsFeed";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

// protecting the /notification route here 
export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context);

    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

const Notifications = () => {
    document.title = "Your Notifications";
  return (
    <>
        <Header label="Notifications" showBackArrow />
        <NotificationsFeed />
    </>
  )
}

export default Notifications
