package com.retail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.retail.repository.OrderRepository;
import com.retail.repository.OrderItemRepository;
import com.retail.repository.CartItemRepository;
import com.retail.repository.MenuRepository;
import com.retail.model.Order;
import com.retail.model.OrderItem;
import com.retail.model.CartItem;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;
    
    @Autowired
    private OrderItemRepository orderItemRepo;
    
    @Autowired
    private CartItemRepository cartItemRepo;
    
    @Autowired
    private MenuRepository menuRepo;

    @Transactional
    public Order placeOrder(Long userId, List<CartItem> cartItems) {
        Order order = new Order();
        order.setUserId(userId);
        
        double total = cartItems.stream()
            .mapToDouble(item -> item.getPrice() * item.getQuantity())
            .sum();
        
        order.setTotalAmount(total);
        order.setOrderStatus("PLACED");
        
        Order savedOrder = orderRepo.save(order);
        
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(savedOrder.getId());
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItemRepo.save(orderItem);
            
            // Update stock
            menuRepo.findById(cartItem.getProductId()).ifPresent(item -> {
                item.setStock(item.getStock() - cartItem.getQuantity());
                menuRepo.save(item);
            });
        }
        
        // Clear cart
        cartItemRepo.deleteByCartId(cartItems.get(0).getCartId());
        
        return savedOrder;
    }
    
    public List<Order> getUserOrders(Long userId) {
        return orderRepo.findByUserId(userId);
    }
}