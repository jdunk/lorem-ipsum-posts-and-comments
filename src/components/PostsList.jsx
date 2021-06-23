import { useState, useEffect } from 'react';
import config from '../config.js';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Post from './Post.jsx';

function PostsList() {
  const [posts, setPosts] = useState(null);

  const loadPosts = async () => {
    setPosts(null);

    try {
      const res = await axios.get(config.postsApiEndpoint);
      if (!res?.data?.length)
        setPosts(false);

// if (Math.random() > 0.5)
//       setPosts(false);
// else
      setPosts(res.data);
    }
    catch(e) {
      setPosts(false);
    }
  };

  // Initiate data loading from API after first [skeleton] render
  useEffect(() => {
    loadPosts();
  }, []);

  const errorLoadingPosts = (<>
    There was an error loading posts.{' '}
    <Button variant="contained" disableElevation onClick={loadPosts}>Try again?</Button>
  </>);

  const postsSkeleton = Array(10).fill().map((x, i) => (
    <Post
      key={`skeleton-${i}`}
      skeleton={true}
    />
  ));

  return (<>
    <h1>Our Latest Posts</h1>
    {
      posts === false ? errorLoadingPosts : (
        posts ?
          posts.map(post => <Post key={post.id} id={post.id} title={post.title} body={post.body} />)
          :
          postsSkeleton
      ) 
    }
  </>);
}

export default PostsList;