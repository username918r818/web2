<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">

<head>
    <title>вторая лаба</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
</head>

<body>
<header>
    <h1>вторая лаба по вебу</h1>
    <h2>95876 закусов кирилл P3108</h2>
</header>

<form id="form">
    <label>Введите целое число x:</label><br>
    <%--    TODO уброать этот говнокод и добавить механику через .value--%>
    <input type="checkbox" id="x" name="x" value="-3">
    <label>-3</label><br>
    <input type="checkbox" id="x" name="x" value="-2">
    <label>-2</label><br>
    <input type="checkbox" id="x" name="x" value="-1">
    <label>-1</label><br>
    <input type="checkbox" id="x" name="x" value=0>
    <label>0</label><br>
    <input type="checkbox" id="x" name="x" value="1">
    <label>1</label><br>
    <input type="checkbox" id="x" name="x" value="2">
    <label>2</label><br>
    <input type="checkbox" id="x" name="x" value="3">
    <label>3</label><br>
    <input type="checkbox" id="x" name="x" value="4">
    <label>4</label><br>
    <input type="checkbox" id="x" name="x" value="5">
    <label>5</label><br><br>

    <label for="y">Введите целое число y:</label><br>
    <input type="text" id="y" name="y"><br><br>

    <label>Выберите число R:</label><br>
    <select id="R" name="R" onchange="redrawGraph(this.value)">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>

    <input type="hidden" id="hidden_res" name="results" value="">

    <button type="submit" id="submit">Отправить</button>
</form>

<canvas id="graphImage"></canvas>

<div id='container'>
    <table id="results">
        <tr>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Result</td>
        </tr>
    </table>
</div>

<script src="script.js"></script>
</body>

</html>