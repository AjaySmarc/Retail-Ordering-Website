package com.retail.service;

import org.springframework.stereotype.Service;

@Service
public class CartService {

    public String addToCart(){
        return "Item added to cart";
    }
}