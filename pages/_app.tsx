import Layout from "@/components/Layout";
import EditModal from "@/components/modals/EditModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <LoginModal />
      <RegisterModal />
      <EditModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: 'black',
            color: 'white',
            border: '1px solid gray',
            fontWeight: 'normal',
          },
          success: {
            iconTheme: {
              primary: 'green',
              secondary: 'white'
            }
          },
          error: {
            iconTheme: {
              primary: 'red',
              secondary: 'white'
            }
          }
        }}
        
        />
    </SessionProvider>
  )
}
