package com.foodbook.server.service;

import com.foodbook.server.dto.OrderItemRequest;
import com.foodbook.server.dto.OrderRequest;
import com.foodbook.server.dto.OrderResponse;
import com.foodbook.server.entity.*;
import com.foodbook.server.enums.OrderStatus;
import com.foodbook.server.exception.ResourceNotFoundException;
import com.foodbook.server.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    @Transactional
    public OrderResponse createOrder(OrderRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", request.getRestaurantId()));

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        Order order = Order.builder()
                .user(user)
                .restaurant(restaurant)
                .totalAmount(0.0)
                .status(OrderStatus.PENDING)
                .build();

        Order savedOrder = orderRepository.save(order);

        for (OrderItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("MenuItem", itemReq.getMenuItemId()));

            if (!menuItem.getRestaurant().getId().equals(restaurant.getId())) {
                throw new IllegalArgumentException("Menu item does not belong to this restaurant");
            }

            double itemTotal = menuItem.getPrice() * itemReq.getQuantity();
            total += itemTotal;

            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .menuItem(menuItem)
                    .quantity(itemReq.getQuantity())
                    .price(menuItem.getPrice())
                    .build();
            orderItems.add(orderItem);
        }

        savedOrder.setTotalAmount(total);
        savedOrder.setOrderItems(orderItems);
        Order finalOrder = orderRepository.save(savedOrder);

        return toResponse(finalOrder);
    }

    public List<OrderResponse> getUserOrders(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::toResponse).toList();
    }

    public List<OrderResponse> getRestaurantOrders(Long restaurantId) {
        return orderRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId)
                .stream().map(this::toResponse).toList();
    }

    public OrderResponse updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));
        order.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        return toResponse(orderRepository.save(order));
    }

    private OrderResponse toResponse(Order order) {
        List<OrderResponse.OrderItemResponse> items = order.getOrderItems().stream()
                .map(item -> OrderResponse.OrderItemResponse.builder()
                        .menuItemId(item.getMenuItem().getId())
                        .menuItemName(item.getMenuItem().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .restaurantId(order.getRestaurant().getId())
                .restaurantName(order.getRestaurant().getName())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(items)
                .build();
    }
}
