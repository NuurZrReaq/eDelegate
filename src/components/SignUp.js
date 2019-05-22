import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { RadioButton } from 'primereact/radiobutton';
import { Growl } from 'primereact/growl';



import './SignUp.css'

const $ = window.$;
const axios = require('axios');

export class SignUp extends Component {

    constructor() {
        super();
        this.state = {

            rbMode: 'buyer',

            txtCorpName: "",
            txtEmail: "",
            txtMobile: "",
            txtPassword: "",
            txtUsername: "",
            txtname: ""

        };
    }
    onSignup = () => {
        var self = this;
        if (this.state.txtUsername !== "" && this.state.txtEmail !== "" && this.state.txtMobile !== "" && this.state.txtPassword !== "" && this.state.txtPhone !== "" && this.state.txtname !== "") {
            const newUser = "&UserName=" + this.state.txtUsername + "&Password=" + this.state.txtPassword + "&Name=" + this.state.txtname + "&Mobile=" + this.state.txtMobile + "&Phone=" + this.state.txtPhone + "&Email=" + this.state.txtEmail + "&MainProfile=" + (this.state.rbMode === "buyer" ? "1" : "2") + "&CorpName=" + this.state.txtCorpName
            $.mode = this.state.rbMode;
            $.name = this.state.txtUsername;
            axios.get('http://localhost/eDelegate/Login.php?Operation=SignUp' + newUser)
                .then(function (response) {
                    // handle success
                    if (response.data["0"] === "Success") {
                        $.token = response.data["1"];
                        self.state.rbMode === "buyer" ? $.history.push("/BuyerHome") : $.history.push("/SellerHome");
                    }
                    else {
                        self.growl.show({ severity: 'error', summary: 'Warning Message', detail: 'Failed to sign up' });

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed

                });
        }
        else {
            this.growl.show({ severity: 'warn', summary: 'Warning Message', detail: 'Please fill all the required fields' });

        }
    }

    render() {
        return (
            <div id="tt-pageContent">
                <Growl ref={(el) => this.growl = el} />

                <div className="container-indent">
                    <div className="container">
                        <h1 className="tt-title-subpages noborder">NEW USER?</h1>
                        <div className="tt-login-form">
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <div className="tt-item">
                                        <h2 className="tt-title">ALREADY REGISTERED</h2>
                                        If you have an account with us, please log in.
                                        <div className="form-group">
                                            <Link to="/Login" className="btn btn-top btn-border">LOG IN</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <div className="tt-item">
                                        <h2 className="tt-title">Sign Up</h2>
                                        <p>
                                            By creating an account with our store, you will be able to search thorough a large database of local items, contact multiple companies for all sorts of items, view your orders in your account and more.
							</p>
                                        <div className="form-default form-top">
                                            <div className="form-group">
                                                <label htmlFor="loginInputName">NAME *</label>
                                                <div className="tt-required">* Required Fields</div>
                                                <input type="text" name="name" className="form-control" id="loginInputName" placeholder="Enter Name" value={this.state.txtname} onChange={(e) => this.setState({ txtname: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="loginInputUsername">USERNAME *</label>
                                                <input type="text" name="name" className="form-control" id="loginInputUsername" placeholder="Enter Username" value={this.state.txtUsername} onChange={(e) => this.setState({ txtUsername: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="loginInputPass">PASSWORD *</label>
                                                <input type="password" name="passowrd" className="form-control" id="loginInputPass" placeholder="Enter Password" value={this.state.txtPassword} onChange={(e) => this.setState({ txtPassword: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="loginInputEmail">EMAIL *</label>
                                                <input type="text" name="passowrd" className="form-control" id="loginInputEmail" placeholder="Enter Email" value={this.state.txtEmail} onChange={(e) => this.setState({ txtEmail: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="loginInputMobile">MOBILE *</label>
                                                <input type="text" name="passowrd" className="form-control" id="loginInputMobile" placeholder="Enter Mobile" value={this.state.txtMobile} onChange={(e) => this.setState({ txtMobile: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="loginInputPhone">PHONE *</label>
                                                <input type="text" name="passowrd" className="form-control" id="loginInputPhone" placeholder="Enter Phone" value={this.state.txtPhone} onChange={(e) => this.setState({ txtPhone: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="loginInputCorpName">Corporation Name</label>
                                                <input type="text" name="passowrd" className="form-control" id="loginInputCorpName" placeholder="Enter Corporation Name" value={this.state.txtCorpName} onChange={(e) => this.setState({ txtCorpName: e.target.value })} />
                                            </div>
                                            <div className="form-group" style={{ marginBottom: '70px' }}>
                                                <label htmlFor="loginInputEmail" style={{ width: '100%' }}>Main Profile *</label>

                                                <div style={{ float: 'left' }}>
                                                    <RadioButton inputId="rbBuyer" name="Mode" value="buyer" onChange={(e) => this.setState({ rbMode: e.value })} checked={this.state.rbMode === 'buyer'} />
                                                    <label htmlFor="rbBuyer" className="p-radiobutton-label">Buyer</label>
                                                </div>
                                                <div style={{ float: 'left', marginLeft: '15px' }}>
                                                    <RadioButton inputId="rbSeller" name="Mode" value="seller" onChange={(e) => this.setState({ rbMode: e.value })} checked={this.state.rbMode === 'seller'} />
                                                    <label htmlFor="rbSeller" className="p-radiobutton-label">Seller</label>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-auto mr-auto">
                                                    <div className="form-group">
                                                        <button class="btn btn-border" onClick={this.onSignup}>Sign Up</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}