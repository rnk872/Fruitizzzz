/* ==================================================
   FRUITSHELL MEGA APP - PART 3
   CUSTOMER FEATURES
================================================== */

/* ==================================================
   THEME ENGINE
================================================== */

class ThemeEngine {

    constructor() {

        this.current =
            localStorage.getItem("theme")
            || "light";

        this.apply(this.current);
    }

    apply(theme) {

        document.body.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

        this.current = theme;
    }

    toggle() {

        if (this.current === "light") {
            this.apply("dark");
        } else {
            this.apply("light");
        }

    }

}

const Theme = new ThemeEngine();

/* ==================================================
   CUSTOMER ACCOUNT SYSTEM
================================================== */

class CustomerAccounts {

    constructor() {

        this.users =
            STORAGE.load(
                "users",
                []
            );

        this.currentUser =
            STORAGE.load(
                "currentUser",
                null
            );

    }

    register(
        name,
        email,
        password
    ) {

        const exists =
            this.users.find(
                user =>
                    user.email === email
            );

        if (exists) {

            return {
                success:false,
                message:
                "Email already exists"
            };

        }

        const user = {

            id:
                Date.now(),

            name,
            email,
            password,

            joined:
                new Date()
                .toLocaleDateString()

        };

        this.users.push(user);

        STORAGE.save(
            "users",
            this.users
        );

        return {
            success:true,
            user
        };

    }

    login(
        email,
        password
    ) {

        const user =
            this.users.find(
                u =>
                    u.email===email &&
                    u.password===password
            );

        if(!user){

            return false;

        }

        this.currentUser =
            user;

        STORAGE.save(
            "currentUser",
            user
        );

        return true;

    }

    logout() {

        this.currentUser = null;

        STORAGE.remove(
            "currentUser"
        );

    }

    getCurrentUser() {

        return this.currentUser;

    }

}

const Accounts =
    new CustomerAccounts();

/* ==================================================
   CUSTOMER PROFILE
================================================== */

class CustomerProfile {

    update(data) {

        const user =
            Accounts.getCurrentUser();

        if(!user) return;

        Object.assign(
            user,
            data
        );

        const index =
            Accounts.users.findIndex(
                u =>
                u.id === user.id
            );

        Accounts.users[index] =
            user;

        STORAGE.save(
            "users",
            Accounts.users
        );

        STORAGE.save(
            "currentUser",
            user
        );

    }

    details() {

        return Accounts
            .getCurrentUser();

    }

}

const Profile =
    new CustomerProfile();

/* ==================================================
   WISHLIST SYSTEM
================================================== */

class WishlistSystem {

    constructor() {

        this.items =
            STORAGE.load(
                "wishlist",
                []
            );

    }

    add(product) {

        const exists =
            this.items.find(
                item =>
                item.id===product.id
            );

        if(exists) return;

        this.items.push(product);

        STORAGE.save(
            "wishlist",
            this.items
        );

    }

    remove(productId) {

        this.items =
            this.items.filter(
                item =>
                item.id !== productId
            );

        STORAGE.save(
            "wishlist",
            this.items
        );

    }

    all() {

        return this.items;

    }

}

const Wishlist =
    new WishlistSystem();

/* ==================================================
   RECENTLY VIEWED PRODUCTS
================================================== */

class RecentlyViewed {

    constructor() {

        this.items =
            STORAGE.load(
                "recentlyViewed",
                []
            );

    }

    add(product) {

        this.items =
            this.items.filter(
                item =>
                item.id !== product.id
            );

        this.items.unshift(
            product
        );

        this.items =
            this.items.slice(0,10);

        STORAGE.save(
            "recentlyViewed",
            this.items
        );

    }

    getAll() {

        return this.items;

    }

}

const Viewed =
    new RecentlyViewed();

/* ==================================================
   REFERRAL SYSTEM
================================================== */

class ReferralSystem {

    constructor() {

        this.referrals =
            STORAGE.load(
                "referrals",
                []
            );

    }

    createCode(userId) {

        const code =
            "REF" +
            Math.floor(
                Math.random()*99999
            );

        this.referrals.push({

            userId,
            code,

            uses:0

        });

        STORAGE.save(
            "referrals",
            this.referrals
        );

        return code;

    }

    use(code) {

        const referral =
            this.referrals.find(
                r => r.code===code
            );

        if(!referral)
            return false;

        referral.uses++;

        STORAGE.save(
            "referrals",
            this.referrals
        );

        return true;

    }

}

const Referral =
    new ReferralSystem();

/* ==================================================
   LOYALTY DASHBOARD
================================================== */

class LoyaltyDashboard {

    getPoints(customerId) {

        const customer =
            DB.customers.find(
                c =>
                c.id===customerId
            );

        if(!customer)
            return 0;

        return customer.points;

    }

    getLevel(customerId) {

        const points =
            this.getPoints(
                customerId
            );

        return Rewards.level(
            points
        );

    }

    dashboard(customerId) {

        return {

            points:
                this.getPoints(
                    customerId
                ),

            level:
                this.getLevel(
                    customerId
                )

        };

    }

}

const Loyalty =
    new LoyaltyDashboard();

/* ==================================================
   CONTACT SYSTEM
================================================== */

class ContactSystem {

    constructor() {

        this.messages =
            STORAGE.load(
                "contactMessages",
                []
            );

    }

    send(
        name,
        email,
        subject,
        message
    ) {

        const data = {

            id:
                Date.now(),

            name,
            email,
            subject,
            message,

            date:
                new Date()
                .toLocaleString()

        };

        this.messages.push(
            data
        );

        STORAGE.save(
            "contactMessages",
            this.messages
        );

        return true;

    }

    allMessages() {

        return this.messages;

    }

}

const Contact =
    new ContactSystem();

/* ==================================================
   STORE LOCATOR MOCK
================================================== */

class StoreLocator {

    constructor() {

        this.stores = [

            {
                city:"Delhi",
                state:"Delhi"
            },

            {
                city:"Mumbai",
                state:"Maharashtra"
            },

            {
                city:"Bangalore",
                state:"Karnataka"
            },

            {
                city:"Patna",
                state:"Bihar"
            }

        ];

    }

    all() {

        return this.stores;

    }

    search(city) {

        return this.stores.filter(
            store =>
            store.city
            .toLowerCase()
            .includes(
                city.toLowerCase()
            )
        );

    }

}

const Stores =
    new StoreLocator();

/* ==================================================
   EXPORTS
================================================== */

window.Theme = Theme;
window.Accounts = Accounts;
window.Profile = Profile;
window.Wishlist = Wishlist;
window.Viewed = Viewed;
window.Referral = Referral;
window.Loyalty = Loyalty;
window.Contact = Contact;
window.Stores = Stores;

console.log(
    "FruitShell App3 Loaded"
);
