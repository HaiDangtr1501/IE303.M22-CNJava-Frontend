import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLaptopMac } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import "./style.css";
import { Navbar, Nav, Image } from "react-bootstrap";
import { useStore } from "../../store";
import Cart from "./cart";
import { BsCart3 } from "react-icons/bs";

const Header = ({ currentUser, isAdmin, logOut }) => {
  const [showSubNav, setShowSubNav] = useState(false);
  const [state, dispatch] = useStore();
  const { countCartItems } = state;
  const show = () => {
    setShowSubNav(!showSubNav);
  };
  const handleLogout = () => {
    logOut();
    setShowSubNav(false);
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="navBar-container"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand>
        <Nav.Link
          as={NavLink}
          activeClassName="active"
          className="font-weight-bold navBar-item navBar-item_title"
          to="/"
        >
          DDNK
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              activeClassName="active"
              to="/home"
              className="navBar-item"
            >
              <AiOutlineHome className="navBar-item_icon" />
              Trang chủ
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              activeClassName="active"
              to="/smartphone"
              className="navBar-item"
            >
              <GiSmartphone className="navBar-item_icon" />
              Điện Thoại
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              activeClassName="active"
              to="/laptop"
              className="navBar-item"
            >
              <MdOutlineLaptopMac className="navBar-item_icon" />
              Laptop
            </Nav.Link>
          </Nav.Item>
          {isAdmin && (
            <>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  activeClassName="active"
                  to="/admin/add-product"
                  className="navBar-item"
                >
                  <MdManageAccounts className="navBar-item_icon" />
                  Quản lý
                </Nav.Link>
              </Nav.Item>

              {/* <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/admin/add-product">
              Thêm Sản Phẩm
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/admin/user-accounts">
              QL Tài Khoản
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/admin/orders">
              QL Đơn Hàng
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/admin/header-image">
              QL Quảng Cáo
            </Nav.Link>
          </Nav.Item> */}
            </>
          )}
        </Nav>
        {currentUser ? (
          <Nav className="ml-auto">
            {!isAdmin ? (
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  activeClassName="active"
                  to="/cart"
                  className="relative navBar-item"
                >
                  {/* Giỏ Hàng 
                <BsCart3 className="navBar-item_icon" />
                {localStorage.getItem("countCartItems")} */}
                  <Cart
                    currentUser={currentUser}
                    countCartItems={countCartItems}
                  />
                </Nav.Link>
              </Nav.Item>
            ) : (
              <></>
            )}
            {/* <Nav.Item>
              <Image
                style={{ width: "2.5rem" }}
                roundedCircle
                src={currentUser.avatarUrl || "/img/avatar_default.png"}
              ></Image>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link
                // as={NavLink}
                // activeClassName="active"
                // to="/profile"
                className="navBar-item"
                onClick={show}
              >
                <img
                  className="navBar-item_avt"
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                />
                {" "}
                <b>{currentUser.name}</b>
              </Nav.Link>
              <div
                className={
                  showSubNav
                    ? "navBar-item_subNav active-subnav"
                    : "navBar-item_subNav"
                }
              >
                <p className="navBar-item_subNav__userName">
                  <b>{currentUser.name}</b>
                </p>
                <Link className="navBar-item_subNav__item" to="/profile">
                  <ImProfile className="icon" />
                  Trang cá nhân
                </Link>
                <Link
                  className="navBar-item_subNav__item"
                  to="/login"
                  onClick={handleLogout}
                >
                  <TbLogout className="icon" />
                  Đăng xuất
                </Link>
              </div>
            </Nav.Item>
            {/* <Nav.Item>
          <Nav.Link
            as={Link}
            to="/login"
            className="navBar-item"
            onClick={() => logOut()}
          >
            Đăng xuất
          </Nav.Link>
        </Nav.Item> */}
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  activeClassName="active"
                  to="/cart"
                  className="relative navBar-item"
                >
                  <Cart
                    countCartItems={countCartItems}
                  />
                </Nav.Link>
              </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login" className="navBar-item">
                Đăng nhập
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
