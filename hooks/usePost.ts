import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (postId: string) => {
    const url = postId ? `/api/posts/${postId}` : null ;
    const {data, error , mutate, isLoading} = useSWR(url, fetcher);

    return {data, error, isLoading, mutate};
}

export default usePost;