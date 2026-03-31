package com.retail.controller;

import org.springframework.web.bind.annotation.*;
import com.retail.service.CartService;
import com.retail.model.CartItem;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    private final CartService service;

    public CartController(CartService service){
        this.service = service;
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody Map<String, Object> payload){
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = (int) payload.get("quantity");
        return service.addToCart(userId, productId, quantity);
    }
    
    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId){
        return service.getCartItems(userId);
    }
    
    @DeleteMapping("/{userId}/{cartItemId}")
    public String removeFromCart(@PathVariable Long userId, @PathVariable Long cartItemId){
        service.removeFromCart(userId, cartItemId);
        return "Item removed";
    }
    
    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable Long userId){
        service.clearCart(userId);
        return "Cart cleared";
    }
}