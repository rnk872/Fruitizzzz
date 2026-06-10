/* ==================================================
   FRUITSHELL MEGA APP - PART 2
================================================== */

/* ==================================================
   ANALYTICS DASHBOARD
================================================== */

class AnalyticsDashboard {

    totalRevenue() {

        return DB.orders.reduce(
            (sum, order) =>
                sum + order.bill.total,
            0
        );

    }

    totalOrders() {

        return DB.orders.length;

    }

    averageOrderValue() {

        if (DB.orders.length === 0)
            return 0;

        return (
            this.totalRevenue() /
            DB.orders.length
        ).toFixed(2);

    }

    topProducts() {

        const stats = {};

        DB.orders.forEach(order => {

            order.items.forEach(item => {

                if (!stats[item.name]) {

                    stats[item.name] = 0;

                }

                stats[item.name] += item.qty;

            });

        });

        return Object.entries(stats)
            .sort((a,b)=>b[1]-a[1]);

    }

    report() {

        return {

            revenue:
                this.totalRevenue(),

            orders:
                this.totalOrders(),

            avgOrder:
                this.averageOrderValue(),

            topProducts:
                this.topProducts()

        };

    }

}

const Analytics =
    new AnalyticsDashboard();

/* ==================================================
   INVESTOR DASHBOARD
================================================== */

class InvestorDashboard {

    constructor() {

        this.investors =
            STORAGE.load(
                "investors",
                []
            );

    }

    addInvestor(data) {

        this.investors.push(data);

        STORAGE.save(
            "investors",
            this.investors
        );

    }

    totalInvestment() {

        return this.investors.reduce(
            (sum,i)=>
                sum + i.amount,
            0
        );

    }

    calculateROI() {

        const investment =
            this.totalInvestment();

        const revenue =
            Analytics.totalRevenue();

        if (investment === 0)
            return 0;

        return (
            (
                revenue -
                investment
            )
            /
            investment
        ) * 100;

    }

    summary() {

        return {

            investors:
                this.investors.length,

            investment:
                this.totalInvestment(),

            roi:
                this.calculateROI()
                    .toFixed(2) + "%"

        };

    }

}

const Investors =
    new InvestorDashboard();

/* ==================================================
   FRANCHISE DASHBOARD
================================================== */

class FranchiseDashboard {

    constructor() {

        this.franchises =
            STORAGE.load(
                "franchises",
                []
            );

    }

    add(data) {

        this.franchises.push(data);

        STORAGE.save(
            "franchises",
            this.franchises
        );

    }

    total() {

        return this.franchises.length;

    }

    active() {

        return this.franchises.filter(
            f => f.active
        ).length;

    }

    summary() {

        return {

            total:
                this.total(),

            active:
                this.active()

        };

    }

}

const Franchise =
    new FranchiseDashboard();

/* ==================================================
   REVIEW SYSTEM
================================================== */

class ReviewSystem {

    addReview(
        productId,
        user,
        rating,
        comment
    ) {

        DB.reviews.push({

            id:
                Date.now(),

            productId,

            user,

            rating,

            comment,

            date:
                new Date()
                .toLocaleDateString()

        });

        STORAGE.save(
            "reviews",
            DB.reviews
        );

    }

    getReviews(productId) {

        return DB.reviews.filter(
            review =>
                review.productId
                === productId
        );

    }

    averageRating(productId) {

        const reviews =
            this.getReviews(
                productId
            );

        if (
            reviews.length === 0
        ) return 0;

        const total =
            reviews.reduce(
                (sum,r)=>
                    sum + r.rating,
                0
            );

        return (
            total /
            reviews.length
        ).toFixed(1);

    }

}

const Reviews =
    new ReviewSystem();

/* ==================================================
   RECOMMENDATION ENGINE
================================================== */

class RecommendationEngine {

    recommend() {

        const products =
            [...DB.products];

        return products
            .sort(
                ()=>Math.random()-0.5
            )
            .slice(0,4);

    }

    premiumProducts() {

        return DB.products.filter(
            p => p.price >= 150
        );

    }

}

const Recommendations =
    new RecommendationEngine();

/* ==================================================
   SMART MIX GENERATOR
================================================== */

class SmartMixGenerator {

    generate() {

        const fruits = [

            "Mango",
            "Orange",
            "Kiwi",
            "Pineapple",
            "Strawberry",
            "Banana",
            "Dragon Fruit",
            "Litchi"

        ];

        return fruits
            .sort(
                ()=>Math.random()-0.5
            )
            .slice(0,3)
            .join(" + ");

    }

}

const SmartMix =
    new SmartMixGenerator();

/* ==================================================
   SEASONAL PRODUCTS
================================================== */

class SeasonalProducts {

    getCurrentSeason() {

        const month =
            new Date()
            .getMonth() + 1;

        if (
            month >= 3 &&
            month <= 6
        ) return "Summer";

        if (
            month >= 7 &&
            month <= 10
        ) return "Monsoon";

        return "Winter";

    }

    products() {

        const season =
            this.getCurrentSeason();

        if (
            season === "Summer"
        ) {

            return [

                "Mango Blast",
                "Watermelon Chill",
                "Orange Crush"

            ];

        }

        if (
            season === "Monsoon"
        ) {

            return [

                "Pineapple Punch",
                "Kiwi Fusion"

            ];

        }

        return [

            "Dry Fruit Cream",
            "Chocolate Nut Ice Cream"

        ];

    }

}

const Seasonal =
    new SeasonalProducts();

/* ==================================================
   OFFER SYSTEM
================================================== */

class OfferSystem {

    constructor() {

        this.offers =
            STORAGE.load(
                "offers",
                []
            );

    }

    addOffer(
        title,
        discount
    ) {

        this.offers.push({

            id:
                Date.now(),

            title,

            discount

        });

        STORAGE.save(
            "offers",
            this.offers
        );

    }

    allOffers() {

        return this.offers;

    }

}

const Offers =
    new OfferSystem();

/* ==================================================
   STARTUP STATISTICS
================================================== */

class StartupStatistics {

    data() {

        return {

            products:
                DB.products.length,

            customers:
                DB.customers.length,

            orders:
                DB.orders.length,

            reviews:
                DB.reviews.length,

            revenue:
                Analytics.totalRevenue(),

            franchises:
                Franchise.total()

        };

    }

}

const Stats =
    new StartupStatistics();

/* ==================================================
   FAKE SALES ENGINE
================================================== */

class FakeSalesEngine {

    generate(count=10) {

        for(
            let i=0;
            i<count;
            i++
        ) {

            const amount =
                Math.floor(
                    Math.random()*500
                ) + 100;

            DB.orders.push({

                id:
                    "FAKE-" +
                    Date.now() +
                    i,

                date:
                    new Date()
                    .toLocaleString(),

                items:[],

                bill:{
                    total:amount
                }

            });

        }

        STORAGE.save(
            "orders",
            DB.orders
        );

        NotificationCenter.push(
            count +
            " demo sales generated"
        );

    }

}

const FakeSales =
    new FakeSalesEngine();

/* ==================================================
   EXPORT TO WINDOW
================================================== */

window.Analytics =
    Analytics;

window.Investors =
    Investors;

window.Franchise =
    Franchise;

window.Reviews =
    Reviews;

window.Recommendations =
    Recommendations;

window.SmartMix =
    SmartMix;

window.Seasonal =
    Seasonal;

window.Offers =
    Offers;

window.Stats =
    Stats;

window.FakeSales =
    FakeSales;

console.log(
    "FruitShell Mega App Part 2 Loaded"
);
