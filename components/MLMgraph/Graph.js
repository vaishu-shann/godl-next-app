import React from 'react'
import Graph from "react-vis-network-graph";

export const MLMGraph = () => {
    const graph = {
        nodes: [
            {
                id: 1, shape: 'image',
                image: './images/graph-profile-mapcolor.svg', size: 35, 
            },
            {
                id: 2, shape: 'image',label:"0xC4f4B....5895E9a",font: { color: "#fff", fontSize: 15, },
                image: './images/graph-profile-yellow.svg', size: 35, 
            },
            {
                id: 3, shape: 'image',
                image: './images/graph-profile-mapcolor.svg', size: 35, 
            },

            {
                id: 4, shape: 'image',
                image: './images/graph-profile-yellow.svg', size: 35, 
            },

            {
                id: 5, shape: 'image',
                image: './images/graph-profile-yellow.svg', size: 35, 
            },
            {
                id: 6, shape: 'image',
                image: './images/graph-profile-yellow.svg', size: 35, 
            },
            {
                id: 7, shape: 'image',
                image: './images/graph-profile-yellow.svg', size: 35, 
            },
            {
                id: 8, shape: 'image',
                image: './images/graph-profile-mapcolor.svg', size: 35, 
            },

        ],
        // https://o.remove.bg/downloads/321c8faa-d52e-4841-a426-f82c9ebdb260/images-removebg-preview.png
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 8},
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 5, to: 6 },
            { from: 5, to: 7 },
        ]
    };

    const options = {

        interaction: {
            zoomView: false,
            navigationButtons: false,

        },
        smooth: { enabled: false },
        nodes: {
            shape: 'image',
            widthMin: 20,
            widthMax: 20,
            borderWidth: 2,
            radius: 24,
            color: {
                background: "#35342f",
                border: "#35342f"
            }
        },
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#ecc51f",
            width: 1,
        },

        height: "500px",
        width:"100%"


    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        }
    };
    return (
        <div>
            <Graph
                graph={graph}
                options={options}
                events={events}
                getNetwork={network => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                }}
            />
        </div>
    )
}