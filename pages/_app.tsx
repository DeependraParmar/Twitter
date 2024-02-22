import Layout from "@/components/Layout";
// import Modal from "@/components/Modal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    {/* <Modal title="Test Modal" isOpen onClose={() => {}} onSubmit={() => {}} actionLabel="Submit" /> */}
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}
