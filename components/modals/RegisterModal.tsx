import useRegisterModal from "@/hooks/useRegisterModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);
            // todo add register and login

            registerModal.onClose();
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }, [registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} type="text" />
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} type="text" />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} type="email"  />
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} type="password" />

        </div>
    )

    return (
        <Modal body={bodyContent} title="Create an account" disabled={isLoading} isOpen={registerModal.isOpen} onClose={registerModal.onClose} actionLabel="Register" onSubmit={onSubmit} />
    )
}

export default RegisterModal;
