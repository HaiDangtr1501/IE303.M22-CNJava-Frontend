import { Link } from "react-router-dom";
import "./styleFooter.css";
import Logo from "./JAVA_LAPTOP-removebg-preview.png";
import LogoUIT from "./Logo_UIT_updated-removebg-preview.png";
import { BsInstagram } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-container_signature">
          <div className="logo">
            <img src={Logo} />
          </div>
          <div className="brand">
            <h6>Liên hệ với chúng tôi</h6>
          </div>
          <div className="information">
            <ul>
              <li>
                <Link className="white">
                  <AiFillFacebook className="icon" />
                </Link>
              </li>
              <li>
                <Link className="white">
                  <BsInstagram className="icon" />
                </Link>
              </li>
              <li>
                <Link className="white">
                  <FiMail className="icon" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-container_options">
          <div className="option support">
            <div className="support-title">
              <h5>Hỗ trợ khách hàng</h5>
            </div>
            <div className="support-option">
              <ul>
                <li>
                  <Link className="white" to="">
                    Hướng dẫn
                  </Link>
                </li>
                <li>
                  <Link className="white" to="">
                    Giải đáp thắc mắc
                  </Link>
                </li>
                <li>
                  <Link className="white" to="">
                    Chính sách bảo hành
                  </Link>
                </li>
                <li>
                  <Link className="white" to="">
                    Sửa chữa và bảo trì
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="option link">
            <div className="support-title">
              <h5>Liên kết</h5>
            </div>
            <div className="link-list">
              <ul>
                <li>
                  <Link className="white" to="/home">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link className="white" to="/laptop">
                    Laptop
                  </Link>
                </li>
                <li>
                  <Link className="white" to="/smartphone">
                    Điện thoại
                  </Link>
                </li>
                <li>
                  <Link className="white" to="">
                    Về chúng tôi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="option address">
            <div className="address-title">
              <h5>Địa chỉ</h5>
            </div>
            <div className="address-content">
              <div className="address-content_logo">
                <img src={LogoUIT} />
              </div>
              <ul>
                <li>
                  <Link className="white" to="">
                    <b>Trường đại học công nghệ thông tin</b>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="website-rights">
        <small className="website-rights-content">DDNK @ 2022</small>
      </div>
    </>
  );
}
export default Footer;
