<?php
// analytics.php - VISUALIZATION & REPORTING DASHBOARD
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Link this with the database 
$db_config = [
    'host' => 'localhost',
    'username' => 'your_db_username',
    'password' => 'your_db_password', 
    'database' => 'smart_expense_tracker'
];

// Function to connect to database and fetch analytics data
function getAnalyticsData($config) {
    try {
        // Database connection
        $pdo = new PDO(
            "mysql:host={$config['host']};dbname={$config['database']};charset=utf8mb4",
            $config['username'], 
            $config['password'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        
        // 1. Monthly spending data
        $monthlyQuery = "
            SELECT 
                MONTH(expense_date) as month, 
                YEAR(expense_date) as year, 
                SUM(amount) as total_spending 
            FROM expenses 
            WHERE YEAR(expense_date) = YEAR(CURDATE()) 
            GROUP BY YEAR(expense_date), MONTH(expense_date) 
            ORDER BY year, month
        ";
        $monthlyStmt = $pdo->query($monthlyQuery);
        $monthlyData = $monthlyStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // 2. Category spending data  
        $categoryQuery = "
            SELECT 
                c.category_name as category, 
                SUM(e.amount) as total_amount 
            FROM expenses e 
            JOIN categories c ON e.category_id = c.category_id 
            WHERE YEAR(e.expense_date) = YEAR(CURDATE())
            GROUP BY c.category_name 
            ORDER BY total_amount DESC
        ";
        $categoryStmt = $pdo->query($categoryQuery);
        $categoryData = $categoryStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // 3. Recent transactions
        $recentQuery = "
            SELECT 
                e.description, 
                e.amount, 
                e.expense_date as date, 
                c.category_name as category,
                c.color_code as color
            FROM expenses e 
            JOIN categories c ON e.category_id = c.category_id 
            ORDER BY e.expense_date DESC 
            LIMIT 8
        ";
        $recentStmt = $pdo->query($recentQuery);
        $recentData = $recentStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // 4. Budget vs actual (if budgets table exists)
        $budgetQuery = "
            SELECT 
                c.category_name as category, 
                COALESCE(SUM(e.amount), 0) as actual_spending,
                COALESCE(b.budget_amount, 0) as budget_amount
            FROM categories c
            LEFT JOIN expenses e ON c.category_id = e.category_id 
                AND MONTH(e.expense_date) = MONTH(CURDATE())
                AND YEAR(e.expense_date) = YEAR(CURDATE())
            LEFT JOIN budgets b ON c.category_id = b.category_id 
                AND MONTH(b.budget_month) = MONTH(CURDATE())
                AND YEAR(b.budget_month) = YEAR(CURDATE())
            GROUP BY c.category_id, c.category_name, b.budget_amount
            HAVING budget_amount > 0
        ";
        
        $budgetData = [];
        try {
            $budgetStmt = $pdo->query($budgetQuery);
            $budgetData = $budgetStmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            // Budgets table might not exist yet
            $budgetData = [];
        }
        
        return [
            'monthly' => $monthlyData,
            'categories' => $categoryData,
            'recent' => $recentData,
            'budget' => $budgetData,
            'connection_status' => 'connected'
        ];
        
    } catch (PDOException $e) {
        // Return empty data if database connection fails
        return [
            'monthly' => [],
            'categories' => [],
            'recent' => [],
            'budget' => [],
            'connection_status' => 'disconnected',
            'error' => $e->getMessage()
        ];
    }
}

// Get data from database
$data = getAnalyticsData($db_config);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Analytics - Smart Expense Tracker</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary: #4361ee;
            --secondary: #3f37c9;
            --success: #4cc9f0;
            --danger: #f72585;
            --warning: #f8961e;
            --info: #4895ef;
        }
        
        body {
            background-color: #f5f7fb;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .dashboard-header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .chart-container {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            border: 1px solid #eaeaea;
        }
        
        .stat-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            border-left: 4px solid var(--primary);
        }
        
        .stat-card i {
            font-size: 2rem;
            margin-bottom: 10px;
            color: var(--primary);
        }
        
        .database-status {
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        
        .db-connected {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .db-disconnected {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        
        .transaction-item {
            padding: 12px 15px;
            border-bottom: 1px solid #eaeaea;
        }
        
        .transaction-category {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            color: white;
        }
        
        .progress {
            height: 8px;
            margin-top: 5px;
        }
        
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #6c757d;
        }
        
        .empty-state i {
            font-size: 3rem;
            margin-bottom: 15px;
            color: #dee2e6;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-dark bg-primary shadow-sm">
        <div class="container">
            <span class="navbar-brand mb-0 h1">
                <i class="fas fa-chart-line me-2"></i>Expense Analytics Dashboard
            </span>
        </div>
    </nav>

    <div class="container-fluid mt-4">
        <!-- Database Connection Status -->
        <div class="database-status <?php echo $data['connection_status'] === 'connected' ? 'db-connected' : 'db-disconnected'; ?>">
            <h5><i class="fas fa-database me-2"></i>
                <?php echo $data['connection_status'] === 'connected' ? 'Database Connected Successfully' : 'Database Connection Required'; ?>
            </h5>
            <p class="mb-0">
                <?php if($data['connection_status'] === 'connected'): ?>
                    Live data loaded from Smart Expense Tracker database.
                <?php else: ?>
                    Unable to connect to database. Please check your database configuration.
                    <?php if(isset($data['error'])): ?>
                        <br><small>Error: <?php echo htmlspecialchars($data['error']); ?></small>
                    <?php endif; ?>
                <?php endif; ?>
            </p>
        </div>

        <?php if($data['connection_status'] === 'connected'): ?>
            <!-- Summary Statistics -->
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="stat-card">
                        <i class="fas fa-wallet"></i>
                        <h3>$<?php echo number_format(array_sum(array_column($data['monthly'], 'total_spending')), 2); ?></h3>
                        <p>Total Spending</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card">
                        <i class="fas fa-tags"></i>
                        <h3><?php echo count($data['categories']); ?></h3>
                        <p>Active Categories</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card">
                        <i class="fas fa-calendar-alt"></i>
                        <h3><?php echo count($data['monthly']); ?></h3>
                        <p>Months Tracked</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card">
                        <i class="fas fa-receipt"></i>
                        <h3><?php echo count($data['recent']); ?>+</h3>
                        <p>Transactions</p>
                    </div>
                </div>
            </div>

            <!-- Main Charts -->
            <div class="row">
                <div class="col-lg-8">
                    <div class="chart-container">
                        <h3><i class="fas fa-chart-bar me-2"></i>Monthly Spending Trend</h3>
                        <?php if(!empty($data['monthly'])): ?>
                            <canvas id="monthlySpendingChart" height="100"></canvas>
                        <?php else: ?>
                            <div class="empty-state">
                                <i class="fas fa-chart-bar"></i>
                                <h4>No Data Available</h4>
                                <p>No expense data found for the current year.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="chart-container">
                        <h3><i class="fas fa-chart-pie me-2"></i>Spending by Category</h3>
                        <?php if(!empty($data['categories'])): ?>
                            <canvas id="categorySpendingChart" height="250"></canvas>
                        <?php else: ?>
                            <div class="empty-state">
                                <i class="fas fa-chart-pie"></i>
                                <h4>No Data Available</h4>
                                <p>No category spending data found.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- Additional Visualizations -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="chart-container">
                        <h3><i class="fas fa-chart-line me-2"></i>Spending Progress</h3>
                        <?php if(!empty($data['monthly'])): ?>
                            <canvas id="spendingLineChart" height="250"></canvas>
                        <?php else: ?>
                            <div class="empty-state">
                                <i class="fas fa-chart-line"></i>
                                <h4>No Data Available</h4>
                                <p>No spending data available for visualization.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="chart-container">
                        <h3><i class="fas fa-clock me-2"></i>Recent Transactions</h3>
                        <?php if(!empty($data['recent'])): ?>
                            <div style="max-height: 400px; overflow-y: auto;">
                                <?php foreach($data['recent'] as $transaction): ?>
                                <div class="transaction-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <div class="fw-bold"><?php echo htmlspecialchars($transaction['description']); ?></div>
                                        <small class="text-muted"><?php echo date('M j, Y', strtotime($transaction['date'])); ?></small>
                                    </div>
                                    <div class="text-end">
                                        <div class="fw-bold">$<?php echo number_format($transaction['amount'], 2); ?></div>
                                        <span class="transaction-category" style="background-color: <?php echo $transaction['color']; ?>">
                                            <?php echo htmlspecialchars($transaction['category']); ?>
                                        </span>
                                    </div>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        <?php else: ?>
                            <div class="empty-state">
                                <i class="fas fa-receipt"></i>
                                <h4>No Transactions</h4>
                                <p>No recent transactions found.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- Budget Tracking Section -->
            <?php if(!empty($data['budget'])): ?>
            <div class="row">
                <div class="col-12">
                    <div class="chart-container">
                        <h3><i class="fas fa-balance-scale me-2"></i>Budget vs Actual Spending</h3>
                        <div class="row">
                            <?php foreach($data['budget'] as $item): 
                                $percentage = ($item['actual_spending'] / $item['budget_amount']) * 100;
                                $progressClass = $percentage > 100 ? 'bg-danger' : ($percentage > 80 ? 'bg-warning' : 'bg-success');
                            ?>
                            <div class="col-md-6 mb-3">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bold"><?php echo htmlspecialchars($item['category']); ?></span>
                                    <span class="<?php echo $percentage > 100 ? 'text-danger' : 'text-success'; ?>">
                                        $<?php echo number_format($item['actual_spending'], 2); ?> / $<?php echo number_format($item['budget_amount'], 2); ?>
                                    </span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar <?php echo $progressClass; ?>" 
                                         style="width: <?php echo min($percentage, 100); ?>%">
                                    </div>
                                </div>
                                <small class="text-muted">
                                    <?php echo number_format($percentage, 1); ?>% of budget used
                                    <?php if($percentage > 100): ?>
                                        <span class="text-danger">(Over budget)</span>
                                    <?php endif; ?>
                                </small>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php endif; ?>

        <?php else: ?>
            <!-- Database Configuration Help -->
            <div class="chart-container bg-light">
                <h3><i class="fas fa-cogs me-2"></i>Database Setup Instructions</h3>
                <p>To connect to your Smart Expense Tracker database, update the configuration in the PHP code:</p>
                
                <div class="mb-3">
                    <pre class="bg-dark text-light p-3 rounded">
// In analytics.php - Update these values:
$db_config = [
    'host' => 'localhost',          // Your database host
    'username' => 'root',           // Your database username  
    'password' => 'your_password',  // Your database password
    'database' => 'smart_expense_tracker' // Your database name
];</pre>
                </div>
                
                <div class="alert alert-info">
                    <strong>Note:</strong> This visualization dashboard expects the following tables in your database:
                    <ul class="mb-0 mt-2">
                        <li><code>expenses</code> - with columns: expense_id, amount, description, expense_date, category_id</li>
                        <li><code>categories</code> - with columns: category_id, category_name, color_code</li>
                        <li><code>budgets</code> - with columns: budget_id, category_id, budget_amount, budget_month (optional)</li>
                    </ul>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <?php if($data['connection_status'] === 'connected' && (!empty($data['monthly']) || !empty($data['categories']))): ?>
    <script>
        // Convert PHP data to JavaScript
        const analyticsData = <?php echo json_encode($data); ?>;
        
        // Monthly Spending Chart
        <?php if(!empty($data['monthly'])): ?>
        const monthlyLabels = analyticsData.monthly.map(item => {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${monthNames[item.month - 1]} ${item.year}`;
        });
        const monthlyAmounts = analyticsData.monthly.map(item => item.total_spending);

        new Chart(document.getElementById('monthlySpendingChart'), {
            type: 'bar',
            data: {
                labels: monthlyLabels,
                datasets: [{
                    label: 'Monthly Spending ($)',
                    data: monthlyAmounts,
                    backgroundColor: 'rgba(67, 97, 238, 0.8)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });

        // Spending Line Chart
        new Chart(document.getElementById('spendingLineChart'), {
            type: 'line',
            data: {
                labels: monthlyLabels,
                datasets: [{
                    label: 'Spending Trend ($)',
                    data: monthlyAmounts,
                    borderColor: '#FF6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
        <?php endif; ?>

        // Category Spending Chart
        <?php if(!empty($data['categories'])): ?>
        const categoryLabels = analyticsData.categories.map(item => item.category);
        const categoryAmounts = analyticsData.categories.map(item => item.total_amount);

        new Chart(document.getElementById('categorySpendingChart'), {
            type: 'doughnut',
            data: {
                labels: categoryLabels,
                datasets: [{
                    data: categoryAmounts,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                        '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: $${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        <?php endif; ?>

        // Log dashboard status
        console.log('📊 Analytics Dashboard Status:', {
            connection: analyticsData.connection_status,
            monthlyRecords: analyticsData.monthly.length,
            categories: analyticsData.categories.length,
            recentTransactions: analyticsData.recent.length
        });
    </script>
    <?php endif; ?>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>