import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';
import { ClipLoader } from 'react-spinners';

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  if(posts?.length === 0){
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <ClipLoader color='lightblue' size={60} />
      </div>
    )
  }
  return (
    <>
      {posts.map((post: Record<string, any>,) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;