package com.example.app.service.impl;

import com.example.app.dto.UserDTO;
import com.example.app.model.User;
import com.example.app.repository.UserRepository;
import com.example.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getAge(), user.getCity()))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé !"));
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getAge(), user.getCity());
    }

    @Override
    @Transactional
    public void saveAllUsers(List<UserDTO> userDTOList) {
        List<User> users = userDTOList.stream()
                .map(dto -> new User(null, dto.getName(), dto.getEmail(), dto.getAge(), dto.getCity()))
                .collect(Collectors.toList());
        
        userRepository.saveAll(users);
    }
}
