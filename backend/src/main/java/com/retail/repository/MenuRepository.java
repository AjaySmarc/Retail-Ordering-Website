package com.retail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.retail.model.MenuItem;

public interface MenuRepository extends JpaRepository<MenuItem, Long> {
}