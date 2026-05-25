package com.foodbook.server.repository;

import com.foodbook.server.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantId(Long restaurantId);
    List<MenuItem> findByRestaurantIdAndIsAvailableTrue(Long restaurantId);
    Optional<MenuItem> findByRestaurantIdAndName(Long restaurantId, String name);
}
