import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);
            // todo add login

            loginModal.onClose();
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }, [loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading}  />
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />

        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>New to Twitter? <span onClick={onToggle} className="text-white text-md cursor-pointer hover:underline ">Create an account</span></p>
        </div>
    )

    return (
        <Modal body={bodyContent} title="Login" disabled={isLoading} isOpen={loginModal.isOpen} onClose={loginModal.onClose} actionLabel="Sign In" onSubmit={onSubmit} footer={footerContent} />
    )
}

export default LoginModal
