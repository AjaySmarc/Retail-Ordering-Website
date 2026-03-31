package com.retail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.retail.repository.UserRepository;
import com.retail.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user){
        return userRepository.save(user);
    }

    @Autowired
UserRepository repo;

public User login(String email, String password){

    User user = repo.findByEmail(email);

    if(user != null && user.getPassword().equals(password)){
        return user;
    }

    return null;
}
}