import {Routes, Route} from "react-router-dom";
import App from "./App";

export default function routers() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  )
}