package com.foodbook.server.repository;

import com.foodbook.server.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Order> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);
}
