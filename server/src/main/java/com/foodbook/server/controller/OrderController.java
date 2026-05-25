package com.foodbook.server.controller;

import com.foodbook.server.dto.OrderRequest;
import com.foodbook.server.dto.OrderResponse;
import com.foodbook.server.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(
            @Valid @RequestBody OrderRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.createOrder(request, userDetails.getUsername()));
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderResponse>> getUserOrders(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getUserOrders(userDetails.getUsername()));
    }

    @GetMapping("/restaurant/{restaurantId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderResponse>> getRestaurantOrders(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(orderService.getRestaurantOrders(restaurantId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, body.get("status")));
    }
}
