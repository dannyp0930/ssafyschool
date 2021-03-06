import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('admin');
    navigate("/");
    navigate(0);
  }, [navigate])
  return null;
}