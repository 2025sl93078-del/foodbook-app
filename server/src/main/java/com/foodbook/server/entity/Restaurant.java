package com.foodbook.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double rating;

    @Column(name = "image_url")
    private String imageUrl;

    private String cuisine;

    @Column(name = "price_range")
    private String priceRange;

    @Column(name = "opening_hours")
    private String openingHours;

    @Column(name = "phone_number")
    private String phoneNumber;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @Builder.Default
    private List<MenuItem> menuItems = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Booking> bookings = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Order> orders = new ArrayList<>();
}
