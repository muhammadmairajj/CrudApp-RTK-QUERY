import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import PostsDataFetch from './components/PostsDataFetch/PostsDataFetch';
import PostById from './components/PostsDataFetch/PostById';
import UpdatePost from './components/PostsDataFetch/UpdatePost';
import CreatePost from './components/PostsDataFetch/CreatePost';
// import PhotoCard from './components/Photos/PhotoCard';
// import PostLists from './components/Posts/PostLists';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/posts" element={ <PostsDataFetch /> } />
        <Route path="/posts/:id" element={ <PostById  /> } />
        <Route path="/posts/edit/:id" element={ <UpdatePost  /> } />
        <Route path="/createPost" element={ <CreatePost  /> } />

      </Routes>
    </BrowserRouter>
     {/* <PostLists /> */}
     {/* <PhotoCard photoId={4} /> */}
    </>
  )
}

export default App;

// https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/
// https://wanago.io/2021/12/27/redux-toolkit-query-typescript/
