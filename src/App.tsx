import { Route, Routes } from 'react-router-dom'
import '../src/assets/css/main.scss'
import 'react-toastify/dist/ReactToastify.css';
import "yet-another-react-lightbox/styles.css";
import Dashboard from './pages/dashboard'
import Layout from './layouts/Layout'
import Users from './pages/users'
import Login from './pages/auth/login'
import Forum from './pages/forum';
import ForumDetail from './pages/forum/details';
import UserDetail from './pages/users/details';
import Story from './pages/story';
import Resources from './pages/resources';
import ResourceDetail from './pages/resources/detail';
import Posts from './pages/post';
import PostDetail from './pages/post/details';
import ReportedPost from './pages/reported-post';





function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/posts/:id" element={<PostDetail/>}/>
          <Route path="/forums" element={<Forum />}/>
          <Route path="/forums/:id" element={<ForumDetail/>}/>
          <Route path='/stories' element={<Story/>}/>
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/resources/:id' element={<ResourceDetail/>}/>
          <Route path='/reported-post' element={<ReportedPost/>}/>


        </Route>
        <Route path="login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
