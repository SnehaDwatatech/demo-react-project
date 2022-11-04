import React from "react";
import App from "./App";
import "./Layout.css";
import Users from "./Users";
import { useState } from "react";
import Datasets from "./Datatsets";
import OrgScreen from "./OrgScreen";
import Roles from "./Roles";

function Layout() {
  const [userComp, setUserComp] = useState(false);
  const [dataSetsComp, setDataSetsComp] = useState(false);
  const [screen, setScreen] = useState(false);
  const [roleOrg, setRoleOrg] = useState(false);

  const handleUser = () => {
    setUserComp(true);
    setDataSetsComp(false);
    setScreen(false);
    setRoleOrg(false);
  };

  const handleDataSets = () => {
    setDataSetsComp(true);
    setUserComp(false);
    setScreen(false);
    setRoleOrg(false);
  };

  const handleScreen = () => {
    setScreen(true);
    setDataSetsComp(false);
    setRoleOrg(false);
    setUserComp(false);
  };

  const handleRole = () => {
    setRoleOrg(true);
    setScreen(false);
    setDataSetsComp(false);
    setUserComp(false);
  };

  return (
    <div>
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <nav
          className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
          id="navbarVertical"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler ms-n2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarCollapse"
              aria-controls="sidebarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-user d-lg-none">
              <div className="dropdown">
                <a
                  href="#"
                  id="sidebarAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></a>
              </div>
            </div>
            <div className="collapse navbar-collapse" id="sidebarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="bi bi-house"></i> Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleDataSets}>
                    <i className="bi bi-bar-chart"></i> DatatSets
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleScreen}>
                    <i className="bi bi-chat"></i> Org Screen
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleRole}>
                    <i className="bi bi-bookmarks"></i> Role
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleUser}>
                    <i className="bi bi-people"></i> Users
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="h-screen flex-grow-1 overflow-y-lg-auto " id="modal">
          {userComp ? <Users /> : ""}
          {dataSetsComp ? <Datasets /> : ""}
          {screen ? <OrgScreen /> : ""}
          {roleOrg ? <Roles /> : ""}
        </div>
      </div>
    </div>
  );
}

export default Layout;
