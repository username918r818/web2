package com.username918r818.web2;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "Controller", value = "/controller")
public class ControllerServlet extends HttpServlet {


    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        RequestDispatcher requestDispatcher;
        String r = request.getHeader("R");
        String x = request.getHeader("x");
        String y = request.getHeader("y");

        // как я и описал в другом файле, не работает
        // надо изучить разные типы отправления контента и его обработки

        // Map<String, String[]> mapCheck = request.getParameterMap();
        // if (mapCheck.containsKey("x") && mapCheck.containsKey("y") && mapCheck.containsKey("R")) {

        if (r != null && x != null && y != null) {
            requestDispatcher = request.getRequestDispatcher("/check_area");
        } else {
            requestDispatcher = request.getRequestDispatcher("/index.jsp");
        }
        try {
            requestDispatcher.forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        RequestDispatcher requestDispatcher = request.getRequestDispatcher("index.jsp");
        try {
            requestDispatcher.forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        }
    }

}