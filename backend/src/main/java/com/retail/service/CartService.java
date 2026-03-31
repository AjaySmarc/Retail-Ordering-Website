package com.retail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.retail.model.Cart;
import com.retail.model.CartItem;
import com.retail.model.MenuItem;
import com.retail.repository.CartRepository;
import com.retail.repository.CartItemRepository;
import com.retail.repository.MenuRepository;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;
    
    @Autowired
    private CartItemRepository cartItemRepo;
    
    @Autowired
    private MenuRepository menuRepo;

    public Cart getOrCreateCart(Long userId) {
        // Find cart by user, or create new one
        return cartRepo.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            return cartRepo.save(newCart);
        });
    }

    public CartItem addToCart(Long userId, Long productId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        MenuItem item = menuRepo.findById(productId).orElseThrow();
        
        // Check if item already in cart
        Optional<CartItem> existing = cartItemRepo.findByCartIdAndProductId(cart.getId(), productId);
        
        if (existing.isPresent()) {
            CartItem cartItem = existing.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            return cartItemRepo.save(cartItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCartId(cart.getId());
            cartItem.setProductId(productId);
            cartItem.setQuantity(quantity);
            cartItem.setPrice(item.getPrice());
            return cartItemRepo.save(cartItem);
        }
    }

    public List<CartItem> getCartItems(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return cartItemRepo.findByCartId(cart.getId());
    }

    public void removeFromCart(Long userId, Long cartItemId) {
        cartItemRepo.deleteById(cartItemId);
    }

    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepo.deleteByCartId(cart.getId());
    }
}