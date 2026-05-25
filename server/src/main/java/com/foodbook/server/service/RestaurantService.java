package com.foodbook.server.service;

import com.foodbook.server.dto.RestaurantRequest;
import com.foodbook.server.entity.Restaurant;
import com.foodbook.server.exception.ResourceNotFoundException;
import com.foodbook.server.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id));
    }

    public List<Restaurant> searchRestaurants(String query) {
        return restaurantRepository.findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(query, query);
    }

    public Restaurant createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = Restaurant.builder()
                .name(request.getName())
                .location(request.getLocation())
                .description(request.getDescription())
                .rating(request.getRating())
                .imageUrl(request.getImageUrl())
                .cuisine(request.getCuisine())
                .priceRange(request.getPriceRange())
                .openingHours(request.getOpeningHours())
                .phoneNumber(request.getPhoneNumber())
                .build();
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = getRestaurantById(id);
        restaurant.setName(request.getName());
        restaurant.setLocation(request.getLocation());
        restaurant.setDescription(request.getDescription());
        if (request.getRating() != null) restaurant.setRating(request.getRating());
        if (request.getImageUrl() != null) restaurant.setImageUrl(request.getImageUrl());
        if (request.getCuisine() != null) restaurant.setCuisine(request.getCuisine());
        if (request.getPriceRange() != null) restaurant.setPriceRange(request.getPriceRange());
        if (request.getOpeningHours() != null) restaurant.setOpeningHours(request.getOpeningHours());
        if (request.getPhoneNumber() != null) restaurant.setPhoneNumber(request.getPhoneNumber());
        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long id) {
        if (!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Restaurant", id);
        }
        restaurantRepository.deleteById(id);
    }
}
