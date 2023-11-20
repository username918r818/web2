package com.username918r818.web2;

import java.io.*;
import java.util.Map;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "Controller", value = "/")
public class ControllerServlet extends HttpServlet {



    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        // check if there args in request\
        RequestDispatcher requestDispatcher;
        Map<String, String[]> mapCheck = request.getParameterMap();
        if (mapCheck.containsKey("x") && mapCheck.containsKey("y") && mapCheck.containsKey("R")) {
            requestDispatcher = request.getRequestDispatcher("check_area");

        } else {
            requestDispatcher = request.getRequestDispatcher("index.jsp");
        }
        try {
            requestDispatcher.forward(request, response);
        } catch (ServletException e) {
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