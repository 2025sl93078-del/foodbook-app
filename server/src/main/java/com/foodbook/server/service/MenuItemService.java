package com.foodbook.server.service;

import com.foodbook.server.dto.MenuItemRequest;
import com.foodbook.server.entity.MenuItem;
import com.foodbook.server.entity.Restaurant;
import com.foodbook.server.exception.ResourceNotFoundException;
import com.foodbook.server.repository.MenuItemRepository;
import com.foodbook.server.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;

    public List<MenuItem> getMenuByRestaurant(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    public MenuItem createMenuItem(Long restaurantId, MenuItemRequest request) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));

        MenuItem item = MenuItem.builder()
                .restaurant(restaurant)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .isAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true)
                .build();

        return menuItemRepository.save(item);
    }

    public MenuItem updateMenuItem(Long itemId, MenuItemRequest request) {
        MenuItem item = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem", itemId));

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        if (request.getCategory() != null) item.setCategory(request.getCategory());
        if (request.getImageUrl() != null) item.setImageUrl(request.getImageUrl());
        if (request.getIsAvailable() != null) item.setIsAvailable(request.getIsAvailable());

        return menuItemRepository.save(item);
    }

    public void deleteMenuItem(Long itemId) {
        if (!menuItemRepository.existsById(itemId)) {
            throw new ResourceNotFoundException("MenuItem", itemId);
        }
        menuItemRepository.deleteById(itemId);
    }
}
