package com.foodbook.server.repository;

import com.foodbook.server.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(String name, String cuisine);
    Optional<Restaurant> findByName(String name);
}
