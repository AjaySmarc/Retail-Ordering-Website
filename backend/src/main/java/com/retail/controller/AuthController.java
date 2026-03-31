package com.retail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.retail.model.User;
import com.retail.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/signup")
    public User signup(@RequestBody User user){
        return service.register(user);
    }

   @PostMapping("/login")
public User login(@RequestBody User user){
    return service.login(user.getEmail(), user.getPassword());
}
}