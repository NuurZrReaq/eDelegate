import React, { Component } from 'react';
import { Button } from 'primereact/button';


import './Gallery.css'

const $ = window.$;
const axios = require('axios');

export class Gallery extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            categories: [],

        };
    }
    componentDidMount() {

        var self = this;
        axios.get('http://localhost/eDelegate/GetAllCat.php?Operation=Categories')
            .then(function (response) {
                // handle success
                if (response.data["0"] === "Success") {
                    var count = Object.keys(response.data["1"]).length;
                    var catsArray = [];
                    for (var i = 0; i < count; i++) {
                        catsArray.push(response.data["1"][i][1]);
                    }

                    self.setState({ categories: catsArray });
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed

            });
        if ($.cat === '') {
            axios.get('http://localhost/eDelegate/GetAllItems.php?Operation=GetItems')
                .then(function (response) {
                    // handle success
                    var count = Object.keys(response.data["1"]).length;
                    var itemsArray = [];
                    for (var i = 0; i < count; i++) {
                        itemsArray.push(response.data["1"][i]);
                    }

                    self.setState({ items: itemsArray });

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
            axios.get('http://localhost/eDelegate/GuestItemPerCat.php?Operation=GetItems&catName=' + $.cat)
                .then(function (response) {
                    // handle success
                    if (response.data["0"] === "Success") {
                        var count = Object.keys(response.data["1"]).length;
                        var itemsArray = [];
                        for (var i = 0; i < count; i++) {
                            itemsArray.push(response.data["1"][i]);
                        }

                        self.setState({ items: itemsArray });
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

    }

    onItem = (item) => {
        $.item = item;
        $.history.push("/viewItem")
    }

    onAll = () => {
        var self = this;
        axios.get('http://localhost/eDelegate/GetAllItems.php?Operation=GetItems')
            .then(function (response) {
                // handle success
                var count = Object.keys(response.data["1"]).length;
                var itemsArray = [];
                for (var i = 0; i < count; i++) {
                    itemsArray.push(response.data["1"][i]);
                }

                self.setState({ items: itemsArray });

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed

            });
    }

    onCategory = (cat) => {
        var self = this;

        axios.get('http://localhost/eDelegate/GuestItemPerCat.php?Operation=GetItems&catName=' + cat)
            .then(function (response) {
                // handle success
                if (response.data["0"] === "Success") {
                    var count = Object.keys(response.data["1"]).length;
                    var itemsArray = [];
                    for (var i = 0; i < count; i++) {
                        itemsArray.push(response.data["1"][i]);
                    }

                    self.setState({ items: itemsArray });
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
                <Button label="All" onClick={this.onAll} className="btnAll"></Button>

                <div className="Categories">
                    {
                        this.state.categories.map((cat, index) => {
                            return (
                                <div key={index}>
                                    <Button label={cat} onClick={() => this.onCategory(cat)} className="btnCategory"></Button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="Items">
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <div key={index}>
                                    <button onClick={() => this.onItem(item)} className="btnItem">
                                        <img alt="Card" src={"http://127.0.0.1:8887/" + item[3]} style={{ height: "250px", maxWidth: "250px" }} /><br />
                                        <div>
                                            <label>{item[0]}</label><br />
                                            <label>{item[2]}$</label><br />
                                            <label>{item[1]}</label>
                                        </div>

                                    </button>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}