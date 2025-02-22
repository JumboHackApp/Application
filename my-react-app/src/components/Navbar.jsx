import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/profile" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/bookmarking" activeStyle>
                        Bookmarking
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;