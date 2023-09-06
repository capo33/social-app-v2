import App from "../App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  Profile,
  UpdateProfile,
  UserProfile,
  Notifications,
} from "../pages/User/Index";
import Protect from "../guard/Protect";
import { Home, AddPost } from "../pages/home/Index";
import { PostDetails, SavedPosts } from "../pages/post/Index";
import { ForgotPassword, Login, Register } from "../pages/auth/Index";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='profile/:id' element={<UserProfile />} />
      <Route path=':title/:id' element={<PostDetails />} />

      {/* Private routes */}
      <Route path='' element={<Protect />}>
        <Route path='profile' element={<Profile />} />
        <Route path='update-profile' element={<UpdateProfile />} />
        <Route path='create-post' element={<AddPost />} />
        <Route path='notifications' element={<Notifications />} />
        <Route path='savedPosts' element={<SavedPosts />} />
      </Route>
    </Route>
  )
);

export default routes;
