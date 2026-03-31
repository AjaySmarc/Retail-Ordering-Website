package com.retail.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.retail.model.MenuItem;
import com.retail.service.MenuService;

@RestController
@RequestMapping("/menu")
@CrossOrigin
public class MenuController {

    @Autowired
    private MenuService service;

    @GetMapping
    public List<MenuItem> getMenu(){
        return service.getMenu();
    }
}