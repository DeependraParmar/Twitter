import useRegisterModal from "@/hooks/useRegisterModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);

            await axios.post('/api/register', {
                name, username, email, password
            })

            toast.success('Account Created 🤩');
            
            signIn('credentials', {
                email, password
            });
            registerModal.onClose();
        }
        catch(error){
            console.log(error);
            toast.error('Something went wrong 😌');
        }
        finally{
            setIsLoading(false);
        }
    }, [registerModal, email, password, username, name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} type="text" />
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} type="text" />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} type="email"  />
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} type="password" />

        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account ? <span onClick={onToggle} className="text-white text-md cursor-pointer hover:underline ">Sign In</span></p>
        </div>   
    )

    return (
        <Modal body={bodyContent} title="Create an account" disabled={isLoading} isOpen={registerModal.isOpen} onClose={registerModal.onClose} actionLabel="Register" onSubmit={onSubmit} footer={footerContent} />
    )
}

export default RegisterModal;
