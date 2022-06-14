import SideBarItem from "./sideBarItem";
import "./sideBar.css";
import { FaHouseUser } from "react-icons/fa";
import { AiOutlineLaptop } from "react-icons/ai";
import { GiSmartphone } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { AiOutlineDollar } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { FaRegCalendarPlus } from "react-icons/fa";

function SideBar() {
  return (
    <div className="sideBar-container">
      <div className="sideBar-signature">
        <p className="sideBar-signature_content">
          <FaHouseUser className="sideBar-signature_content__icon" />
          Admin
        </p>
      </div>
      <SideBarItem
        title="Quản lý laptop"
        path="/admin/listProduct/laptop"
        icon={<AiOutlineLaptop className="icon" />}
        subNav={true}
      />
      <SideBarItem
        title="Quản lý smartphone"
        path="/admin/listProduct/smartphone"
        icon={<GiSmartphone className="icon" />}
        subNav={true}
      />
      <SideBarItem
        title="Thêm sản phẩm"
        path="/admin/add-product"
        icon={<FaRegCalendarPlus className="icon" />}
      />
      <SideBarItem
        title="Quản lý người dùng"
        path="/admin/user-accounts"
        icon={<FaUsers className="icon" />}
      />
      <SideBarItem
        title="Quản lý đơn hàng"
        path="/admin/orders"
        icon={<AiOutlineDollar className="icon" />}
      />
      <SideBarItem
        title="Quản lý hình ảnh"
        path="/admin/header-image"
        icon={<BsFillImageFill className="icon" />}
      />
    </div>
  );
}

export default SideBar;
