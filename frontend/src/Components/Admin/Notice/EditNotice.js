import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteNotice, UpdateNotice } from "../../../api/NoticeAPI";
import useGetObject from "../../../Hooks/useGetObject";
import DateFormat from "../../../Utils/DateFormat";
import "./css/EditNotice.css";

export default function EditNotice() {
  const { noticeId } = useParams();
  const [ notice, setNotice ] = useState({
    id: "",
    userId: "",
    title: "",
    content: "",
    createdDate: "",
    updatedDate: "",
  }); 
  const navigate = useNavigate();

  // 공시사항 호출
  const noticeInfo = useGetObject(`/notice/${noticeId}`)

  useEffect(() => {
    setNotice(noticeInfo)
  }, [noticeInfo]);

  // 내용 변경
  function handleChange({target: {id, value}}) {
    const newNotice = {
      ...notice,
      [id]: value,
    };
    setNotice(newNotice);
  };

  // 공지사항 수정
  function handleSubmit(e) {
    e.preventDefault();
    UpdateNotice(noticeId, notice.title, notice.content);
    navigate('/admin/notice');
    setTimeout(() => {
      navigate(0);
    }, 100);
  };

  // 공지사항 삭제
  function handleClick(e) {
    e.preventDefault();
    DeleteNotice(noticeId);
    navigate('/admin/notice');
    setTimeout(() => {
      navigate(0);
    }, 100);
  };

  return (
    <div className="admin-notice-container">
      <input
        className="admin-notice-title"
        id="title"
        value={notice.title || ""}
        onChange={handleChange}
      />
      <div className="admin-notice-date">
        <div className="admin-notice-created">{DateFormat(notice.createdDate || "")}</div>
        <div className="admin-notice-updated">{DateFormat(notice.updatedDate || "")}</div>
      </div>
      <textarea
        className="admin-notice-content"
        id="content"
        value={notice.content || ""}
        onChange={handleChange}
        rows={20}
      />
      <div className="admin-notice-update">
        <div
          className="admin-notice-update-button"
          onClick={handleSubmit}
        >
          수정
        </div>
        <div 
          className="admin-notice-delete-button"
          onClick={handleClick}
        >
          삭제
        </div>
      </div>
    </div>
  )
};
