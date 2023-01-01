import {getData} from "./module.js";
import "./styles.css";

window.onload = async ()=> {
    document.body.innerHTML = await getData();
};