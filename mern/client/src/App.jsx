import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Test from "./Test";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Test/>
    </div>
  );
};
export default App
