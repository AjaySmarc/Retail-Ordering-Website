package com.retail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.retail.repository.OrderRepository;
import com.retail.model.Order;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;

    public Order placeOrder(Order order){
        return repo.save(order);
    }
}