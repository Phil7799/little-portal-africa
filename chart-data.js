// Additional chart configurations and data processors

// Initialize additional charts
function initAdditionalCharts() {
    console.log('\n*** initAdditionalCharts() STARTING ***');
    console.log('Data availability check:');
    console.log('  - dataManager exists:', !!dataManager);
    console.log('  - overviewData exists:', !!dataManager?.overviewData);
    console.log('  - Associates count:', Object.keys(dataManager?.overviewData?.associatePerformance || {}).length);
    console.log('  - Weekly performance weeks:', Object.keys(dataManager?.overviewData?.weeklyPerformance || {}).length);

    // Revenue Distribution Chart
    const revenueDistributionCtx = document.getElementById('revenueDistributionChart');
    console.log('Revenue Distribution canvas found:', !!revenueDistributionCtx);

    if (revenueDistributionCtx) {
        // Clear any existing chart on the canvas
        const existingChart = Chart.getChart(revenueDistributionCtx);
        if (existingChart) {
            existingChart.destroy();
        }
        
        const canvasCtx = revenueDistributionCtx.getContext('2d');

        const associateData = dataManager.overviewData.associatePerformance;
        console.log('  - Associate performance entries:', Object.keys(associateData).length);
        const labels = Object.values(associateData).map(a => a.name);
        const data = Object.values(associateData).map(a => a.totalRevenue);
        console.log('  - Revenue Distribution labels:', labels);
        console.log('  - Revenue Distribution data:', data);

        new Chart(canvasCtx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#E63946', '#2A9D8F', '#1D3557', '#F4A261',
                        '#A8DADC', '#FFB4B4', '#A8E6CF'
                    ],
                    borderWidth: 2,
                    borderColor: 'white'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.raw / total) * 100).toFixed(1);
                                return `${context.label}: Ksh ${formatNumber(context.raw)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    } else {
        console.error('❌ Revenue Distribution Chart canvas not found!');
    }

    // Onboarding Progress Chart
    const onboardingCtx = document.getElementById('onboardingChart');
    console.log('onboardingCtx found:', !!onboardingCtx);

    if (onboardingCtx) {
        // Clear any existing chart on the canvas
        const existingChart = Chart.getChart(onboardingCtx);
        if (existingChart) {
            existingChart.destroy();
        }
        
        const canvasCtx = onboardingCtx.getContext('2d');

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const onboardingTargets = Array(12).fill(84); // 7 associates × 12 each
        const onboardingActuals = months.map((month, index) => {
            return dataManager.corporateAssociates.reduce((sum, associate) => {
                return sum + (dataManager.corporateOnboarded[associate][index] || 0);
            }, 0);
        });
        console.log('Onboarding - targets:', onboardingTargets, 'actuals:', onboardingActuals);

        new Chart(canvasCtx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                        label: 'Target',
                        data: onboardingTargets,
                        backgroundColor: '#A8DADC',
                        borderColor: '#1D3557',
                        borderWidth: 1
                    },
                    {
                        label: 'Actual',
                        data: onboardingActuals,
                        backgroundColor: '#2A9D8F',
                        borderColor: '#2A9D8F',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Corporates'
                        }
                    }
                }
            }
        });
    } else {
        console.error('❌ Onboarding Chart canvas not found!');
    }

    // Monthly Comparison Chart - Only if element exists
    const monthlyComparisonCtx = document.getElementById('monthlyComparisonChart');
    if (monthlyComparisonCtx) {
        // Clear any existing chart on the canvas
        const existingChart = Chart.getChart(monthlyComparisonCtx);
        if (existingChart) {
            existingChart.destroy();
        }
        
        const canvasCtx = monthlyComparisonCtx.getContext('2d');

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const revenueTargets = dataManager.monthlyTargets.revenue;
        const revenueActuals = dataManager.calculateMonthlyActuals();
        const lastYearRevenue = dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0);

        new Chart(canvasCtx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                        label: 'Target Revenue',
                        data: revenueTargets,
                        backgroundColor: '#1D3557',
                        borderColor: '#1D3557',
                        borderWidth: 1
                    },
                    {
                        label: 'Current Year Actual',
                        data: revenueActuals,
                        backgroundColor: '#E63946',
                        borderColor: '#E63946',
                        borderWidth: 1
                    },
                    {
                        label: 'Last Year Actual',
                        data: lastYearRevenue,
                        backgroundColor: '#9D4EDD',
                        borderColor: '#9D4EDD',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Ksh ' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
}

// Update analytics table with year comparison - Keep this function for compatibility
function updateAnalyticsTable() {
    console.log('updateAnalyticsTable is deprecated, use updateRevenueTargetsTable instead');
    updateRevenueTargetsTable('all', 'all');
}

// Download template function
function downloadTemplate() {
    // Create template data for 3 sheets
    const templateData = {
        Sheet1: [
            ['Month', 'Associate', 'Corporates_Onboarded', 'Corporates_Riding'],
            [1, 'carol.ngugi@little.africa', 5, 2],
            [1, 'christine.nyiva@little.africa', 3, 2],
            [1, 'david.miiri@little.africa', 3, 3]
        ],
        Sheet2: [
            ['Corporate', 'Associate', 'Revenue', 'WEEK'],
            ['G4S KENYA LIMITED', 'mary.matevwa@little.africa', 79920, 'WEEK 1'],
            ['OFFSHORE GLOBAL LOGISTICS LIMITED', 'mary.matevwa@little.africa', 1156, 'WEEK 1'],
            ['G4S KENYA LIMITED', 'mary.matevwa@little.africa', 72230, 'WEEK 2']
        ],
        Sheet3: [
            ['Associate', 'WEEK', 'Revenue'],
            ['lillian.lugano@little.africa', 'WEEK 40', '865858.00'],
            ['lillian.lugano@little.africa', 'WEEK 39', '735711.00'],
            ['laura.kabaara@little.africa', 'WEEK 40', '724359.00']
        ]
    };

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add sheets
    const ws1 = XLSX.utils.aoa_to_sheet(templateData.Sheet1);
    const ws2 = XLSX.utils.aoa_to_sheet(templateData.Sheet2);
    const ws3 = XLSX.utils.aoa_to_sheet(templateData.Sheet3);

    XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");
    XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");
    XLSX.utils.book_append_sheet(wb, ws3, "Sheet3");

    // Generate and download file
    XLSX.writeFile(wb, "sales_data_template.xlsx");
}

// Generate report function
function generateReport() {
    const reportType = document.getElementById('reportType')?.value || 'performance';
    const dateFrom = document.getElementById('reportDateFrom')?.value;
    const dateTo = document.getElementById('reportDateTo')?.value;

    // Generate report based on type
    let reportData = [];

    switch (reportType) {
        case 'performance':
            reportData = generatePerformanceReport();
            break;
        case 'weekly':
            reportData = generateWeeklyReport();
            break;
        case 'monthly':
            reportData = generateMonthlyReport();
            break;
        case 'associate':
            reportData = generateAssociateReport();
            break;
        case 'year_comparison':
            reportData = generateYearComparisonReport();
            break;
        default:
            reportData = generatePerformanceReport();
    }

    // Download report
    const blob = new Blob([reportData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Helper functions for reports
function generatePerformanceReport() {
    let csv = 'Performance Report\n\n';
    csv += 'Associate,Total Revenue,Last Year Revenue,Growth %,Total Onboarded,Revenue Achievement %,Onboarded Achievement %,Status\n';

    Object.values(dataManager.overviewData.associatePerformance).forEach(associate => {
        const revenueAchievement = associate.revenueAchievement.reduce((a, b) => a + b, 0) / associate.revenueAchievement.length;
        const onboardedAchievement = associate.onboardedAchievement.reduce((a, b) => a + b, 0) / associate.onboardedAchievement.length;
        const lastYearTotal = Object.values(associate.lastYearWeeklyRevenue || {}).reduce((a, b) => a + b, 0);
        const growth = lastYearTotal > 0 ? ((associate.totalRevenue - lastYearTotal) / lastYearTotal) * 100 : 0;
        const status = revenueAchievement >= 100 ? 'On Target' : revenueAchievement >= 70 ? 'Needs Attention' : 'At Risk';

        csv += `${associate.name},${associate.totalRevenue},${lastYearTotal},${growth.toFixed(2)}%,${associate.totalOnboarded},${revenueAchievement.toFixed(2)}%,${onboardedAchievement.toFixed(2)}%,${status}\n`;
    });

    return csv;
}

function generateYearComparisonReport() {
    let csv = 'Year-over-Year Comparison Report\n\n';
    csv += 'Month,Current Year Revenue,Last Year Revenue,Growth %,Current Year Onboarded,Last Year Onboarded\n';

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYearMonthly = dataManager.calculateMonthlyActuals();
    const lastYearMonthly = dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0);

    months.forEach((month, index) => {
        const current = currentYearMonthly[index] || 0;
        const last = lastYearMonthly[index] || 0;
        const growth = last > 0 ? ((current - last) / last) * 100 : 0;

        csv += `${month},${current},${last},${growth.toFixed(2)}%,N/A,N/A\n`;
    });

    csv += '\n';
    csv += 'Overall,';
    csv += `${dataManager.overviewData.totalRevenueActual},`;
    csv += `${dataManager.overviewData.lastYearComparison?.total || 0},`;
    const overallGrowth = dataManager.overviewData.lastYearComparison?.total > 0 ?
        ((dataManager.overviewData.totalRevenueActual - dataManager.overviewData.lastYearComparison.total) / dataManager.overviewData.lastYearComparison.total) * 100 : 0;
    csv += `${overallGrowth.toFixed(2)}%,N/A,N/A`;

    return csv;
}

// Helper function for weekly report
function generateWeeklyReport() {
    let csv = 'Weekly Performance Report\n\n';
    csv += 'Week,Date,Target Revenue,Actual Revenue,Achievement %,Last Year Revenue,Growth %\n';

    const weeks = Object.keys(dataManager.overviewData.weeklyPerformance)
        .sort((a, b) => parseInt(a) - parseInt(b));

    weeks.forEach(weekNum => {
        const weekData = dataManager.overviewData.weeklyPerformance[weekNum];
        const achievement = weekData.target > 0 ? (weekData.actual / weekData.target) * 100 : 0;
        const growth = weekData.lastYear > 0 ? ((weekData.actual - weekData.lastYear) / weekData.lastYear) * 100 : 0;

        csv += `Week ${weekNum},${weekData.date},${weekData.target},${weekData.actual},${achievement.toFixed(2)}%,${weekData.lastYear},${growth.toFixed(2)}%\n`;
    });

    return csv;
}

// Helper function for monthly report
function generateMonthlyReport() {
    let csv = 'Monthly Performance Report\n\n';
    csv += 'Month,Target Revenue,Actual Revenue,Achievement %,Last Year Revenue,Growth %,Onboarding Target,Onboarding Actual,Onboarding Achievement %\n';

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const teamMonthlyTargets = dataManager.teamMonthlyTargets || Array(12).fill(0);
    const revenueActuals = dataManager.calculateMonthlyActuals();
    const lastYearRevenue = dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0);
    const onboardedTargets = Array(12).fill(84);
    const onboardedActuals = months.map((month, index) => {
        return dataManager.corporateAssociates.reduce((sum, associate) => {
            return sum + (dataManager.corporateOnboarded[associate][index] || 0);
        }, 0);
    });

    months.forEach((month, index) => {
        const revenueTarget = teamMonthlyTargets[index] || 0;
        const revenueActual = revenueActuals[index] || 0;
        const revenueAchievement = revenueTarget > 0 ? (revenueActual / revenueTarget) * 100 : 0;
        const lastYear = lastYearRevenue[index] || 0;
        const growth = lastYear > 0 ? ((revenueActual - lastYear) / lastYear) * 100 : 0;
        const onboardingTarget = onboardedTargets[index];
        const onboardingActual = onboardedActuals[index];
        const onboardingAchievement = onboardingTarget > 0 ? (onboardingActual / onboardingTarget) * 100 : 0;

        csv += `${month},${revenueTarget},${revenueActual},${revenueAchievement.toFixed(2)}%,${lastYear},${growth.toFixed(2)}%,${onboardingTarget},${onboardingActual},${onboardingAchievement.toFixed(2)}%\n`;
    });

    return csv;
}

// Helper function for associate report
function generateAssociateReport() {
    let csv = 'Associate Performance Report\n\n';
    csv += 'Associate,Total Revenue,Monthly Avg Revenue,Total Onboarded,Monthly Avg Onboarded,Revenue Achievement %,Onboarding Achievement %,Growth vs Last Year %,Status\n';

    Object.values(dataManager.overviewData.associatePerformance).forEach(associate => {
        const revenueAchievement = associate.revenueAchievement.reduce((a, b) => a + b, 0) / associate.revenueAchievement.length;
        const onboardedAchievement = associate.onboardedAchievement.reduce((a, b) => a + b, 0) / associate.onboardedAchievement.length;
        const lastYearTotal = Object.values(associate.lastYearWeeklyRevenue || {}).reduce((a, b) => a + b, 0);
        const growth = lastYearTotal > 0 ? ((associate.totalRevenue - lastYearTotal) / lastYearTotal) * 100 : 0;
        const status = revenueAchievement >= 100 ? 'On Target' : revenueAchievement >= 70 ? 'Needs Attention' : 'At Risk';
        const monthlyAvgRevenue = associate.totalRevenue / 12;
        const monthlyAvgOnboarded = associate.totalOnboarded / 12;

        csv += `${associate.name},${associate.totalRevenue},${monthlyAvgRevenue.toFixed(2)},${associate.totalOnboarded},${monthlyAvgOnboarded.toFixed(2)},${revenueAchievement.toFixed(2)}%,${onboardedAchievement.toFixed(2)}%,${growth.toFixed(2)}%,${status}\n`;
    });

    return csv;
}