
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Growl } from 'primereact/growl';


import './Login.css'

const $ = window.$;
const axios = require('axios');

export class Login extends Component {

    constructor() {
        super();
        this.state = {
            txtPassword: "",
            txtUsername: ""
        }

    }

    onLogin = () => {
        var self = this;
        $.name = this.state.txtUsername;
        if (this.state.txtPassword !== "" && this.state.txtUsername !== "") {
            axios.get('http://localhost/eDelegate/Login.php?Operation=Login&UserName=' + this.state.txtUsername + '&Password=' + this.state.txtPassword)
                .then(function (response) {
                    // handle success
                    if (response.data["0"] === "Success") {
                        $.token = response.data["1"];
                        $.mode = response.data["2"] === "1" ? "buyer" : "seller";
                        response.data["2"] === "1" ? $.history.push("/BuyerHome") : $.history.push("/SellerHome");
                    }
                    else {
                        self.growl.show({ severity: 'error', summary: 'Warning Message', detail: 'Please enter a correct username and password' });

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

                <div class="container-indent">
                    <div class="container">
                        <h1 class="tt-title-subpages noborder">ALREADY REGISTERED?</h1>
                        <div class="tt-login-form">
                            <div class="row">
                                <div class="col-xs-12 col-md-6">
                                    <div class="tt-item">
                                        <h2 class="tt-title">NEW USER</h2>
                                        <p>
                                            By creating an account with our store, you will be able to search thorough a large database of local items, contact multiple companies for all sorts of items, view your orders in your account and more.
							</p>
                                        <div class="form-group">
                                            <Link to="/SignUp" class="btn btn-top btn-border">CREATE AN ACCOUNT</Link>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-md-6">
                                    <div class="tt-item">
                                        <h2 class="tt-title">LOGIN</h2>
                                        If you have an account with us, please log in.
							<div class="form-default form-top">
                                            <div class="form-group">
                                                <label htmlFor="loginInputUsername">USERNAME *</label>
                                                <div class="tt-required">* Required Fields</div>
                                                <input type="text" name="name" class="form-control" id="loginInputUsername" placeholder="Enter Username" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} autoFocus />
                                            </div>
                                            <div class="form-group">
                                                <label htmlFor="loginInputPass">PASSWORD *</label>
                                                <input type="password" name="passowrd" class="form-control" id="loginInputPass" placeholder="Enter Password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                                            </div>
                                            <div class="row">
                                                <div class="col-auto mr-auto">
                                                    <div class="form-group">
                                                        <button class="btn btn-border" onClick={this.onLogin}>LOGIN</button>
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