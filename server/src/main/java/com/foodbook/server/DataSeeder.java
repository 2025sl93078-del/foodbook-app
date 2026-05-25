package com.foodbook.server;

import com.foodbook.server.entity.MenuItem;
import com.foodbook.server.entity.Restaurant;
import com.foodbook.server.entity.User;
import com.foodbook.server.enums.Role;
import com.foodbook.server.repository.MenuItemRepository;
import com.foodbook.server.repository.RestaurantRepository;
import com.foodbook.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedRestaurants();
    }

    private void seedUsers() {
        if (userRepository.count() > 0) return;
        userRepository.save(User.builder().name("Admin User").email("admin@foodbook.com")
                .passwordHash(passwordEncoder.encode("admin123")).role(Role.ADMIN).build());
        userRepository.save(User.builder().name("John Doe").email("user@foodbook.com")
                .passwordHash(passwordEncoder.encode("user123")).role(Role.USER).build());
        log.info("Seeded users");
    }

    private Restaurant seed(Restaurant.RestaurantBuilder builder) {
        Restaurant r = builder.build();
        return restaurantRepository.findByName(r.getName()).orElseGet(() -> restaurantRepository.save(r));
    }

    private void item(Restaurant r, String name, String desc, double price, String cat, String img) {
        if (menuItemRepository.findByRestaurantIdAndName(r.getId(), name).isPresent()) return;
        menuItemRepository.save(MenuItem.builder()
                .restaurant(r).name(name).description(desc).price(price)
                .category(cat).imageUrl(img).isAvailable(true).build());
    }

    private void seedRestaurants() {
        // ── Italian ────────────────────────────────────────────────────────────
        Restaurant italian = seed(Restaurant.builder()
                .name("La Piazza Italiana").location("123 Main Street, Downtown").cuisine("Italian")
                .description("Authentic Italian cuisine in a warm, cozy atmosphere. Our pasta is made fresh daily.")
                .rating(4.7).priceRange("$$").openingHours("Mon–Sun: 11:00 AM – 10:00 PM").phoneNumber("+1 555-0101")
                .imageUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"));
        item(italian, "Margherita Pizza", "Classic tomato, mozzarella, and basil", 14.99, "Pizza", "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop");
        item(italian, "Pepperoni Pizza", "Rich tomato sauce with pepperoni and cheese", 16.99, "Pizza", "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop");
        item(italian, "Four Cheese Pizza", "Mozzarella, gorgonzola, parmesan, ricotta", 17.99, "Pizza", "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop");
        item(italian, "Spaghetti Carbonara", "Creamy pasta with pancetta and parmesan", 17.50, "Pasta", "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&auto=format&fit=crop");
        item(italian, "Penne Arrabbiata", "Spicy tomato sauce with garlic and chili", 15.50, "Pasta", "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&auto=format&fit=crop");
        item(italian, "Fettuccine Alfredo", "Silky butter and parmesan cream sauce", 16.50, "Pasta", "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&auto=format&fit=crop");
        item(italian, "Lasagne Bolognese", "Layers of pasta, rich meat ragu, béchamel", 18.50, "Pasta", "https://images.unsplash.com/photo-1619895092538-128341789043?w=400&auto=format&fit=crop");
        item(italian, "Bruschetta", "Toasted bread with fresh tomato and basil", 9.00, "Starters", "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&auto=format&fit=crop");
        item(italian, "Calamari Fritti", "Crispy fried squid rings with marinara sauce", 12.50, "Starters", "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&auto=format&fit=crop");
        item(italian, "Tiramisu", "Classic Italian dessert with espresso and mascarpone", 8.50, "Dessert", "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop");
        item(italian, "Panna Cotta", "Vanilla cream with berry coulis", 7.50, "Dessert", "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop");
        item(italian, "Sparkling Water", "Chilled San Pellegrino 500ml", 3.50, "Drinks", "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&auto=format&fit=crop");
        item(italian, "Italian Espresso", "Rich, dark double espresso shot", 3.50, "Drinks", "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop");

        // ── Japanese ───────────────────────────────────────────────────────────
        Restaurant japanese = seed(Restaurant.builder()
                .name("Sakura Sushi").location("456 Oak Avenue, Midtown").cuisine("Japanese")
                .description("Premium sushi and Japanese cuisine crafted by master chefs using the freshest ingredients.")
                .rating(4.9).priceRange("$$$").openingHours("Mon–Sun: 12:00 PM – 11:00 PM").phoneNumber("+1 555-0202")
                .imageUrl("https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop"));
        item(japanese, "Salmon Nigiri (2pc)", "Fresh Atlantic salmon on seasoned rice", 8.50, "Nigiri", "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&auto=format&fit=crop");
        item(japanese, "Tuna Nigiri (2pc)", "Premium bluefin tuna on seasoned rice", 9.50, "Nigiri", "https://images.unsplash.com/photo-1617196034096-6b5b17ee52f2?w=400&auto=format&fit=crop");
        item(japanese, "Yellowtail Nigiri (2pc)", "Buttery yellowtail on seasoned rice", 9.00, "Nigiri", "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&auto=format&fit=crop");
        item(japanese, "Dragon Roll", "Shrimp tempura, avocado, cucumber topped with eel", 16.00, "Rolls", "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&auto=format&fit=crop");
        item(japanese, "Spicy Tuna Roll", "Fresh tuna with spicy mayo and cucumber", 13.50, "Rolls", "https://images.unsplash.com/photo-1617196034099-21b8b8e7a30e?w=400&auto=format&fit=crop");
        item(japanese, "California Roll", "Crab, avocado, cucumber, sesame seeds", 11.00, "Rolls", "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&auto=format&fit=crop");
        item(japanese, "Rainbow Roll", "California roll topped with assorted sashimi", 17.50, "Rolls", "https://images.unsplash.com/photo-1617196034226-39adfbe9a0ab?w=400&auto=format&fit=crop");
        item(japanese, "Ramen Tonkotsu", "Rich pork broth with noodles, chashu, and soft egg", 18.00, "Ramen", "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&auto=format&fit=crop");
        item(japanese, "Spicy Miso Ramen", "Spicy miso broth, corn, butter, bamboo shoots", 17.00, "Ramen", "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&auto=format&fit=crop");
        item(japanese, "Chicken Katsu Curry", "Crispy panko chicken with Japanese curry and rice", 16.50, "Mains", "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&auto=format&fit=crop");
        item(japanese, "Teriyaki Salmon Bowl", "Grilled teriyaki salmon over steamed rice with pickled ginger", 17.50, "Mains", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop");
        item(japanese, "Edamame", "Steamed soybeans with sea salt", 5.50, "Starters", "https://images.unsplash.com/photo-1617196034294-d4e307dcfe6d?w=400&auto=format&fit=crop");
        item(japanese, "Gyoza (6pc)", "Pan-fried pork and cabbage dumplings", 8.50, "Starters", "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400&auto=format&fit=crop");
        item(japanese, "Mochi Ice Cream", "Assorted mochi with green tea, strawberry, mango", 9.00, "Dessert", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop");
        item(japanese, "Matcha Cheesecake", "Creamy cheesecake with a rich matcha swirl", 8.50, "Dessert", "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop");
        item(japanese, "Green Tea", "Hot brewed sencha green tea", 4.00, "Drinks", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop");
        item(japanese, "Yuzu Lemonade", "Refreshing sparkling lemonade with Japanese yuzu citrus", 5.50, "Drinks", "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&auto=format&fit=crop");

        // ── Indian ─────────────────────────────────────────────────────────────
        Restaurant indian = seed(Restaurant.builder()
                .name("Spice Garden").location("789 Elm Road, East Side").cuisine("Indian")
                .description("Vibrant Indian flavors with authentic spices and traditional recipes passed down generations.")
                .rating(4.6).priceRange("$$").openingHours("Mon–Sun: 11:30 AM – 10:30 PM").phoneNumber("+1 555-0303")
                .imageUrl("https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop"));
        item(indian, "Butter Chicken", "Tender chicken in a rich, creamy tomato sauce", 16.99, "Mains", "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop");
        item(indian, "Palak Paneer", "Cottage cheese cubes in a spiced spinach gravy", 15.50, "Mains", "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop");
        item(indian, "Chicken Tikka Masala", "Grilled chicken in a smoky, spiced tomato cream sauce", 17.50, "Mains", "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop");
        item(indian, "Dal Makhani", "Slow-cooked black lentils with butter and cream", 14.50, "Mains", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop");
        item(indian, "Lamb Biryani", "Fragrant basmati rice with slow-cooked spiced lamb", 18.99, "Rice", "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&auto=format&fit=crop");
        item(indian, "Vegetable Biryani", "Aromatic basmati rice with seasonal vegetables", 14.99, "Rice", "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop");
        item(indian, "Paneer Tikka", "Marinated cottage cheese grilled in tandoor", 14.50, "Starters", "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop");
        item(indian, "Samosa (2pc)", "Crispy pastry filled with spiced potato and peas", 7.50, "Starters", "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=400&auto=format&fit=crop");
        item(indian, "Garlic Naan", "Soft leavened bread with garlic and butter", 4.50, "Bread", "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop");
        item(indian, "Peshwari Naan", "Sweet naan filled with coconut and almonds", 5.00, "Bread", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop");
        item(indian, "Mango Lassi", "Refreshing yogurt drink blended with Alphonso mangoes", 5.99, "Drinks", "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&auto=format&fit=crop");
        item(indian, "Masala Chai", "Spiced Indian tea brewed with milk", 3.99, "Drinks", "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&auto=format&fit=crop");
        item(indian, "Gulab Jamun", "Soft milk-solid dumplings soaked in rose syrup", 7.50, "Dessert", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop");
        item(indian, "Kulfi", "Traditional Indian ice cream with pistachio and saffron", 6.50, "Dessert", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop");

        // ── American ───────────────────────────────────────────────────────────
        Restaurant american = seed(Restaurant.builder()
                .name("The Burger House").location("321 Pine Blvd, Westside").cuisine("American")
                .description("Hand-crafted gourmet burgers and craft beers. All our beef is locally sourced and freshly ground.")
                .rating(4.4).priceRange("$").openingHours("Mon–Sun: 10:00 AM – 11:00 PM").phoneNumber("+1 555-0404")
                .imageUrl("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop"));
        item(american, "Classic Cheeseburger", "Beef patty, cheddar, lettuce, tomato, pickles, special sauce", 12.99, "Burgers", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop");
        item(american, "BBQ Bacon Burger", "Smoky BBQ sauce, crispy bacon, caramelized onions", 15.99, "Burgers", "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop");
        item(american, "Mushroom Swiss Burger", "Sautéed mushrooms, Swiss cheese, garlic aioli", 14.99, "Burgers", "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&auto=format&fit=crop");
        item(american, "Double Smash Burger", "Two smashed patties, American cheese, secret sauce", 16.99, "Burgers", "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop");
        item(american, "Crispy Chicken Sandwich", "Fried chicken breast, coleslaw, hot sauce, brioche bun", 13.99, "Sandwiches", "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&auto=format&fit=crop");
        item(american, "BLT Club", "Bacon, lettuce, tomato, turkey, mayo on toasted sourdough", 12.50, "Sandwiches", "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop");
        item(american, "Loaded Fries", "Crispy fries with cheese sauce, bacon, jalapeños", 9.99, "Sides", "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop");
        item(american, "Onion Rings", "Beer-battered golden onion rings with dipping sauce", 6.99, "Sides", "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&auto=format&fit=crop");
        item(american, "Mac & Cheese Bites", "Crispy fried mac and cheese bites with ranch dip", 8.50, "Sides", "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400&auto=format&fit=crop");
        item(american, "Chocolate Milkshake", "Thick and creamy hand-spun chocolate milkshake", 7.50, "Drinks", "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&auto=format&fit=crop");
        item(american, "Vanilla Milkshake", "Classic vanilla bean milkshake with whipped cream", 7.50, "Drinks", "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop");
        item(american, "Craft Lemonade", "Freshly squeezed lemonade with mint and ice", 4.99, "Drinks", "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&auto=format&fit=crop");
        item(american, "New York Cheesecake", "Dense, creamy cheesecake with strawberry topping", 8.50, "Dessert", "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop");
        item(american, "Brownie Sundae", "Warm chocolate brownie with vanilla ice cream and hot fudge", 8.99, "Dessert", "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&auto=format&fit=crop");

        // ── Mexican ────────────────────────────────────────────────────────────
        Restaurant mexican = seed(Restaurant.builder()
                .name("Casa Mexicana").location("55 Sunset Drive, South Quarter").cuisine("Mexican")
                .description("Bold, vibrant Mexican street food and classics made with fresh ingredients and house-made salsas.")
                .rating(4.5).priceRange("$").openingHours("Mon–Sun: 11:00 AM – 10:30 PM").phoneNumber("+1 555-0505")
                .imageUrl("https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop"));
        item(mexican, "Carne Asada Tacos (3pc)", "Grilled beef, onion, cilantro, salsa verde on corn tortillas", 13.99, "Tacos", "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&auto=format&fit=crop");
        item(mexican, "Chicken Tacos (3pc)", "Grilled chicken, guacamole, pico de gallo", 12.99, "Tacos", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop");
        item(mexican, "Fish Tacos (3pc)", "Beer-battered cod, cabbage slaw, chipotle mayo", 14.50, "Tacos", "https://images.unsplash.com/photo-1512838243191-e81168acc6e8?w=400&auto=format&fit=crop");
        item(mexican, "Beef Burrito", "Seasoned beef, rice, beans, cheese, sour cream wrapped in a flour tortilla", 13.50, "Burritos", "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&auto=format&fit=crop");
        item(mexican, "Veggie Burrito", "Grilled peppers, black beans, corn, guacamole, salsa", 11.99, "Burritos", "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&auto=format&fit=crop");
        item(mexican, "Chicken Quesadilla", "Grilled chicken, melted cheese, peppers in a toasted tortilla", 12.50, "Quesadillas", "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&auto=format&fit=crop");
        item(mexican, "Cheese & Jalapeño Quesadilla", "Melted three-cheese blend with pickled jalapeños", 10.50, "Quesadillas", "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=400&auto=format&fit=crop");
        item(mexican, "Nachos Grande", "Tortilla chips, melted cheese, jalapeños, sour cream, guacamole, salsa", 11.99, "Starters", "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&auto=format&fit=crop");
        item(mexican, "Guacamole & Chips", "Freshly made guacamole with crispy tortilla chips", 8.50, "Starters", "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&auto=format&fit=crop");
        item(mexican, "Elote (Corn on the Cob)", "Grilled corn with mayo, cotija cheese, chili, lime", 6.50, "Sides", "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop");
        item(mexican, "Mexican Rice & Beans", "Cilantro rice with seasoned black beans", 5.50, "Sides", "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&fit=crop");
        item(mexican, "Horchata", "Chilled rice milk with cinnamon and vanilla", 4.99, "Drinks", "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&auto=format&fit=crop");
        item(mexican, "Margarita (Virgin)", "Lime juice, orange, agave, salt rim", 6.50, "Drinks", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop");
        item(mexican, "Churros", "Fried dough sticks with cinnamon sugar and chocolate dip", 7.99, "Dessert", "https://images.unsplash.com/photo-1624374908864-cdbaf8de6c8f?w=400&auto=format&fit=crop");
        item(mexican, "Tres Leches Cake", "Light sponge soaked in three milks, topped with whipped cream", 7.50, "Dessert", "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop");

        // ── Chinese ────────────────────────────────────────────────────────────
        Restaurant chinese = seed(Restaurant.builder()
                .name("Golden Dragon").location("88 Chinatown Lane, Old Town").cuisine("Chinese")
                .description("Traditional Cantonese and Sichuan dishes made with time-honoured recipes and the finest ingredients.")
                .rating(4.5).priceRange("$$").openingHours("Mon–Sun: 11:00 AM – 10:30 PM").phoneNumber("+1 555-0606")
                .imageUrl("https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop"));
        item(chinese, "Kung Pao Chicken", "Diced chicken with peanuts, chili, and Sichuan pepper", 15.99, "Mains", "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop");
        item(chinese, "Sweet & Sour Pork", "Crispy pork in a tangy pineapple sweet and sour sauce", 15.50, "Mains", "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop");
        item(chinese, "Mapo Tofu", "Silken tofu in a spicy Sichuan bean sauce with pork mince", 14.50, "Mains", "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&auto=format&fit=crop");
        item(chinese, "Beef with Broccoli", "Tender beef strips, broccoli florets, oyster sauce", 16.50, "Mains", "https://images.unsplash.com/photo-1561184272-2a4d45570f18?w=400&auto=format&fit=crop");
        item(chinese, "Yangzhou Fried Rice", "Wok-fried rice with shrimp, pork, egg, and vegetables", 12.99, "Rice & Noodles", "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop");
        item(chinese, "Beef Chow Mein", "Stir-fried noodles with beef, bean sprouts, and spring onion", 14.50, "Rice & Noodles", "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop");
        item(chinese, "Dim Sum Platter (8pc)", "Assorted har gow, siu mai, and char siu bao", 14.99, "Dim Sum", "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop");
        item(chinese, "Steamed BBQ Pork Buns (3pc)", "Fluffy steamed bao filled with sweet barbecue pork", 9.50, "Dim Sum", "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop");
        item(chinese, "Spring Rolls (4pc)", "Crispy rolls filled with vegetables and glass noodles", 8.50, "Starters", "https://images.unsplash.com/photo-1607321406149-53c2f8a92f8d?w=400&auto=format&fit=crop");
        item(chinese, "Wonton Soup", "Delicate pork and prawn wontons in a clear broth", 9.50, "Starters", "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop");
        item(chinese, "Jasmine Tea (pot)", "Fragrant hot jasmine tea for two", 5.00, "Drinks", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop");
        item(chinese, "Oolong Bubble Tea", "Classic milk tea with tapioca pearls", 6.50, "Drinks", "https://images.unsplash.com/photo-1558857728-8f79c4d29c68?w=400&auto=format&fit=crop");
        item(chinese, "Mango Pudding", "Silky smooth mango pudding with evaporated milk", 6.50, "Dessert", "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop");
        item(chinese, "Sesame Balls (3pc)", "Deep-fried glutinous rice balls filled with red bean paste", 7.50, "Dessert", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop");

        // ── Thai ───────────────────────────────────────────────────────────────
        Restaurant thai = seed(Restaurant.builder()
                .name("Bangkok Street").location("12 Orchid Lane, Riverside").cuisine("Thai")
                .description("Vibrant Thai street food and authentic classics bursting with lemongrass, basil, and coconut.")
                .rating(4.8).priceRange("$$").openingHours("Mon–Sun: 12:00 PM – 10:00 PM").phoneNumber("+1 555-0707")
                .imageUrl("https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&auto=format&fit=crop"));
        item(thai, "Pad Thai", "Stir-fried rice noodles with shrimp, egg, peanuts, bean sprouts", 15.99, "Noodles", "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&auto=format&fit=crop");
        item(thai, "Pad See Ew", "Wide rice noodles stir-fried with egg, Chinese broccoli, and beef", 15.50, "Noodles", "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&auto=format&fit=crop");
        item(thai, "Green Curry", "Creamy green curry with chicken, Thai basil, and jasmine rice", 16.50, "Curries", "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&auto=format&fit=crop");
        item(thai, "Red Curry", "Rich red curry with beef, bamboo shoots, and coconut milk", 16.50, "Curries", "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&auto=format&fit=crop");
        item(thai, "Massaman Curry", "Mild, nutty curry with potato, peanut, and slow-braised lamb", 18.00, "Curries", "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&auto=format&fit=crop");
        item(thai, "Tom Yum Soup", "Spicy and sour prawn soup with lemongrass and kaffir lime", 12.50, "Starters", "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop");
        item(thai, "Som Tum (Papaya Salad)", "Shredded green papaya, chili, lime, peanuts, fish sauce", 10.50, "Starters", "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&auto=format&fit=crop");
        item(thai, "Chicken Satay (4pc)", "Grilled chicken skewers with peanut dipping sauce", 11.50, "Starters", "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&auto=format&fit=crop");
        item(thai, "Mango Sticky Rice", "Sweet sticky rice with fresh mango and coconut cream", 8.50, "Dessert", "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop");
        item(thai, "Coconut Ice Cream", "Homemade coconut ice cream with roasted peanuts and sticky rice", 7.50, "Dessert", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop");
        item(thai, "Thai Iced Tea", "Sweet, creamy iced tea with condensed milk", 5.50, "Drinks", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop");
        item(thai, "Fresh Coconut Water", "Chilled young coconut water", 5.00, "Drinks", "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&auto=format&fit=crop");

        // ── Mediterranean ──────────────────────────────────────────────────────
        Restaurant mediterranean = seed(Restaurant.builder()
                .name("The Olive Branch").location("200 Harbour View, Northside").cuisine("Mediterranean")
                .description("Fresh, sun-kissed Mediterranean dishes inspired by Greece, Lebanon, and Turkey.")
                .rating(4.7).priceRange("$$").openingHours("Tue–Sun: 12:00 PM – 10:00 PM").phoneNumber("+1 555-0808")
                .imageUrl("https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop"));
        item(mediterranean, "Lamb Kofta", "Spiced minced lamb skewers with tzatziki and pita", 17.50, "Mains", "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&auto=format&fit=crop");
        item(mediterranean, "Chicken Shawarma Plate", "Slow-roasted chicken with garlic sauce, pickles, and rice", 16.50, "Mains", "https://images.unsplash.com/photo-1561304559-e11c40f8a0ba?w=400&auto=format&fit=crop");
        item(mediterranean, "Grilled Sea Bass", "Whole sea bass with lemon, olive oil, and herbs", 22.00, "Mains", "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&auto=format&fit=crop");
        item(mediterranean, "Falafel Bowl", "Crispy falafel, hummus, tabbouleh, pita, and pickles", 14.99, "Mains", "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&auto=format&fit=crop");
        item(mediterranean, "Mezze Platter", "Hummus, baba ghanoush, tzatziki, falafel, pita, olives", 18.00, "Starters", "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop");
        item(mediterranean, "Greek Salad", "Tomato, cucumber, red onion, feta, kalamata olives", 11.50, "Starters", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop");
        item(mediterranean, "Spanakopita", "Flaky filo pastry filled with spinach and feta", 9.50, "Starters", "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop");
        item(mediterranean, "Garlic Pita Bread", "Warm pita brushed with garlic-herb butter", 4.50, "Sides", "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop");
        item(mediterranean, "Tabbouleh Salad", "Finely chopped parsley, bulgur wheat, tomato, lemon, olive oil", 8.50, "Sides", "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&auto=format&fit=crop");
        item(mediterranean, "Baklava (3pc)", "Layers of filo, walnuts, and honey syrup", 8.50, "Dessert", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop");
        item(mediterranean, "Kunafa", "Shredded wheat pastry with sweet cheese and rose-water syrup", 9.00, "Dessert", "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop");
        item(mediterranean, "Turkish Coffee", "Strong, unfiltered coffee served with Turkish delight", 5.00, "Drinks", "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&auto=format&fit=crop");
        item(mediterranean, "Fresh Mint Lemonade", "Blended lemon and fresh mint over crushed ice", 5.50, "Drinks", "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&auto=format&fit=crop");

        log.info("Seeded {} restaurants total", restaurantRepository.count());
    }
}
