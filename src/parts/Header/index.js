import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = ({ currentUser, isAdmin, logOut }) => {
  return (
    <Navbar 
      collapseOnSelect 
      expand="lg" 
      bg="dark" 
      variant="dark" 
      style={{width:"100%", position:"sticky", top: "0", zIndex: "1000"}}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand>
        <Nav.Link
          as={NavLink}
          activeClassName="active"
          className="text-light font-weight-bold"
          to="/"
        >
          DDNK
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/home">
              Trang chủ
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/smartphone">
              Điện Thoại
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/laptop">
              Laptop
            </Nav.Link>
          </Nav.Item>
          {isAdmin && (
            <>
              <Nav.Item>
                <Nav.Link as={NavLink} activeClassName="active" to="/admin/add-product">
                  Quản lý
                </Nav.Link>
              </Nav.Item>
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
                className="relative"
              >
                Giỏ Hàng
                <AiOutlineShoppingCart size="30px" />
              </Nav.Link>
              </Nav.Item>
            ) : (
              <>
              </>
            )}
            <Nav.Item>
              <Image
                style={{ width: "2.5rem" }}
                roundedCircle
                src={currentUser.avatarUrl || "/img/avatar_default.png"}
              ></Image>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} activeClassName="active" to="/profile">
                {currentUser.name}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login" onClick={() => logOut()}>
                Đăng xuất
              </Nav.Link>
            </Nav.Item>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/login">
                Đăng nhập
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/signup">
                Đăng ký
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
