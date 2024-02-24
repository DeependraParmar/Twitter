import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
    data: Record<string, any>
    userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId: userId });

    const goToUser = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`);
    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (!currentUser) {
            loginModal.onOpen();
        }

        toggleLike();
    }, [loginModal, currentUser, toggleLike]);

    const cancelGoToPost = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }, [router]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);

    const LikedIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <div className="border-b-[1px] border-neutral-900 p-5 cursor-pointer hover:bg-neutral-900 transition" onClick={goToPost}>
            <div className="flex flex-row items-start gap-3">
                <div>
                    <Avatar userId={data.user.id} />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                        <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">{data.user.name}</p>
                        <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline hidden md:block">@{data.user.username}</span>
                        <span className="text-neutral-500 text-sm hidden md:block">{createdAt}</span>
                    </div>
                    <span className="text-neutral-500 text-sm md:hidden">{createdAt}</span>
                    <div onClick={cancelGoToPost} className="text-white mt-1">{data.body}</div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                            <AiOutlineMessage size={20} />
                            <p>{data.comments?.length || 0}</p>
                        </div>
                        <div onClick={(e) => onLike(e)} className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                            <LikedIcon size={20} className={hasLiked ? 'text-red-500' : ''} />
                            <p>{data.likedIds.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem
