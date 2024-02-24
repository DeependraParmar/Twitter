import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  document.title = "Twitter | Home"
  return (
    <>
      <Header label="Home" showBackArrow={false} />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
