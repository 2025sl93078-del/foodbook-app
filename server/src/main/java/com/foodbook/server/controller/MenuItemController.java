package com.foodbook.server.controller;

import com.foodbook.server.dto.MenuItemRequest;
import com.foodbook.server.entity.MenuItem;
import com.foodbook.server.service.MenuItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants/{restaurantId}/menu")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @GetMapping
    public ResponseEntity<List<MenuItem>> getMenu(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(menuItemService.getMenuByRestaurant(restaurantId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuItem> create(@PathVariable Long restaurantId,
                                            @Valid @RequestBody MenuItemRequest request) {
        return ResponseEntity.ok(menuItemService.createMenuItem(restaurantId, request));
    }

    @PutMapping("/{itemId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuItem> update(@PathVariable Long restaurantId,
                                            @PathVariable Long itemId,
                                            @Valid @RequestBody MenuItemRequest request) {
        return ResponseEntity.ok(menuItemService.updateMenuItem(itemId, request));
    }

    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long restaurantId,
                                        @PathVariable Long itemId) {
        menuItemService.deleteMenuItem(itemId);
        return ResponseEntity.noContent().build();
    }
}
