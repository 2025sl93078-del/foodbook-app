package com.foodbook.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RestaurantRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String location;

    private String description;
    private Double rating;
    private String imageUrl;
    private String cuisine;
    private String priceRange;
    private String openingHours;
    private String phoneNumber;
}
