import { NavLink, Link } from "react-router-dom";
import "./sideBarItem.css";
import { FaUsers } from "react-icons/fa";
import { AiOutlineDollar } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { FaRegCalendarPlus } from "react-icons/fa";
function SideBarItem(props) {
  return (
    <div className="sideBarItem-container">
      <Link className="sideBarItem-link" activeClassName="active" to={props.path}>
        <div className="sideBarItem-link_content">
          <p className="sideBarItem-link_title">
            {props.icon}
            {props.title}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SideBarItem;
