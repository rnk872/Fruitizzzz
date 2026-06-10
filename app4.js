/* ==================================================
   INVENTORY MANAGEMENT SYSTEM
================================================== */

class InventoryManager {

    constructor() {

        this.products =
            STORAGE.load("inventory", []);

    }

    addProduct(product) {

        const exists =
            this.products.find(
                p => p.id === product.id
            );

        if (exists) {
            exists.stock += product.stock;
        } else {
            this.products.push(product);
        }

        STORAGE.save("inventory", this.products);
    }

    updateStock(productId, qty) {

        const product =
            this.products.find(
                p => p.id === productId
            );

        if (!product) return false;

        product.stock += qty;

        if (product.stock < 0)
            product.stock = 0;

        STORAGE.save("inventory", this.products);

        return true;
    }

    lowStock(threshold = 5) {

        return this.products.filter(
            p => p.stock <= threshold
        );
    }

    all() {
        return this.products;
    }
}

const Inventory = new InventoryManager();


/* ==================================================
   STOCK ALERT SYSTEM
================================================== */

class StockAlerts {

    checkLowStock() {

        const lowItems =
            Inventory.lowStock();

        return lowItems.map(item => ({
            message: `${item.name} is low on stock`,
            stock: item.stock
        }));
    }

}

const Alerts = new StockAlerts();


/* ==================================================
   EMPLOYEE MANAGEMENT SYSTEM
================================================== */

class EmployeeSystem {

    constructor() {

        this.employees =
            STORAGE.load("employees", []);

    }

    add(employee) {

        employee.id = Date.now();
        employee.joined = new Date().toLocaleDateString();

        this.employees.push(employee);

        STORAGE.save("employees", this.employees);
    }

    remove(id) {

        this.employees =
            this.employees.filter(
                e => e.id !== id
            );

        STORAGE.save("employees", this.employees);
    }

    all() {
        return this.employees;
    }

}

const Employees = new EmployeeSystem();


/* ==================================================
   ATTENDANCE SYSTEM
================================================== */

class AttendanceSystem {

    constructor() {

        this.records =
            STORAGE.load("attendance", []);

    }

    mark(employeeId, status) {

        this.records.push({
            employeeId,
            status, // present / absent
            date: new Date().toLocaleDateString()
        });

        STORAGE.save("attendance", this.records);
    }

    getEmployeeRecords(employeeId) {

        return this.records.filter(
            r => r.employeeId === employeeId
        );
    }

}

const Attendance = new AttendanceSystem();


/* ==================================================
   SALARY MANAGEMENT SYSTEM
================================================== */

class SalarySystem {

    constructor() {

        this.payroll =
            STORAGE.load("salary", []);

    }

    setSalary(employeeId, amount) {

        const existing =
            this.payroll.find(
                p => p.employeeId === employeeId
            );

        if (existing) {
            existing.amount = amount;
        } else {
            this.payroll.push({
                employeeId,
                amount
            });
        }

        STORAGE.save("salary", this.payroll);
    }

    getSalary(employeeId) {

        const emp =
            this.payroll.find(
                p => p.employeeId === employeeId
            );

        return emp ? emp.amount : 0;
    }

}

const Salary = new SalarySystem();


/* ==================================================
   REVENUE TRACKING SYSTEM
================================================== */

class RevenueSystem {

    constructor() {

        this.sales =
            STORAGE.load("sales", []);

    }

    addSale(amount) {

        this.sales.push({
            amount,
            date: new Date().toLocaleDateString()
        });

        STORAGE.save("sales", this.sales);
    }

    totalRevenue() {

        return this.sales.reduce(
            (sum, s) => sum + s.amount,
            0
        );
    }

}

const Revenue = new RevenueSystem();


/* ==================================================
   EXPENSE TRACKING SYSTEM
================================================== */

class ExpenseSystem {

    constructor() {

        this.expenses =
            STORAGE.load("expenses", []);

    }

    addExpense(amount, reason) {

        this.expenses.push({
            amount,
            reason,
            date: new Date().toLocaleDateString()
        });

        STORAGE.save("expenses", this.expenses);
    }

    totalExpenses() {

        return this.expenses.reduce(
            (sum, e) => sum + e.amount,
            0
        );
    }

}

const Expenses = new ExpenseSystem();


/* ==================================================
   PROFIT CALCULATOR
================================================== */

class ProfitCalculator {

    getProfit() {

        return Revenue.totalRevenue() -
               Expenses.totalExpenses();
    }

}

const Profit = new ProfitCalculator();


/* ==================================================
   DAILY / MONTHLY REPORT SYSTEM
================================================== */

class ReportSystem {

    dailyReport() {

        return {
            revenue: Revenue.totalRevenue(),
            expenses: Expenses.totalExpenses(),
            profit: Profit.getProfit()
        };
    }

    monthlyReport() {

        // simple same logic placeholder
        return this.dailyReport();
    }

}

const Reports = new ReportSystem();


/* ==================================================
   OPERATIONS DASHBOARD
================================================== */

class OperationsDashboard {

    summary() {

        return {

            totalProducts:
                Inventory.all().length,

            lowStockItems:
                Alerts.checkLowStock(),

            totalEmployees:
                Employees.all().length,

            totalRevenue:
                Revenue.totalRevenue(),

            totalExpenses:
                Expenses.totalExpenses(),

            profit:
                Profit.getProfit()

        };
    }

}

const Dashboard = new OperationsDashboard();


/* ==================================================
   EXPORTS
================================================== */

window.Inventory = Inventory;
window.Alerts = Alerts;
window.Employees = Employees;
window.Attendance = Attendance;
window.Salary = Salary;
window.Revenue = Revenue;
window.Expenses = Expenses;
window.Profit = Profit;
window.Reports = Reports;
window.Dashboard = Dashboard;

console.log("FruitShell App4 Loaded - Operations Layer Ready");
