package com.username918r818.web2;

import jakarta.servlet.ServletContext;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.function.Function;

@WebServlet(name = "CheckArea", value = "/check_area")
public class CheckAreaServlet extends HttpServlet {

    @SuppressWarnings("unchecked")
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        // информация передается через хедеры, это плохо, но у меня не вышло сделать то же самое через параметры
        String r_str = request.getHeader("R");
        String x_str = request.getHeader("x");
        String y_str = request.getHeader("y");


        ServletContext context = getServletContext();
        Object ox = context.getAttribute("x");
        Object oy = context.getAttribute("y");
        Object oR = context.getAttribute("R");
        Object oResult = context.getAttribute("result");

        // информация о предыдущих результатах хранится в виде стринга, технический долг
        // todo сделать объект с конструктором, сеттером нового чека и геттером всех результатов


        Function<Object, ArrayList<Double>> toDouble = obj -> {
            if (obj instanceof ArrayList) {
                return (ArrayList<Double>) obj;
            } else {
                return new ArrayList<>();
            }
        };

        ArrayList<Double> x = toDouble.apply(ox);
        ArrayList<Double> y = toDouble.apply(oy);
        ArrayList<Double> R = toDouble.apply(oR);
        ArrayList<Boolean> result;

        if (oResult instanceof ArrayList) {
            result = (ArrayList<Boolean>) oResult;
        } else {
            result = new ArrayList<>();
        }


        x.add(Double.parseDouble(x_str));
        y.add(Double.parseDouble(y_str));
        R.add(Double.parseDouble(r_str));
        result.add(checkArea(x.get(x.size() - 1), y.get(y.size() - 1), R.get(R.size() - 1)));

        context.setAttribute("x", x);
        context.setAttribute("y", y);
        context.setAttribute("R", R);
        context.setAttribute("result", result);

        response.getWriter().println(getTable(x, y, R, result));
    }

    String getTable(ArrayList<Double> x, ArrayList<Double> y, ArrayList<Double> R, ArrayList<Boolean> result) {
        StringBuilder response = new StringBuilder();
        response.append("<table id='results'><tbody><tr><td>X</td><td>Y</td><td>R</td><td>Result</td></tr>");
        for (int i = 0; i < x.size(); i++) {
            response.append("<tr><td>").append(x.get(i)).append("</td><td>").append(y.get(i)).append("</td><td>").append(R.get(i)).append("</td><td>").append(result.get(i)).append("</td></tr>");
        }
        response.append("</tbody></table>");
        return response.toString();

    }

    boolean checkArea(double x, double y, double R) {
        // оси
        if (x == 0 && -R <= y * 2 && y * 2 <= R || -R <= x * 2 && x * 2 <= R && y == 0) {
            return true;
        } else if (-R <= x && x <= 0 && y == 0) {
            return true;
        }
        // прямоугольник
        if (x < 0 && -x <= R && y < 0 && 2 * -y <= R) {
            return true;
        }

        // сектор
        if (x > 0 && y > 0) {
            return (x * x + y * y) * 4 <= R * R;
        }

        // треугольник
        if (x > 0 && y < 0) {
            return (2 * y >= 2 * x - R);
        }

        return false;
    }
}