import { NavLink, Link } from "react-router-dom";
import "./sideBarItem.css";
import { useState } from "react";
function SideBarItem(props) {
  const [showSub,setShowSubNav]  = useState(false);
  const handleShow =() => {
    setShowSubNav(!showSub);
  }
  return (
    <div className="sideBarItem-container">
      <Link
        className="sideBarItem-link"
        activeClassName="active"
        to={props.path}
        onClick={handleShow}
      >
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
