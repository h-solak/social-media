import React, { useState } from "react";
import "./navbar.css";
import {
  Row,
  Col,
  Input,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaRegUserCircle, FaSearch, FaUserFriends } from "react-icons/fa";
import { MdNotifications, MdChat, MdOutlineSettings } from "react-icons/md";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOut, IoSettingsSharp, IoPerson } from "react-icons/io5";
import { logout, resetUser } from "../../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Col xs="12" sm="12" className="navbar-container px-4">
      <Row className="m-0 h-100">
        {/* <Col sm="12">
        <div className="flex-between h-100 color-white">
          <span className="flex-center gap-1 align-items-end">
            <GiCat className="fs-4" />
            <span className="fw-bold">SociableCat</span>
          </span>
          <Input className="d-none d-sm-block" style={{ maxWidth: "25%" }} />
          <FaRegUserCircle className="fs-2" />
        </div>
      </Col> */}
        <Col
          xs="6"
          sm="4"
          md="3"
          className="p-0 logo flex-align-center justify-content-start pointer"
          onClick={() => navigate("/")}
          style={{ padding: "0px 24px" }}
        >
          <span className="flex-center gap-1 align-items-end">
            <img
              src={
                process.env.REACT_APP_PUBLIC_FOLDER + "/svg/just-cat-white.svg"
              }
              alt="Logo"
              width="30"
            />
            <span className="d-none d-sm-block logo-part fw-bold color-white">
              SociableCat
            </span>
          </span>
        </Col>
        <Col
          xs="0"
          sm="0"
          md="6"
          className="d-none d-md-flex align-items-center justify-content-center"
        >
          <div
            className="bg-color-white w-75 flex-center px-3 rounded-pill"
            style={{ height: "60%" }}
          >
            <FaSearch
              className={`${isFocused ? "color-dark" : "text-secondary"}`}
            />
            <input
              className="w-100 h-100 bg-transparent border-0 px-2"
              placeholder={
                !isFocused
                  ? "Search cats, cat posts, or cat videos..."
                  : "What spesific cat are you looking for?"
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </Col>
        <Col
          xs="6"
          sm="8"
          md="3"
          className="p-0 d-flex align-items-center justify-content-end gap-3"
        >
          {/* <FaUserFriends className="d-none d-md-block fs-3 color-white nav-icon" /> */}
          <MdNotifications className="fs-3 color-white nav-icon" />
          <MdChat
            className="fs-4 color-white nav-icon"
            onClick={() => navigate("/messenger")}
          />
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            onMouseOver={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="border-0"
          >
            <DropdownToggle className="p-0 border-0 bg-transparent">
              <div className="flex-center gap-1 pointer rounded">
                <span className="d-none d-sm-flex fs-7 fw-600">
                  {"@" + user?.username || "User"}
                </span>
                <div className="rounded-circle flex-center">
                  <img
                    src={`${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${user?.crrAvatar}.svg`}
                    alt="user profile"
                    width={34}
                    height={34}
                    className="pointer"
                  />
                </div>
              </div>
            </DropdownToggle>
            <DropdownMenu className="">
              <DropdownItem
                className="d-flex align-items-center gap-2"
                onClick={() => navigate("/profile/" + user?.username)}
              >
                <IoPerson className="" style={{ fontSize: "18px" }} />
                <span className="">Profile</span>
              </DropdownItem>
              <DropdownItem className="d-flex align-items-center gap-2">
                <IoSettingsSharp className="" style={{ fontSize: "18px" }} />
                <span className="">Settings</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                className="d-flex align-items-center gap-2"
                onClick={() => {
                  dispatch(resetUser());
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                <IoLogOut className="" style={{ fontSize: "18px" }} />
                <span className="">Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </Col>
  );
};

export default Navbar;
