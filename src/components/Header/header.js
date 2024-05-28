import React from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { FaTwitter } from "react-icons/fa";
// import Currency from '../Currency/currency';
import ListSelector from "../ListSelector/listselector";
import "./header.css";

const mapStateToProps = (state) => {
  const userToken = state.app.userToken;

  return {
    userToken,
  };
};

class Header extends React.PureComponent {
  redirect(path, e) {
    e.preventDefault();
    e.stopPropagation();
    window.gtag("event", "navbar_click", { path: path });
    window.tracker.appHistory.push(path);
  }
  logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("listId");
    localStorage.removeItem("rates");
    window.location.reload();
  }
  render() {
    const { userToken } = this.props;
    return (
      <Navbar expand="lg" className="unreal-tracker__header">
        <Navbar.Brand href="/" onClick={this.redirect.bind(this, "/")}>
          WishList
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="/tracker/"
              onClick={this.redirect.bind(this, "/tracker/")}
            >
              Tracker of your wishes
            </Nav.Link>
            {!userToken && (
              <>
                <Nav.Link
                  href="/tracker/login"
                  onClick={this.redirect.bind(this, "/tracker/login")}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  href="/tracker/register"
                  onClick={this.redirect.bind(this, "/tracker/register")}
                >
                  Register
                </Nav.Link>
              </>
            )}
            {userToken && (
              <Nav.Link href="" onClick={this.logout.bind(this)}>
                Logout
              </Nav.Link>
            )}
          </Nav>
          {userToken &&
            window.tracker.appHistory.location.pathname === "/tracker/" && (
              <>
                <ListSelector />
                 {/*<Currency /> */}
              </>
            )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header = connect(mapStateToProps, null)(Header);
