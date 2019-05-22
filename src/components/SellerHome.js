import React, { Component } from 'react';
import { Button } from 'primereact/button';


import './Home.css'

const $ = window.$;
const axios = require('axios');

export class SellerHome extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            items: [],
            width: 1170
        };
    }

    componentDidMount() {
        var self = this;
        if ($.token !== '') {
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
            axios.get('http://localhost/eDelegate/ItemPerUser.php?Operation=getItems&UserName=' + $.name + '&token=' + $.token)
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
        else {
            $.mode = "guest";
            $.cat = '';
            $.name = '';
            $.item = '';
            $.history.push("/");
        }

    }

    onAdd = () => {
        $.item='';
        $.history.push("/Item");
    }


    onCategory = (cat) => {
        $.cat = cat;
        $.history.push("/Gallery")
    }

    onItem = (item) =>{
        $.item=item;
        $.history.push("/viewItem")
    }
    render() {
        const images = [
            { url: require('./image1.jpg') },
            { url: require('./image2.jpg') },
            { url: require('./image3.jpg') }
        ];


        return (
            <div className="p-grid p-fluid dashboard">

                <Button label="Add Item" onClick={this.onAdd} className="btnAdd"></Button>


                <div className="outer" hidden={$.mode !== "seller"}>
                    {
                        this.state.categories.map((cat, catIndex) => {
                            return (
                                <div key={catIndex}>
                                    <button className="btnHomeCategory">
                                        <div class="col-sm-12">
                                            <h2 class="lined-heading"><span className="cat">{cat}</span></h2>
                                        </div>
                                    </button>
                                    <div>
                                        {
                                            this.state.items.map((item, index) => {
                                                return (
                                                    <div key={index} hidden={cat === item[4] ? false : true}>
                                                        <button onClick={() => this.onItem(item[0])} className="btnItem">
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
                            )
                        })
                    }
                </div>
            </div>

        );
    }
}