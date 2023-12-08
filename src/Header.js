import { useContext } from "react";
import DataContext from "./context/DataContext";

const Header = () => {
  const { status, setStatus } = useContext(DataContext);
  const currentDate = new Date();
  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const date = currentDate.toLocaleDateString("en-UK", dateOptions);
  return (
    <header>
      <h1>TimeTally</h1>
      <div id="headerRight">{date}</div>
      {/* <div className={`status ${status !== "" ? "show" : ""}`}>{status}</div> */}
    </header>
  );
};

export default Header;
