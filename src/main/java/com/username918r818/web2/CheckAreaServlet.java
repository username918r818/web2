package com.username918r818.web2;

import jakarta.servlet.ServletContext;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Map;

@WebServlet(name = "CheckArea", value = "/check_area")
public class CheckAreaServlet extends HttpServlet {


    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        Map<String, String[]> mapCheck = request.getParameterMap();
        double x = Double.parseDouble(mapCheck.get("x")[0]);
        double y = Double.parseDouble(mapCheck.get("y")[0]);
        double R = Double.parseDouble(mapCheck.get("R")[0]);

        ServletContext context = getServletContext();
        Object tmp = context.getAttribute("result");
        String result;
        if (tmp != null) {
            result = tmp.toString().split("</td></tr></tbody></table>")[0];
        } else {
            result = "<table id='results'><tbody><tr><td>X</td><td>Y</td><td>R</td><td>Result</td></tr>";
        }

        result += "<tr><td>" + x + "</td><td>" + y + "</td><td>" + R + "</td><td>" + checkArea(x, y, R) + "</td></tr></tbody></table>";
        context.setAttribute("result", result);
        response.getWriter().println(result);

    }



    boolean checkArea(double x, double y, double R) {
        if (x <= 0  && y <= 0 && -R <= x && -R <= y * 2) {
            return true;
        }
        if (y >= x - 1 && y <= 0  && -R <= - x * 2) {
            return true;
        }
        return x * x + y * y <= R * R;
    }
}