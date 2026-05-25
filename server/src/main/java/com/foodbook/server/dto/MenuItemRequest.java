package com.foodbook.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MenuItemRequest {
    @NotBlank
    private String name;

    private String description;

    @NotNull
    private Double price;

    private String category;
    private String imageUrl;
    private Boolean isAvailable;
}
