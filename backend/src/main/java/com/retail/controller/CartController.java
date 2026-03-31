package com.retail.controller;

import org.springframework.web.bind.annotation.*;
import com.retail.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    private final CartService service;

    public CartController(CartService service){
        this.service = service;
    }

    @PostMapping("/add")
    public String addToCart(){
        return service.addToCart();
    }
}