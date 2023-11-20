"use strict";

function validate(x, y, R) {
    let flag = true;

    if (x === null) {
        flag = false;
        alert("X is not selected");
    }

    if (y == "") {
        flag = false;
        alert("Y is not selected");
    } else if (isNaN(y)) {
        flag = false;
        alert("Y is not a number");
    } else if (y < -3 || y > 5 || y % 1 != 0) {
        flag = false;
        alert("Y is not in range");
    }

    if (R <  1 || R > 5 || R % 1 != 0) {
        flag = false;
        alert("R is not in range");
    }
    return flag;
}

function get_array() {
    let table = document.getElementById("results").getElementsByTagName("tbody")[0];
    let array = [];
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let obj = [row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML, row.cells[3].innerHTML];
        array.push(obj);
    }
    return JSON.stringify(array);
}

async function sendForm(x, y, R) {
    let body = {
        "x": +x,
        "y": +y,
        "R": +R,
        "table": document.getElementById("results").outerHTML,
    }
    // console.log(document.getElementById("results").outerHTML);
    console.log(get_array());
    let formData = new FormData();
    formData.append("x", +x);
    formData.append("y", +y);
    formData.append("R", +R);
    formData.append("table", get_array())
    // formData.append("table", `"<html><body>${document.getElementById("results").outerHTML}</body></html>`);

    let response = await fetch("https://se.ifmo.ru/~s367223/lab1/script.php", {
        method: "POST",
        // headers: {'Content-Type': 'application/json;charset=utf-8'},
        "body": formData,
    });
    let result = await response.text();
    return result;
}

let formElem = document.getElementById("form");

formElem.onsubmit = async (e) => {
    e.preventDefault();
    let body = new FormData(formElem);
    let x = body.get("x");
    let y = body.get("y");
    let R = body.get("R");

    console.log(x, y, R);


    if (!validate(x, y, R)) {
        return;
    }

    let result = sendForm(x, y, R);
    console.log(result);
    let container = document.getElementById("container");
    container.innerHTML = (await result).toString();


}

// todo вставить обработку кликов по графикам, которые минуют валидацию, сделать привязку к выбранному R
// сначана сделать сам график