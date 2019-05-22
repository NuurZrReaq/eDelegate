import React, { Component } from 'react';
import { Button } from 'primereact/button';
import SimpleImageSlider from "react-simple-image-slider";


import './Home.css'

const $ = window.$;
const axios = require('axios');

export class GuestHome extends Component {
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
        axios.get('http://localhost/eDelegate/GuestMainPage.php')
            .then(function (response) {
                // handle success
                if (response.data["0"] === "Success") {
                    var count = Object.keys(response.data).length;
                    var catsArray = [];
                    var itemsArray = [];
                    for (var i = 1; i < count; i += 4) {
                        catsArray.push(response.data[i]);
                        itemsArray.push(response.data[i + 1]);
                        itemsArray.push(response.data[i + 2]);
                        itemsArray.push(response.data[i + 3]);
                    }

                    self.setState({ items: itemsArray, categories: catsArray });
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
            { url: require('./sales2.jpg') },
            { url: require('./image1.jpg') },
            { url: require('./image3.jpg') }
        ];


        return (
            <div className="p-grid p-fluid dashboard">
                <div className="outer" hidden={$.mode !== "guest"}>
                    <SimpleImageSlider
                        width={this.state.width}
                        height={400}
                        images={images}
                        slideDuration="0.1"
                    />
                    <div className="categoryItems">
                        {
                            this.state.categories.map((cat, catIndex) => {
                                return (
                                    <div key={catIndex}>
                                        <button onClick={() => this.onCategory(cat)} className="btnHomeCategory">
                                            <div class="col-sm-12">
                                                <h2 class="lined-heading"><span className="cat">{cat}</span></h2>
                                            </div>
                                        </button>
                                        <div>
                                            {
                                                this.state.items.map((item, index) => {
                                                    return (
                                                        <div key={index} hidden={(index < (catIndex * 3 + 3)) ? (index >= catIndex * 3 ? false : true) : true}>
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
            </div>

        );
    }
}