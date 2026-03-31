package com.retail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.retail.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}