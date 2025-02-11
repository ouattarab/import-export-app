package com.example.app.service;

import com.example.app.dto.UserDTO;
import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    void saveAllUsers(List<UserDTO> userDTOList);
}
