package com.retail.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.retail.model.MenuItem;
import com.retail.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    private MenuRepository repo;

    public List<MenuItem> getMenu(){
        return repo.findAll();
    }
}