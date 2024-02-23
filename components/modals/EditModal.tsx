import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";


const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

    const editModal = useEditModal();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch('/api/edit', {
                name, username, bio, profileImage, coverImage
            });
            mutateFetchedUser();
            toast.success('Updated Successfully');
            editModal.onClose();
            setIsLoading(false);
        }
        catch (error) {
            toast.error("Something went wrong");
            setIsLoading(false);
        }
    }, [name, username, bio, profileImage, coverImage, mutateFetchedUser]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload Profile Picture" />
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload Cover Image" />
            <Input disabled={isLoading} placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} type="text" />
            <Input disabled={isLoading} placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} type="text" />
            <Input disabled={isLoading} placeholder="Bio" onChange={(e) => setBio(e.target.value)} value={bio} type="text" />
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={editModal.isOpen} title="Edit Your Profile" onClose={editModal.onClose} actionLabel="Save" onSubmit={onSubmit} body={bodyContent} />
    )
}

export default EditModal
