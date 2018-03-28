import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    const promise = axios.get(`https://practiceapi.devmountain.com/api/posts`);
    promise.then(res => {
      this.setState(() => {
        return {
          posts: res.data,
        }
      })
    })

  }

  updatePost() {
    console.log(this.props.text)
    const promise = axios.put(`https://practiceapi.devmountain.com/api/posts`, this.props.text);
    promise.then(res => {
      this.setState(() => {
        return {
          posts: res.data,
        };
      });
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({ posts: results.data });
    });
    window.location.reload();
  }

  createPost() {
    const promise = axios.post(`https://practiceapi.devmountain.com/api/posts`)
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {posts.map((post) => {
            return <Post key={post.id} id={post.id} title={post.text} 
            date={post.date} updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}/>
          })}
        </section>
      </div>
    );
  }
}

export default App;
