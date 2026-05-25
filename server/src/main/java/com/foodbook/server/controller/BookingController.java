package com.foodbook.server.controller;

import com.foodbook.server.dto.BookingRequest;
import com.foodbook.server.dto.BookingResponse;
import com.foodbook.server.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> create(
            @Valid @RequestBody BookingRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.createBooking(request, userDetails.getUsername()));
    }

    @GetMapping("/user")
    public ResponseEntity<List<BookingResponse>> getUserBookings(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.getUserBookings(userDetails.getUsername()));
    }

    @GetMapping("/restaurant/{restaurantId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponse>> getRestaurantBookings(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(bookingService.getRestaurantBookings(restaurantId));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancel(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, userDetails.getUsername()));
    }
}
