import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPosts, getPostsStatus, getPostsError } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const [isSSR, setIsSSR] = useState(true);
  const posts = useSelector(getAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  let content;
  if (postsStatus === 'loading') {
    content = <p>{"Loading..."}</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />);
  } else {
    content = <p>{postsError}</p>
  }

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Articles
      </h2>
      {!isSSR && content}
    </>
  );
};

export default PostsList;
