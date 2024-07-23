import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import { loadPosts } from "../../utils/load-posts";
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10); // Removed setter as it's not being changed
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = searchValue
    ? allPosts.filter(post =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(0, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(page, postsPerPage);
  }, [handleLoadPosts, page, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className='container'>
      <div className="search-container">
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 ? (
        <Posts posts={filteredPosts} />
      ) : (
        <p>Não existem Posts</p>
      )}

      <div className='button-container'>
        {!searchValue && (
          <Button
            text="Load more Posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};
