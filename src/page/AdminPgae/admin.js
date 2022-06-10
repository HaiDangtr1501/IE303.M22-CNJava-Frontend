import SideBar from "../../components/SideBar/sideBar";
import "./adminPage.css";
function Admin(props) {
    return (
        <div className="admin-container">
            <div className="admin-container_sidebar">
                <SideBar/>
            </div>
            <div className="admin-container_page">
                {props.mainPage}
            </div>            
        </div>
    );
}
export default Admin;