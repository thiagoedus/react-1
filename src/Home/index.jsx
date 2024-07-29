import "./styles.css";
import { useEffect, useState, useCallback } from "react";
import { loadPosts } from "../utils/load-posts";
import { Posts } from "../components/Posts";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";

export const Home = () => {
  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 6,
  //   searchValue: ""
  // };

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    console.log("Oi");
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search value: {searchValue}</h1>
          </>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts</p>}

      <div className="button-container">
        {!searchValue && (
          <Button className="button-container" text="Load More" onClick={loadMorePosts} disabled={noMorePosts} />
        )}
      </div>
    </section>
  );
};

// import { Component } from 'react'
// import './styles.css'

// export class Home extends Component {
//   state = {
//     counter: 0
//   }

//   handleClick = () => {

//     this.setState(
//       (prevState, prevProps) => {
//         console.log("PREV" + prevState.counter)
//         return {counter: prevState.counter + 1}
//       },
//       () => {
//         console.log("POST" + this.state.counter);
//       }
//     );

//   }

//   render() {

//     return (
//       <div className='container'>
//         <h1>{this.state.counter}</h1>
//         <button onClick={this.handleClick}>Increment</button>
//       </div>
//     )
//   }
// }
