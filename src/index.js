import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './themes.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

let sidebarItems = [];
let pages = {};

const SF_DOC = {
    AddPage: (name, type, iconType, icon, data, parent = "") =>
    {
        if(parent!=="")
        {
            parent = "." + parent;
        }
        const path = parent + "." + name;
        const sidebarItem = {
            name: name,
            collapsed: false,
			iconType: iconType,
			icon: icon,
            hidden: false,
            children: []
        }
        const page = {
            name: name,
            type: type,
            data: data,
            sidebarItem: sidebarItem,
            path: path,
            class: type
        }
        pages[path] = page;

        if(parent !== "")
        {
            pages[parent].sidebarItem.children.push(sidebarItem);
        }
        else
        {
            sidebarItems.push(sidebarItem);
        }

    },
    FinishSetup: () =>
    {
        ReactDOM.render(<App sidebarItems = {sidebarItems} pages={pages} />, document.getElementById("root"));
    }
}

SF_DOC.AddPage("Test Category", "category", "", "", {});

SF_DOC.AddPage("Test Item", "category", {}, "", "", "Test Category");

SF_DOC.FinishSetup();

window.SF_DOC = SF_DOC;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();