package com.foodbook.server.repository;

import com.foodbook.server.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Booking> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);
}
