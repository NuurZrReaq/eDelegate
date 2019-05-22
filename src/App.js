import React, { Component } from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'font-awesome/css/font-awesome.css';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { SellerHome } from './components/SellerHome';
import { BuyerHome } from './components/BuyerHome';
import { GuestHome } from './components/GuestHome';
import { Gallery } from './components/Gallery';
import { AdvancedSearch } from './components/AdvancedSearch';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Profile } from './components/Profile';
import { Item } from './components/Item';
import { viewItem } from './components/viewItem';
import { HashLink } from 'react-router-hash-link';

import './App.css';

const $ = window.$;
const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      layoutColorMode: 'dark',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      items: []
    };
    $.history = props.history
  }

  LogOut = () => {
    $.token = '';
    $.name = '';
    $.mode = 'guest';
    $.history.push("/")
  }

  render() {
    return (
      <div>
        <header style={{ position: 'fixed', zIndex: '2', backgroundColor: '#FFF', width: '100%', top: '0px' }}>

          <div className="tt-desktop-header">
            <div className="container">
              <div className="tt-header-holder">
                <div className="tt-col-obj tt-obj-logo">
                  <a className="tt-logo tt-logo-alignment" href="index.html"><img src="images/custom/logo.png" alt="" /></a>
                </div>
                <div className="tt-col-obj tt-obj-menu">
                  <div className="tt-desctop-parent-menu tt-parent-box">
                    <div className="tt-desctop-menu">
                      <nav>
                        <ul>
                          <li className="dropdown megamenu">
                            <Link to={$.mode === "buyer" ? "/BuyerHome" : ($.mode === "seller" ? "/SellerHome" : "/")}>Home</Link>
                          </li>
                          <li className="dropdown megamenu" hidden={$.mode === "seller"}>
                            <Link onClick={() => { $.cat = '' }} to="/Gallery">Gallery</Link>
                          </li>
                          <li className="dropdown megamenu" hidden={$.mode === "guest"}>
                            <div className="dropdown">
                              <button className="dropbtn">Mode</button>
                              <div className="dropdown-content">
                                <Link to="/BuyerHome" onClick={() => { $.mode = "buyer" }}>Buyer</Link>
                                <Link to="/SellerHome" onClick={() => { $.mode = "seller" }}>Seller</Link>
                              </div>
                            </div>{/*
                                                        <OverlayPanel ref={(el) => this.opMode = el}>
                                                            <ul>
                                                                <li>
                                                                </li>
                                                                <li>
                                                                </li>
                                                            </ul>
        </OverlayPanel>*/}
                          </li>
                          <li className="dropdown megamenu">
                            <Link to="/AdvancedSearch">Browse</Link>
                          </li>
                          <li className="dropdown megamenu">
                            <HashLink to="#ContactUs">Contact Us</HashLink>
                          </li>
                          <li className="dropdown megamenu">
                            <HashLink to="#AboutUs">About Us</HashLink>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="tt-col-obj tt-obj-options obj-move-right">
                  <div className="tt-desctop-parent-account tt-parent-box">
                    <div className="tt-account tt-dropdown-obj">
                      <Link to="/Login" hidden={$.mode !== "guest"} style={{ marginRight: '15px' }}>Login</Link>
                      <Link to="/Profile" hidden={$.mode === "guest"} style={{ marginRight: '15px' }} icon="fas fa-user">{$.name}</Link>
                      <Link to="#" style={{ marginRight: '15px' }} hidden={$.mode === "guest"} onClick={this.LogOut}>Log Out</Link>
                      <Link to="/SignUp" style={{ marginRight: '15px' }}>Sign Up</Link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tt-stuck-nav">
            <div className="container">
              <div className="tt-header-row ">
                <div className="tt-stuck-parent-menu"></div>
                <div className="tt-stuck-parent-search tt-parent-box"></div>
                <div className="tt-stuck-parent-cart tt-parent-box"></div>
                <div className="tt-stuck-parent-account tt-parent-box"></div>
                <div className="tt-stuck-parent-multi tt-parent-box"></div>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          <Route path="/" exact component={GuestHome} />
          <Route path="/SellerHome" component={SellerHome} />
          <Route path="/BuyerHome" component={BuyerHome} />
          <Route path="/Login" component={Login} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Gallery" component={Gallery} />
          <Route path="/AdvancedSearch" component={AdvancedSearch} />
          <Route path="/Item" component={Item} />
          <Route path="/viewItem" component={viewItem} />


        </div>
        {/*<AppTopbar onToggleMenu={this.onToggleMenu} />
                                    
                                        > this.sidebar = el} classNameName={sidebarclassNameName} onClick={this.onSidebarClick}>
                                    
                                    anel ref={(el) => this.layoutMenuScroller = el} style={{ height: '100%' }}>
                                     classNameName="layout-sidebar-scroll-content" >
                                    <div classNameName="layout-logo">
                                <label style={{ color: this.state.layoutColorMode === "dark" ? "#FFF" : "#000" }}>e_Delegate</label>
                            </div>
                            <AppInlineProfile />
                                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
    </div>
                    </ScrollPanel>
                        </div>

                <div classNameName="layout-main">
                                
            
                </div>
                    
            
            <div </div>classNameName="layout-mask"></div>*/}
        <div id="AboutUs">
          <div className="tt-footer-custom">
            <div className="container">
              <div className="tt-row">
                <div className="tt-col-left">
                  <div className="tt-col-item tt-logo-col">
                    <a className="tt-logo tt-logo-alignment" href="index.html">
                      <img src="images/custom/logo.png" alt="" />
                    </a>
                  </div>
                  <div className="tt-col-item">
                    <div className="tt-box-copyright">
                      e_Delegate is a website used to...
						</div>
                  </div>
                </div>
                <div className="tt-col-right">
                  <div className="tt-col-item">
                    <ul className="tt-payment-list">

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <footer id="ContactUs">
          <div className="tt-footer-custom">
            <div className="container">
              <div className="tt-row">
                <div className="tt-col-left">
                  <div className="tt-col-item tt-logo-col">
                    <a className="tt-logo tt-logo-alignment" href="index.html">
                      <img src="images/custom/logo.png" alt="" />
                    </a>
                  </div>
                  <div className="tt-col-item">
                    <div className="tt-box-copyright">
                      e-Delegate@Mail.com
						</div>
                  </div>
                </div>
                <div className="tt-col-right">
                  <div className="tt-col-item">
                    <ul className="tt-payment-list">

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
