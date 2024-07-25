import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../utils/load-posts';
import { Posts } from '../components/Posts';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: ""
  };

  
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const{page, postsPerPage} = this.state
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts:postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage,
    } = this.state

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({
      posts, page: nextPage
    })
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({
      searchValue: value
    })
  }

  render() {
    // return <h1>Olá</h1>
    // const name = this.state.name;
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = 
    !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : 
    posts;

    return (
      <section className='container'>

        <div className="search-container">
          {!!searchValue && (
            <>
            <h1>Search value: {searchValue}</h1>
            </>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>


        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}  
        


        <div className='button-container'>
          {!searchValue && (
            <Button className ='button-container' text='Load More'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}/>
          )}
        </div>
        
      </section>
    );

  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Olá mundo
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
