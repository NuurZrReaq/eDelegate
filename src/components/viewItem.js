import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import './viewItem.css'

const $ = window.$;
const axios = require('axios');

export class viewItem extends Component {
    constructor() {
        super();
        this.state = {
            itemName: "",
            itemDesc: "",
            itemPrice: "",
            itemImage: "",
            itemCat: "",

            sellerUN: "",
            sellerPass: "",
            sellerName: "",
            sellerMobile: "",
            sellerPhone: "",
            sellerEmail: "",
            sellerCorpName: "",

            specs: [],
            navBar: "details"


        };
    }

    componentDidMount() {
        var self = this;
        if ($.item !== '') {
            axios.get('http://localhost/eDelegate/GuestItem.php?Operation=getItem&ItemName=' + $.item)
                .then(function (response) {
                    // handle success
                    if (response.data["0"] === "Success") {
                        var count = Object.keys(response.data["3"]).length;
                        var specsArray = [];
                        for (var i = 0; i < count; i++) {
                            specsArray.push(response.data["3"][i]);
                        }
                        self.setState({
                            itemName: response.data["1"].Name,
                            itemDesc: response.data["1"].Description,
                            itemPrice: response.data["1"].Price,
                            itemImage: response.data["1"].srcFile,
                            itemCat: response.data["1"].catName,

                            sellerUN: response.data["2"][1],
                            sellerPass: response.data["2"][2],
                            sellerName: response.data["2"][4],
                            sellerMobile: response.data["2"][5],
                            sellerPhone: response.data["2"][6],
                            sellerEmail: response.data["2"][7],
                            sellerCorpName: response.data["2"][9],

                            specs: specsArray,

                        })
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
            $.mode = "guest";
            $.cat = '';
            $.name = '';
            $.item = '';
            $.history.push("/");
        }

    }

    onEdit = () => {
        $.item = this.state.itemName;
        $.history.push("/Item");
    }

    onDelete = () => {
        var self=this;
        axios.get('http://localhost/eDelegate/InsertItems.php?Operation=InsertItem&token=' + $.token + '&ItemName=' + this.state.itemName)
            .then(function (response) {
                // handle success
                if (response.data["0"] === "Success") {
                    $.history.push("/SellerHome")
                }
                else {
                    self.growl.show({ severity: 'error', summary: 'Warning Message', detail: 'Item could not be deleted' });

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
            <div className="p-grid p-fluid dashboard">
                <div className="divButtons">
                    <div className="divBtnEdit">
                        <Button hidden={$.mode !== "seller"} label="Edit Item" onClick={this.onEdit} className="btnEdit"></Button>
                    </div>
                    <div className="divBtnDelete">
                        <Button hidden={$.mode !== "seller"} label="Delete Item" onClick={this.onDelete} className="btnDelete"></Button>
                    </div>
                </div>
                <div className="divItemImg">
                    <img src={"http://127.0.0.1:8887/" + this.state.itemImage} className="itemImg"></img>
                </div>
                <div className="divItemBrief">
                    <div className="divNavBar">
                        <ul className="u">
                            <li className="l" onClick={() => { this.setState({ navBar: "details" }) }}><label className="anch" >Details</label></li><div className="separator"></div>
                            <li className="l" onClick={() => { this.setState({ navBar: "contact" }) }}><label className="anch" >Contact Info</label></li><div className="separator"></div>
                            <li className="l" onClick={() => { this.setState({ navBar: "specs" }) }}><label className="anch" >Specifications</label></li><div className="separator"></div>
                            <li className="l" onClick={() => { this.setState({ navBar: "order" }) }}><label className="anch" >Place Order</label></li>

                        </ul>
                    </div>
                    <div className="divDetails" hidden={this.state.navBar !== "details"}>
                        Name:<h2>{this.state.itemName}</h2>
                        Category:<h4>{this.state.itemCat}</h4>
                        Price:<h6>{this.state.itemPrice}$</h6>
                        Description:<h6>{this.state.itemDesc}</h6>

                    </div>
                    <div className="divContact" hidden={this.state.navBar !== "contact"}>
                        Seller Name:<h2>{this.state.sellerName}</h2>
                        Seller Corporation Name:<h4>{this.state.sellerCorpName}</h4>
                        Email:<h6>{this.state.sellerEmail}</h6>
                        Mobile:<h6>{this.state.sellerMobile}</h6>
                        Phone:<h6>{this.state.sellerPhone}</h6>
                    </div>
                    <div className="divSpecs" hidden={this.state.navBar !== "specs"}>
                        {this.state.specs.map((spec, index) => {
                            return (
                                <div>
                                    {spec[0]}:<h6>{spec[1]}</h6>
                                </div>
                            )
                        })}
                    </div>
                    <div className="divOrder" hidden={this.state.navBar !== "order"}>

                    </div>
                </div>
            </div>

        );
    }
}