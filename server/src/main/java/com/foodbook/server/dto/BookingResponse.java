package com.foodbook.server.dto;

import com.foodbook.server.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private Long restaurantId;
    private String restaurantName;
    private String restaurantLocation;
    private LocalDateTime bookingTime;
    private Integer guestCount;
    private BookingStatus status;
    private String specialRequests;
    private LocalDateTime createdAt;
}
