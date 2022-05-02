import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userInstance } from "../api";
import './css/Login.css'

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({id: "", password: ""});
  const api = userInstance();
  const navigate = useNavigate();

  function loginInput({target: {id, value}}) {
    const newLoginInfo = {
      ...loginInfo,
      [id]: value,
    };
    setLoginInfo(newLoginInfo);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginInfo);
      localStorage.setItem('accesstoken', res.data.accessToken);
      navigate('/');
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h1>
        Login
      </h1>
      <form
        className="login-form"
        method="post"
        onSubmit={loginSubmit}
      >
        <input
          className="login-input"
          type="text"
          id="id"
          placeholder="아이디"
          value={loginInfo.id}
          onChange={loginInput}
          required 
        />
        <input
          className="login-input"
          type="password"
          id="password"
          placeholder="비밀번호"
          value={loginInfo.password}
          onChange={loginInput}
          required 
        /> <br/>
        <button className="login-button">로그인</button>
      </form>
      <div>
        <h3 style={{display: "inline-block", cursor: "not-allowed"}}>ID/PW 찾기</h3>
        <h3 style={{display: "inline-block", margin: "0 10px"}}> | </h3>
        <Link to="/signup">
          <h3 style={{display: "inline-block", cursor: "pointer", color: "black"}}>회원가입</h3>
        </Link>
      </div>
    </div>
  )
};
