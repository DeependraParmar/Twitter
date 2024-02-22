import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
    const loginModal = useLoginModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <Modal body={bodyContent} title="Login" disabled={isLoading} isOpen={loginModal.isOpen} onClose={loginModal.onClose} actionLabel="Sign in" onSubmit={onSubmit} />
    )
}

export default LoginModal
