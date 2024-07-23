import { Component } from 'react';

import './styles.css';


import { loadPosts } from "../../utils/load-posts";
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../TextInput';



export class Home extends Component {

  state = {
    posts: [],
    allposts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state


    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allposts: postsAndPhotos,
    });
  }
  loadMorePost = () => {
    const {
      page,
      postsPerPage,
      allposts,
      posts
    }
      = this.state;
    const nextPage = page + postsPerPage
    const nextPosts = allposts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value }
    )
  }
  render() {
    const { posts, page, postsPerPage, allposts, searchValue } = this.state;
    const noMorePost = page + postsPerPage >= allposts.length;
    const filteredPosts = !!searchValue ? allposts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })
      : posts;

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <h1>Search value : {searchValue} </h1>
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        {filteredPosts.length > 0 && (

          <Posts posts={filteredPosts} />)}
        {filteredPosts.length === 0 && (
          <p>Não existem Posts</p>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text="Load more Posts"
              onClick={this.loadMorePost}
              disabled={noMorePost} />
          )}


        </div>

      </section >
    );
  }
}



