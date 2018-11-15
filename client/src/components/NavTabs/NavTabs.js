import React from "react";
import { Navbar, NavItem, Modal, Button} from "react-materialize";
import SignUp from "../SignUp/SignUp.js";
import Login from "../Login/Login.js";
import "./NavTabs.css";

const NavTabs = () => (
<div className={  window.location.pathname !== "/" ? "hideNav" : ""}>
  {window.location.pathname === "/" ? <Navbar brand='CashManage' right>
    <NavItem><Modal
              header='Sign Up'
              trigger={<Button className="homeButton">Sign Up</Button>}>
              <SignUp />
            </Modal>
    </NavItem>
    <NavItem><Modal
              header='Log In'
              trigger={<Button className="homeButton">Log In</Button>}>
              <Login />
            </Modal>
    </NavItem>
  </Navbar> : <div></div>}
</div>
);

export default NavTabs;