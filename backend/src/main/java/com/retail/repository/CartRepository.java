package com.retail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.retail.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
}