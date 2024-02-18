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
    } else if (y < -5 || y > 5 || y % 1 != 0) {
        flag = false;
        alert("Y is not in range");
    }

    if (R < 1 || R > 5 || R % 1 != 0) {
        flag = false;
        alert("R is not in range");
    }
    return flag;
}

// инкапсулирует запрос и получение ответа
// по какой-то причине данные в теле запроса не передаются,
// поэтому они передаются в хедерах
// вывод результата в контейнер
async function sendForm(x, y, R) {
    let body = {
        "x": +x,
        "y": +y,
        "R": +R,
    }

    let response = await fetch("http://localhost:8080/web2297-5/controller", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x': x,
            'y': y,
            'R': R
        },
        "body": JSON.stringify(body)
    });
    let result = await response.text();
    let container = document.getElementById("container");
    container.innerHTML = result.toString();
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
    await sendForm(x, y, R);
}

const canvas = document.getElementById("graphImage");
const ctx = canvas.getContext("2d");

// noinspection JSSuspiciousNameCombination
canvas.height = canvas.width;

const hatchWidth = 20 / 2;
const hatchGap = 56;

function redrawGraph(r) {
    let w = canvas.width;
    let h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "grey";

    // y axis
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();

    // x axis
    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

    // риски
    ctx.beginPath();
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
    ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
    ctx.stroke();
    ctx.closePath();

    // Рисуем первую четверть (квадрат)
    ctx.fillStyle = "#4040bf55";
    ctx.fillRect(150 - 2 * hatchGap, 150, hatchGap * 2, hatchGap);

    // треугольник
    ctx.beginPath();
    ctx.moveTo(150, 150 + hatchGap);
    ctx.lineTo(150 + hatchGap, 150);
    ctx.lineTo(150, 150);
    ctx.closePath();

    // сектор
    ctx.arc(150, 150, hatchGap, 0, (-1 / 2) * Math.PI, true);
    ctx.fill();

    ctx.moveTo(150, 150);
    ctx.strokeStyle = "#4040bf55";
    ctx.closePath();

    // точки
    let points = arrayTable(document.getElementById("container"));
    ctx.fillStyle = "#B22222";
    let pointSize = hatchGap / 5;
    if (!(isNaN(r) || r === null))
        for (let i = 0; i < points.length; i++) {
            let x = points[i][0];
            let y = points[i][1];
            // x = (x - 150) / hatchGap * Number(R) / 2;
            // y = (150 - y) / hatchGap * Number(R) / 2;
            x = x * 2 * hatchGap / Number(r) + 150;
            y = y * 2 * hatchGap / Number(r) * (-1) + 150;
            if (!(x < 0 || x > w || y < 0 || y > h)) {
                ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);
            }

        }

    const fontSize = hatchGap / 3.5;
    ctx.fillStyle = "black";

    ctx.font = `500 ${fontSize * 1.4}px Roboto`;
    ctx.fillText("y", w / 2 - hatchWidth * 2.8, 15);
    ctx.fillText("x", w - 20, h / 2 - hatchWidth * 2.4);

    let label1, label2;

    if (isNaN(r)) {
        label1 = r + "/2";
        label2 = r;
    } else if (r === null) {
        label1 = "R/2";
        label2 = "R";
    } else {
        label1 = r / 2;
        label2 = r;
    }

    ctx.font = `800 ${fontSize}px Roboto`;
    ctx.fillText(label1, w / 2 + hatchGap - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText(label2, w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText("-" + label1, w / 2 - hatchGap - 7, h / 2 + hatchWidth * 2.8);
    ctx.fillText(
        "-" + label2,
        w / 2 - hatchGap * 2 - 7,
        h / 2 + hatchWidth * 2.8
    );

    ctx.fillText(label1, w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
    ctx.fillText(label2, w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
    ctx.fillText("-" + label1, w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
    ctx.fillText("-" + label2, w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);
}


canvas.onclick = async (e) => {

    // относительные координаты клика
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    let R = document.getElementById("R").value;

    if (R === null || isNaN(R)) {
        alert("Выберите R");
        return;
    }

    // абсолютные координаты клика
    x = ((x - 150) / hatchGap * Number(R) / 2).toFixed(1);
    y = ((150 - y) / hatchGap * Number(R) / 2).toFixed(1);

    await sendForm(x, y, R);
    redrawGraph(R);
}


window.addEventListener("load", (event) => {
    redrawGraph(document.getElementById(("R")).value);
});

// write function that receives an html table and makes an array
// <table id='results'><tbody><tr><td>X</td><td>Y</td><td>R</td><td>Result</td></tr><tr><td>-0.1</td><td>-0.1</td><td>5.0</td><td>true<tr><td>-0.6</td><td>0.6</td><td>5.0</td><td>true</td></tr></tbody></table>
function arrayTable(table) {
    let tableBody = table.getElementsByTagName("tbody")[0];
    let rows = tableBody.getElementsByTagName("tr");
    let result = [];
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let row = [];
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].innerHTML);
        }
        result.push(row);
    }
    return result;
}