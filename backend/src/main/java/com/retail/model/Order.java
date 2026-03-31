package com.retail.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private double totalAmount;

    private String orderStatus;

    private LocalDateTime orderDate = LocalDateTime.now();

    public Long getId() { return id; }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public double getTotalAmount() { return totalAmount; }

    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getOrderStatus() { return orderStatus; }

    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
}