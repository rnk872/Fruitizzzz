/* ==================================================
   FRUITSHELL MEGA APP - PART 1
================================================== */

const STORAGE = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    load(key, defaultValue = []) {
        const data = localStorage.getItem(key);

        if (!data) return defaultValue;

        try {
            return JSON.parse(data);
        } catch {
            return defaultValue;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }
};

/* ==================================================
   DATABASE
================================================== */

const DB = {
    products: STORAGE.load("products", []),
    cart: STORAGE.load("cart", []),
    orders: STORAGE.load("orders", []),
    coupons: STORAGE.load("coupons", [
        {
            code: "WELCOME10",
            discount: 10
        },
        {
            code: "FRUIT20",
            discount: 20
        }
    ]),
    notifications: STORAGE.load("notifications", []),
    customers: STORAGE.load("customers", [])
};

/* ==================================================
   PRODUCT MANAGER
================================================== */

class ProductManager {

    add(product) {
        DB.products.push(product);

        STORAGE.save("products", DB.products);

        return product;
    }

    remove(id) {
        DB.products =
            DB.products.filter(p => p.id !== id);

        STORAGE.save("products", DB.products);
    }

    update(id, data) {

        const product =
            DB.products.find(p => p.id === id);

        if (!product) return;

        Object.assign(product, data);

        STORAGE.save("products", DB.products);
    }

    getAll() {
        return DB.products;
    }

    getById(id) {
        return DB.products.find(
            p => p.id === id
        );
    }

    search(keyword) {

        keyword = keyword.toLowerCase();

        return DB.products.filter(product =>
            product.name.toLowerCase()
            .includes(keyword)
        );
    }

    filter(category) {
        return DB.products.filter(
            p => p.category === category
        );
    }

}

const Products =
    new ProductManager();

/* ==================================================
   CART ENGINE
================================================== */

class CartEngine {

    add(productId, qty = 1) {

        const product =
            Products.getById(productId);

        if (!product) return;

        const existing =
            DB.cart.find(
                item => item.id === productId
            );

        if (existing) {
            existing.qty += qty;
        }
        else {

            DB.cart.push({
                ...product,
                qty
            });

        }

        STORAGE.save("cart", DB.cart);

        NotificationCenter.push(
            `${product.name} added to cart`
        );
    }

    remove(productId) {

        DB.cart =
            DB.cart.filter(
                item => item.id !== productId
            );

        STORAGE.save("cart", DB.cart);
    }

    updateQty(productId, qty) {

        const item =
            DB.cart.find(
                i => i.id === productId
            );

        if (!item) return;

        item.qty = qty;

        STORAGE.save("cart", DB.cart);
    }

    clear() {

        DB.cart = [];

        STORAGE.save("cart", DB.cart);
    }

    items() {
        return DB.cart;
    }

    subtotal() {

        return DB.cart.reduce(
            (sum, item) =>
                sum + item.price * item.qty,
            0
        );

    }

}

const Cart =
    new CartEngine();

/* ==================================================
   COUPON ENGINE
================================================== */

class CouponEngine {

    validate(code) {

        return DB.coupons.find(
            coupon =>
                coupon.code === code
        );

    }

}

const Coupons =
    new CouponEngine();

/* ==================================================
   REWARD SYSTEM
================================================== */

class RewardSystem {

    addPoints(customerId, orderAmount) {

        let customer =
            DB.customers.find(
                c => c.id === customerId
            );

        if (!customer) {

            customer = {
                id: customerId,
                points: 0
            };

            DB.customers.push(customer);
        }

        const earned =
            Math.floor(orderAmount / 10);

        customer.points += earned;

        STORAGE.save(
            "customers",
            DB.customers
        );

        return earned;
    }

    level(points) {

        if (points >= 5000)
            return "Gold";

        if (points >= 2000)
            return "Silver";

        return "Bronze";
    }

}

const Rewards =
    new RewardSystem();

/* ==================================================
   BILLING ENGINE
================================================== */

class BillingEngine {

    generate(couponCode = null) {

        let subtotal =
            Cart.subtotal();

        let discount = 0;

        if (couponCode) {

            const coupon =
                Coupons.validate(
                    couponCode
                );

            if (coupon) {

                discount =
                    subtotal *
                    coupon.discount /
                    100;

            }

        }

        const taxable =
            subtotal - discount;

        const gst =
            taxable * 0.18;

        const total =
            taxable + gst;

        return {
            subtotal,
            discount,
            gst,
            total
        };

    }

}

const Billing =
    new BillingEngine();

/* ==================================================
   ORDER HISTORY
================================================== */

class OrderHistory {

    create(customerId, couponCode) {

        const bill =
            Billing.generate(
                couponCode
            );

        const order = {

            id:
                "ORD-" +
                Date.now(),

            customerId,

            date:
                new Date()
                .toLocaleString(),

            items:
                [...DB.cart],

            bill

        };

        DB.orders.push(order);

        STORAGE.save(
            "orders",
            DB.orders
        );

        Rewards.addPoints(
            customerId,
            bill.total
        );

        Cart.clear();

        NotificationCenter.push(
            `Order ${order.id} created`
        );

        return order;
    }

    all() {
        return DB.orders;
    }

}

const Orders =
    new OrderHistory();

/* ==================================================
   NOTIFICATION CENTER
================================================== */

class NotificationSystem {

    push(message) {

        DB.notifications.unshift({

            message,

            time:
                new Date()
                .toLocaleString()

        });

        STORAGE.save(
            "notifications",
            DB.notifications
        );

        console.log(
            "[NOTIFICATION]",
            message
        );
    }

    all() {

        return DB.notifications;

    }

}

const NotificationCenter =
    new NotificationSystem();

/* ==================================================
   SAMPLE PRODUCTS
================================================== */

if (DB.products.length === 0) {

    Products.add({
        id: 1,
        name: "Mango Shell Ice Cream",
        category: "Fruit",
        price: 120
    });

    Products.add({
        id: 2,
        name: "Orange Shell Ice Cream",
        category: "Fruit",
        price: 110
    });

    Products.add({
        id: 3,
        name: "Pineapple Shell Ice Cream",
        category: "Premium",
        price: 150
    });

}

/* ==================================================
   TESTING
================================================== */

console.log(
    "FruitShell Mega App Part 1 Loaded"
);

window.Products = Products;
window.Cart = Cart;
window.Billing = Billing;
window.Orders = Orders;
window.Rewards = Rewards;
window.NotificationCenter =
    NotificationCenter;
