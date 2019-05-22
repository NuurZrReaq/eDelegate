
import React, { Component } from 'react';
import { RadioButton } from 'primereact/radiobutton';

import './Profile.css'

const $ = window.$;
const axios = require('axios');

export class Profile extends Component {

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
        }

    }

    componentDidMount = () => {
        var self=this;
        if($.token !== ''){
            axios.get('http://localhost/eDelegate/Pofile.php?Operation=GetProfile&token='+$.token+'&UserName='+$.name)
            .then(function (response) {
                // handle success
                var Prof = {};
                if (response.data["0"] === "Success") {
                    self.setState({txtUsername:response.data["1"][0][1],
                    txtPassword:response.data["1"][0][2],
                    txtname:response.data["1"][0][4],
                    txtPhone:response.data["1"][0][5],
                    txtMobile:response.data["1"][0][6],
                    txtEmail:response.data["1"][0][7],
                    rbMode:response.data["1"][0][8] === "1" ? "buyer" : "seller",
                    txtCorpName:response.data["1"][0][9]});
                    console.log(Prof);
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
        else{
            $.mode="guest";
            $.cat='';
            $.name='';
            $.history.push("/");
        }
    }

    onSave = () => {
        var self = this; 
        const newUser = "&UserName=" + this.state.txtUsername + "&Password=" + this.state.txtPassword + "&Name=" + this.state.txtname + "&Mobile=" + this.state.txtMobile + "&Phone=" + this.state.txtPhone + "&Email=" + this.state.txtEmail + "&MainProfile=" + (this.state.rbMode === "buyer" ? "1" : "2") + "&CorpName=" + this.state.txtCorpName
        $.mode = this.state.rbMode;
        $.name = this.state.txtUsername;
        axios.get('http://localhost/eDelegate/Pofile.php?Operation=EditProfile&token='+$.token+'&UserName='+$.name+newUser)
            .then(function (response) {
                // handle success
                if (response.data["0"] === "Success") {
                    self.state.rbMode === "buyer" ? $.history.push("/BuyerHome") : $.history.push("/SellerHome");

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

    render() {
        return (

            <div id="tt-pageContent">
                <div class="container-indent">
                    <div class="container">
                        <h1 class="tt-title-subpages noborder">UPDATE YOUR ACCOUNT?</h1>
                        <div class="tt-login-form">
                            <div class="row">

                                <div class="col-xs-12 col-md-6">
                                    <div class="tt-item">
                                        <h2 class="tt-title">Account Info</h2>
                                        If you have any updates to your account info, please enter them here and click save to update.
							<div class="form-default form-top">
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



                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="col-xs-12 col-md-6">
                                    <div class="tt-item">

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
                                                <label htmlFor="rbBuyer"className="p-radiobutton-label">Buyer</label>
                                            </div>
                                            <div style={{ float: 'left', marginLeft: '15px' }}>
                                                <RadioButton inputId="rbSeller" name="Mode" value="seller" onChange={(e) => this.setState({ rbMode: e.value })} checked={this.state.rbMode === 'seller'} />
                                                <label htmlFor="rbSeller"className="p-radiobutton-label">Seller</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-auto mr-auto">
                                                <div className="form-group">
                                                    <button class="btn btn-border" onClick={this.onSave}>Save</button>
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