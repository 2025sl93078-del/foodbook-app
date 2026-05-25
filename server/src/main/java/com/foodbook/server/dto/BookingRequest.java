package com.foodbook.server.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingRequest {
    @NotNull
    private Long restaurantId;

    @NotNull
    @Future
    private LocalDateTime bookingTime;

    @Min(1)
    private int guestCount;

    private String specialRequests;
}
