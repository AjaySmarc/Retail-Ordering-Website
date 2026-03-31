package com.retail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.retail.model.Order;
import com.retail.model.CartItem;
import com.retail.service.OrderService;
import com.retail.service.CartService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private CartService cartService;

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Map<String, Long> payload){
        Long userId = payload.get("userId");
        List<CartItem> cartItems = cartService.getCartItems(userId);
        return orderService.placeOrder(userId, cartItems);
    }
    
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId){
        return orderService.getUserOrders(userId);
    }
}