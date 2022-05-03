import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiInstance } from "../../api";
import { AiFillCheckCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import './css/EditProfile.css';
import withReactContent from "sweetalert2-react-content";
import { duplicateEmail, duplicateNickname } from "../../api/UserAPI";

export default function EditProfile() {
  const { state } = useLocation();
  const [ user, setUser ] = useState({
    nickname: "",
    email: "",
  });
  const [ checkNickname, setCheckNickname ] = useState(true);
  const [ checkEmail, setCheckEmail ] = useState(true);
  const [ originNickname, setOriginNickname ] = useState("");
  const [ originEmail, setOriginEmail ] = useState("");
  const navigate = useNavigate();
  const API = apiInstance();
  const MySwal = withReactContent(Swal);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  
  // 유저 정보 호출
  useEffect(() => {
    async function saveUser() {
      const res = await apiInstance().get('/users/me')
      setUser({
        nickname: res.data.nickname,
        email: res.data.email,
      })
      setOriginNickname(res.data.nickname);
      setOriginEmail(res.data.email);
    };
    saveUser(); 
  }, [])

  // 유효성 검사
  function validation() {
    if ( checkEmail && checkNickname ) return true
    return false
  };

  // 유저 정보 변경
  function handleChange({target: {id, value}}) {
    if (id === "nickname") {
      if (originNickname === value) {
        setCheckNickname(true);
      } else {
        setCheckNickname(false);
      }
    } else if (id === "email") {
      if (originEmail === value) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
    }
    const newUser = {
      ...user,
      [id]: value,
    };
    setUser(newUser);
  };

  // 유저 정보 수정
  async function handleSubmit() {
    if (validation()) {
      try {
        await API.put('/users/me', user);
        await MySwal.fire({
          icon: "success",
          title: "정보 수정 성공!",
        }).then(function() {navigate(-1)})
      } catch (error) {
        console.log(error)
      }
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: `${
          [!checkNickname && "닉네임", !checkEmail && "이메일"].filter(text => text.length > 0).join(', ')
        }을(를) 확인하세요`,
      });
    }
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit-row">
        <div className="profile-edit-title">닉네임</div>
        <input
          className="profile-edit-input"
          id="nickname"
          value={user.nickname}
          onChange={handleChange}
        />
        {checkNickname ? (
          <div
            className="profile-check-confirm"
          >
            <AiFillCheckCircle/>
          </div>
        ) : (
          <div
            className="profile-check"
            onClick={() => {
              duplicateNickname(
                user.nickname,
                Toast,
                setCheckNickname
            )}}
          >
            중복확인
          </div>
        )}
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-title">이메일</div>
        <input
          className="profile-edit-input"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        {checkEmail ? (
          <div
            className="profile-check-confirm"
          >
            <AiFillCheckCircle/>
          </div>
        ) : (
          <div
            className="profile-check"
            onClick={() => {
              duplicateEmail(
                user.email,
                Toast,
                setCheckEmail
            )}}
          >
            중복확인
          </div>
        )}
      </div>
      <div className="profile-edit-row">
        <Link
          className="to-password"
          to="password"
          state={{
            user: state.user
          }}
        >
          비밀번호를 수정하려면 여기를 클릭하세요.
        </Link>
      </div>
      <div className="profile-edit-buttons">
        <Link
          className="profile-link-back"
          to="/profile"
          state={{
            user: state.user
          }}
        >
          뒤로
        </Link>
        <div
          className="profile-edit-button"
          onClick={handleSubmit}
        >
          수정
        </div>
      </div>
    </div>
  )
}
