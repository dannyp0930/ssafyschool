import { Route, Routes } from "react-router-dom";
import { Footer } from "../Common/Footer";
import "./App.css"
import Nav from "../Common/Nav";
import Home from "../Page/Home";
import Articles from "../Page/Articles";
import Notice from "../Components/Articles/Notice";
import NoticeDetail from "../Components/Articles/NoticeDetail";
import Community from "../Components/Articles/Community";
import CommunityCreate from "../Components/Articles/CommunityCreate";
import CommunityDetail from "../Components/Articles/CommunityDetail";
import TestBug from "../Components/Articles/TestBug";
import Profile from "../Page/Profile";
import Admin from "../Page/Admin";
import Login from "../Page/Login";
import Logout from "../Page/Logout";
import Signup from "../Page/Signup";
import PageNotFound from "../Page/404";

function App() {
  return (
    <div className="App">
      <Nav/>
      <div style={{minHeight: "calc(100vh - 186px)"}}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="articles" element={<Articles />}>
            <Route index element={<Notice />}></Route>
            <Route path="notice" element={<Notice />}>
              <Route path=":noticeId" element={<NoticeDetail/>}></Route>
            </Route>
            <Route path="community" element={<Community />}>
              <Route path=":communityId" element={<CommunityDetail/>}></Route>
              <Route path="create" element={<CommunityCreate/>}></Route>
            </Route>
            <Route path="testbug" element={<TestBug />}></Route>
          </Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="admin" element={<Admin />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="logout" element={<Logout />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
