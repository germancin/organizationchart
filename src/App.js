import React , { useState, useEffect } from "react";
import MyNode from "./my-node";
import OrganizationChart from "@dabeng/react-orgchart";
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import getUsers from './actions'

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994, uuid:1, parent:null },
    { label: 'The Godfather', year: 1972, uuid:2, parent:1 },
    { label: 'The Godfather: Part II', year: 1974, uuid:3, parent:1 },
    { label: 'The Dark Knight', year: 2008, uuid:4, parent:3 },
    { label: '12 Angry Men', year: 1957, uuid:5, parent:3 },
    { label: "Schindler's List", year: 1993, uuid:6, parent:2 },
    { label: 'Pulp Fiction', year: 1994, uuid:7, parent:2 },
    { label: 'german', year:2000, uuid:8, parent:4 },
    { label: 'pedro ', year: 1992, uuid:9, parent:4 },
    { label: 'frnacisco ', year: 1994, uuid:10, parent:6 },
    { label: 'roberto ', year: 1995, uuid:11, parent:6 },
    { label: 'angelica ', year: 1994, uuid:12, parent:4 },
];

const handleOnchange = (event) => {
    console.log(event.target)
}

const CustomNodeChart = () => {

    let ds_original = {
        id: "n1",
        name: "Lao Lao",
        title: "general manager director",
        children: [
            { id: "n2", name: "Bo Miao", title: "department manager", arrow: "hide-arrow", },
            {
                id: "n3",
                name: "Su Miao",
                title: "department manager",
                arrow: "hide-arrow",
                children: [
                    { id: "n4", name: "Tie Hua", title: "senior engineer" },
                    {
                        id: "n5",
                        name: "Hei Hei",
                        title: "senior engineer",
                        children: [
                            { id: "n6", name: "Dan Dan", title: "engineer" },
                            { id: "n7", name: "Xiang Xiang", title: "engineer" }
                        ]
                    },
                    { id: "n8", name: "Pang Pang", title: "senior engineer" }
                ]
            },
            { id: "n9", name: "Hong Miao", title: "department manager", arrow: "hide-arrow", },
            {
                id: "n10",
                name: "Chun Miao",
                title: "department manager",
                arrow: "hide-arrow",
                children: [
                    { id: "n11", name: "Yue Yue", title: "senior engineer" },
                    { id: "n12", name: "German Gonzalez", title: "senior engineer" },


                ]
            }
        ],

    };
    let ds = {
        id: "x1",
        name: "Name Owner",
        title: "owner",
    };

    const myCustomClick = (node) => {
        const nodeID = node.id;
        const nodeObj = document.getElementById(nodeID);
        if(nodeObj){
            const iElements = nodeObj.getElementsByTagName('i');
            for (let i = 0; i < iElements.length; i++){
                const item = iElements[i];
                if(item.classList.contains('not-expanded')){
                    const ulElement = nodeObj.nextElementSibling;
                    item.className = "oc-edge verticalEdge bottomEdge oci is-expanded from-custom-click"
                    ulElement.className = "children-shown"
                }
                else if(item.classList.contains('is-expanded')){
                    const ulElement = nodeObj.nextElementSibling;
                    ulElement.className = "children-hidden"
                    const liElement = document.querySelector(".orgchart.myChart ul li ");
                    console.log(".......Este es el query selector li TAG", liElement);
                    if(liElement){

                        document.styleSheets[0].addRule('.orgchart.myChart ul li .oc-node:not(:only-child)::after','background-color: yellow;');

                    }

                }
            }

            // console.log(node);
            // console.log("CLick position: ", window.mousePosition);
        }
    }
    const [userData, setUserData] = React.useState(ds)
    const [data, setData] = React.useState(top100Films)
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState('');
    const nodeNodeTarget = 'owner'

    useEffect(function(){
        getUsers().then(response => setUserData(response))
    }, [])


    return (
        <>
            <Autocomplete style={{marginTop:"100px", marginLeft:"20px"}}
                id="combo-box-demo"
                options={data}
                getOptionLabel={(option) => option.label}
                sx={{ width: 300 }}
                onChange={(event, newValue) => {
                    setValue(newValue.label);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                inputValue={inputValue}
                renderInput={(params) => <TextField {...params}  label="Select an Option" />}
            />

            <OrganizationChart
                datasource={userData}
                chartClass="myChart"
                NodeTemplate={MyNode}
                pan={true}
                zoom={false}
                collapsible={true}
                onClickNode={(event) => myCustomClick(event)}
            />
        </>
    );
};

export default CustomNodeChart;
