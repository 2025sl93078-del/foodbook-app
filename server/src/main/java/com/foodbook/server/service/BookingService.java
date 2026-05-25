package com.foodbook.server.service;

import com.foodbook.server.dto.BookingRequest;
import com.foodbook.server.dto.BookingResponse;
import com.foodbook.server.entity.Booking;
import com.foodbook.server.entity.Restaurant;
import com.foodbook.server.entity.User;
import com.foodbook.server.enums.BookingStatus;
import com.foodbook.server.exception.ResourceNotFoundException;
import com.foodbook.server.repository.BookingRepository;
import com.foodbook.server.repository.RestaurantRepository;
import com.foodbook.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", request.getRestaurantId()));

        Booking booking = Booking.builder()
                .user(user)
                .restaurant(restaurant)
                .bookingTime(request.getBookingTime())
                .guestCount(request.getGuestCount())
                .specialRequests(request.getSpecialRequests())
                .status(BookingStatus.CONFIRMED)
                .build();

        Booking saved = bookingRepository.save(booking);
        return toResponse(saved);
    }

    public List<BookingResponse> getUserBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::toResponse).toList();
    }

    public List<BookingResponse> getRestaurantBookings(Long restaurantId) {
        return bookingRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId)
                .stream().map(this::toResponse).toList();
    }

    public BookingResponse cancelBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", bookingId));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("You can only cancel your own bookings");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return toResponse(bookingRepository.save(booking));
    }

    private BookingResponse toResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .restaurantId(booking.getRestaurant().getId())
                .restaurantName(booking.getRestaurant().getName())
                .restaurantLocation(booking.getRestaurant().getLocation())
                .bookingTime(booking.getBookingTime())
                .guestCount(booking.getGuestCount())
                .status(booking.getStatus())
                .specialRequests(booking.getSpecialRequests())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
