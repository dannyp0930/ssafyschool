import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiInstance, userInstance } from "../../api";
import { AiFillCheckCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import './css/EditProfile.css';
import CheckEmailForm from "../../Utils/CheckEmailForm";

export default function EditProfile() {
  const { state } = useLocation();
  const [ user, setUser ] = useState({
    nickname: "",
    email: "",
  });
  const [ checkNickname, setCheckNickname ] = useState(false);
  const [ checkEmail, setCheckEmail ] = useState(false);
  const userAPI = userInstance();
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
    setUser({
      nickname: state.user.nickname,
      email: state.user.email,
    })
  }, [state])

  function handleChange({target: {id, value}}) {
    const newUser = {
      ...user,
      [id]: value,
    };
    setUser(newUser);
  };

  // 닉네임 중복 체크
  async function duplicateNickname() {
    if (!user.nickname) {
      Toast.fire({
        icon: "question",
        title: "닉네임을 입력하세요."
      });
      return
    };
    try {
      await userAPI.post('users/check/nickname', { nickname: user.nickname});
      setCheckNickname(true);
      Toast.fire({
        icon: "success",
        title: "사용 가능한 닉네임 입니다."
      });
    } catch (error) {
      if (error.response.status === 409) {
        Toast.fire({
          icon: "error",
          title: "이미 존재하는 닉네임 입니다."
        });
      }
    };
  };

  // 이메일 중복 체크
  async function duplicateEmail() {
    if (!user.email) {
      Toast.fire({
        icon: "question",
        title: "이메일을 입력하세요."
      });
      return
    };

    if (!CheckEmailForm(user.email)) {
      Toast.fire({
        icon: "error",
        title: "올바른 이메일 형식을 입력하세요."
      });
      return
    };

    try {
      await userAPI.post('users/check/email', { email: user.email});
      setCheckEmail(true);
      Toast.fire({
        icon: "success",
        title: "사용 가능한 이메일 입니다."
      });
    } catch (error) {
      if (error.response.status === 409) {
        Toast.fire({
          icon: "error",
          title: "이미 존재하는 이메일 입니다."
        });
      }
    };
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit-row">
        <div>닉네임</div>
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
            onClick={duplicateNickname}
          >
            중복확인
          </div>
        )}
      </div>
      <div className="profile-edit-row">
        <div>이메일</div>
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
            onClick={duplicateEmail}
          >
            중복확인
          </div>
        )}
      </div>
      <div className="profile-edit-row">
        <Link
          to="password"
          state={{
            user: state.user
          }}
        >
          비밀번호 수정
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
        >
          수정
        </div>
      </div>
    </div>
  )
}
