
import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';
import update from 'react-addons-update';
import { Growl } from 'primereact/growl';
import { FileUpload } from 'primereact/fileupload';


import './Item.css'

const $ = window.$;
const axios = require('axios');

export class Item extends Component {

    constructor() {
        super();
        this.state = {
            cat: null,

            ddlCats: [],
            specs: [],
            txtSpec: [],

            txtDescription: "",
            txtPrice: "",
            txtname: "",

           
        }

        this.onFileUpload = this.onFileUpload.bind(this);


    }

    componentDidMount = () => {
        var self = this;
        if ($.token !== '') {
            axios.get('http://localhost/eDelegate/GetAllCat.php?Operation=Categories')
                .then(function (response) {
                    // handle success
                    if (response.data["0"] === "Success") {
                        var count = Object.keys(response.data["1"]).length;
                        var catsArray = [];
                        for (var i = 0; i < count; i++) {
                            const cat = {
                                label: response.data["1"][i][1],
                                value: response.data["1"][i][0]
                            }
                            catsArray.push(cat);
                        }

                        self.setState({ ddlCats: catsArray });
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed

                });
            if ($.item !== '') {
                axios.get('http://localhost/eDelegate/Item.php?Operation=getItem&token=' + $.token + '&ItemName=' + $.item)
                    .then(function (response) {
                        // handle success
                        if (response.data["0"] === "Success") {
                            var count = Object.keys(response.data["3"]).length;
                            var specsArray = [];
                            for (var i = 0; i < count; i++) {
                                specsArray.push(response.data["3"][i]);
                            }
                            self.setState({
                                txtname: response.data["1"].Name,
                                txtDescription: response.data["1"].Description,
                                txtPrice: response.data["1"].Price,
                                cat: response.data["1"].CategoryId,
                            });
                            self.onPickCategory(response.data["1"].CategoryId);
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
        else {
            $.mode = "guest";
            $.cat = '';
            $.name = '';
            $.item = '';
            $.history.push("/");
        }
    }

    loadSpecs = () => {
        var count = Object.keys(this.state.specs).length;
        var specsArray = [];
        for (var i = 0; i < count; i++) {
            specsArray.push(this.state.specs[i][1]);

        }
        console.log(specsArray);
        this.setState({ txtSpec: specsArray });
    }

    onPickCategory = (catId) => {
        var self = this;
        axios.get('http://localhost/eDelegate/Item.php?Operation=getSpecs&token=' + $.token + '&catId=' + catId)
            .then(function (response) {
                // handle success
                if (response.data["0"] === "Success") {
                    var count = Object.keys(response.data["1"]).length;
                    var specsArray = [];
                    for (var i = 0; i < count; i++) {
                        specsArray.push(response.data["1"][i]);
                    }
                    self.setState({ specs: specsArray, cat: catId }, () => {
                        self.loadSpecs()
                    });
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

    onSave = () => {
        var self = this;

        if (this.state.txtDescription === "" || this.state.txtPrice === "" || this.state.txtname === "" || this.state.cat === null) {
            this.growl.show({ severity: 'warn', summary: 'Warning Message', detail: 'Please fill all the required fields' });
        }
        else {
            var flag = true
            for (let i = 0; i < this.state.txtSpec.length; i++) {
                if (this.state.txtSpec[i] === "") {
                    flag = false;
                }
            }
            if (flag) {
                var specsParam = "";
                var i;
                for (i = 0; i < this.state.specs.length; i++) {
                    specsParam += "&specName" + i + "=" + this.state.specs[i] + "&specValue" + i + "=" + this.state.txtSpec[i]
                }
                specsParam += "&specCount=" + i
                const newItem = "&ItemName=" + this.state.txtname + "&Price=" + this.state.txtPrice + "&Description=" + this.state.txtDescription + "&SrcFile=./Dell.png&catId=" + this.state.cat + "&UserName=" + $.name + specsParam;
                if ($.item === '') {
                    axios.get('http://localhost/eDelegate/InsertItems.php?Operation=InsertItem&token=' + $.token + newItem)
                        .then(function (response) {
                            // handle success
                            if (response.data["0"] === "Success") {
                                $.item = self.state.txtname;
                                $.history.push("/viewItem")

                            }
                            else {
                                self.growl.show({ severity: 'error', summary: 'Warning Message', detail: 'Item could not be saved' });

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
                    axios.get('http://localhost/eDelegate/EditItem.php?Operation=EditItem&token=' + $.token + '&OldItemName=' + $.item + newItem)
                        .then(function (response) {
                            // handle success
                            if (response.data["0"] === "Success") {
                                $.item = self.state.txtname;
                                $.history.push("/viewItem")

                            }
                            else {
                                self.growl.show({ severity: 'error', summary: 'Warning Message', detail: 'Item could not be saved' });

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
            else {
                this.growl.show({ severity: 'warn', summary: 'Warning Message', detail: 'Please fill all the specification fields' });

            }

        }

    }

    onFileUpload(event) {
        console.log(event)
        this.growl.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }


    render() {
        return (

            <div id="tt-pageContent">
                <Growl ref={(el) => this.growl = el} />

                <div class="container-indent">
                    <div class="container">
                        <h1 class="tt-title-subpages noborder">{$.item === "" ? "ADD AN ITEM" : "UPDATE ITEM"}</h1>
                        <div class="tt-login-form">
                            <div class="row">

                                <div class="col-xs-12 col-md-6">
                                    <div class="tt-item">
                                        <h2 class="tt-title">Item</h2>
                                        You have an item to add, Great, add all the information needed for your new item, and your set
							<div class="form-default form-top">
                                            <div className="form-default form-top">
                                                <div className="form-group">
                                                    <label htmlFor="loginInputName">ITEM NAME *</label>
                                                    <div className="tt-required">* Required Fields</div>
                                                    <input type="text" name="name" className="form-control" id="loginInputName" placeholder="Enter Name" value={this.state.txtname} onChange={(e) => this.setState({ txtname: e.target.value })} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="loginInputDescription">DESCRIPTION *</label>
                                                    <textarea type="text" rows="3" name="Description" className="form-control" id="loginInputDescription" placeholder="Enter Description" value={this.state.txtDescription} onChange={(e) => this.setState({ txtDescription: e.target.value })} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="loginInputPrice">PRICE *</label>
                                                    <input type="text" name="Price" className="form-control" id="loginInputPrice" placeholder="Enter Price" value={this.state.txtPrice} onChange={(e) => this.setState({ txtPrice: e.target.value })} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="loginInputCategory">CATEGORY *</label>
                                                    <Dropdown options={this.state.ddlCats} value={this.state.cat} onChange={(e) => { this.onPickCategory(e.value) }} style={{ 'width': '100%' }} placeholder="Choose a category" required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="loginInputImage">IMAGE *</label>
                                                    <FileUpload name="demo[]" url={"http://127.0.0.1:8887/"} maxFileSize={1000000} onUpload={(e) => this.onFileUpload(e)} accept="image/*" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="col-xs-12 col-md-6">
                                    <div class="tt-item">
                                        <h2 className="tt-title">Specifications</h2>
                                        {
                                            this.state.specs.map((spec, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className="form-group">
                                                            <label htmlFor={"loginInputSpec" + index}>{spec} *</label>
                                                            <input type="text" name={spec} className="form-control" id={"loginInputSpec" + index} placeholder="Enter Specification" value={this.state.txtSpec[index]} onChange={(e) => {
                                                                this.state.txtSpec[index] = e.target.value;
                                                                this.forceUpdate()
                                                            }} required />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="row">
                                            <div className="col-auto mr-auto">
                                                <div className="form-group">
                                                    <button class="btn btn-border" onClick={this.onSave}>Save Item</button>
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