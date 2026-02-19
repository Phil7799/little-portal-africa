// Additional chart configurations and data processors

function initAdditionalCharts() {
    // Revenue Distribution Chart (Doughnut)
    const revenueDistributionCtx = document.getElementById('revenueDistributionChart');
    if (revenueDistributionCtx) {
        const existingChart = Chart.getChart(revenueDistributionCtx);
        if (existingChart) existingChart.destroy();
        const associateData = dataManager.overviewData.associatePerformance;
        const labels = Object.values(associateData).map(a => a.name);
        const data = Object.values(associateData).map(a => a.totalRevenue);
        new Chart(revenueDistributionCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: ['#E63946','#2A9D8F','#1D3557','#F4A261','#A8DADC','#FFB4B4','#A8E6CF'],
                    borderWidth: 2,
                    borderColor: 'white'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = data.reduce((a, b) => a + b, 0);
                                const pct = ((context.raw / total) * 100).toFixed(1);
                                return `${context.label}: Ksh ${formatNumber(context.raw)} (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Monthly Onboarding Progress Chart (Bar)
    const onboardingCtx = document.getElementById('onboardingChart');
    if (onboardingCtx) {
        const existingChart = Chart.getChart(onboardingCtx);
        if (existingChart) existingChart.destroy();
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const onboardingTargets = Array(12).fill(84);
        const onboardingActuals = months.map((m, i) =>
            dataManager.corporateAssociates.reduce((sum, associate) =>
                sum + (dataManager.corporateOnboarded[associate]?.[i] || 0), 0)
        );
        new Chart(onboardingCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    { label: 'Target', data: onboardingTargets, backgroundColor: '#A8DADC', borderColor: '#1D3557', borderWidth: 1 },
                    { label: 'Actual', data: onboardingActuals, backgroundColor: '#2A9D8F', borderColor: '#2A9D8F', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Number of Corporates' } } }
            }
        });
    }

    // Monthly Comparison Chart (if present)
    const monthlyComparisonCtx = document.getElementById('monthlyComparisonChart');
    if (monthlyComparisonCtx) {
        const existingChart = Chart.getChart(monthlyComparisonCtx);
        if (existingChart) existingChart.destroy();
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        new Chart(monthlyComparisonCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    { label: 'Target Revenue', data: dataManager.monthlyTargets.revenue, backgroundColor: '#1D3557', borderColor: '#1D3557', borderWidth: 1 },
                    { label: 'Current Year Actual', data: dataManager.calculateMonthlyActuals(), backgroundColor: '#E63946', borderColor: '#E63946', borderWidth: 1 },
                    { label: 'Last Year Actual', data: dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0), backgroundColor: '#9D4EDD', borderColor: '#9D4EDD', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, ticks: { callback: v => 'Ksh ' + formatNumber(v) } } }
            }
        });
    }
}

// Compatibility
function updateAnalyticsTable() {
    updateRevenueTargetsTable('all', 'all');
}

function generateWeeklyReport() {
    let csv = 'Weekly Performance Report\n\nWeek,Date,Target Revenue,Actual Revenue,Achievement %,Last Year Revenue,Growth %\n';
    const weeks = Object.keys(dataManager.overviewData.weeklyPerformance).sort((a, b) => parseInt(a) - parseInt(b));
    weeks.forEach(weekNum => {
        const weekData = dataManager.overviewData.weeklyPerformance[weekNum];
        const achievement = weekData.target > 0 ? (weekData.actual / weekData.target) * 100 : 0;
        const growth = weekData.lastYear > 0 ? ((weekData.actual - weekData.lastYear) / weekData.lastYear) * 100 : 0;
        csv += `Week ${weekNum},${weekData.date},${weekData.target},${weekData.actual},${achievement.toFixed(2)}%,${weekData.lastYear},${growth.toFixed(2)}%\n`;
    });
    return csv;
}

function generateMonthlyReport() {
    let csv = 'Monthly Performance Report\n\nMonth,Target Revenue,Actual Revenue,Achievement %,Last Year Revenue,Growth %,Onboarding Target,Onboarding Actual,Onboarding Achievement %\n';
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const teamMonthlyTargets = dataManager.teamMonthlyTargets || Array(12).fill(0);
    const revenueActuals = dataManager.calculateMonthlyActuals();
    const lastYearRevenue = dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0);
    months.forEach((month, i) => {
        const revenueTarget = teamMonthlyTargets[i] || 0;
        const revenueActual = revenueActuals[i] || 0;
        const revenueAchievement = revenueTarget > 0 ? (revenueActual / revenueTarget) * 100 : 0;
        const lastYear = lastYearRevenue[i] || 0;
        const growth = lastYear > 0 ? ((revenueActual - lastYear) / lastYear) * 100 : 0;
        const onboardingActual = dataManager.corporateAssociates.reduce((sum, associate) =>
            sum + (dataManager.corporateOnboarded[associate]?.[i] || 0), 0);
        csv += `${month},${revenueTarget},${revenueActual},${revenueAchievement.toFixed(2)}%,${lastYear},${growth.toFixed(2)}%,84,${onboardingActual},${(84 > 0 ? (onboardingActual/84)*100 : 0).toFixed(2)}%\n`;
    });
    return csv;
}

function generateAssociateReport() {
    let csv = 'Associate Performance Report\n\nAssociate,Total Revenue,Monthly Avg Revenue,Total Onboarded,Monthly Avg Onboarded,Revenue Achievement %,Status\n';
    Object.values(dataManager.overviewData.associatePerformance).forEach(associate => {
        const revenueAchievement = associate.revenueAchievement.reduce((a, b) => a + b, 0) / associate.revenueAchievement.length;
        const status = revenueAchievement >= 100 ? 'On Target' : revenueAchievement >= 70 ? 'Needs Attention' : 'At Risk';
        const monthlyAvgRevenue = associate.totalRevenue / 12;
        const monthlyAvgOnboarded = associate.totalOnboarded / 12;
        csv += `${associate.name},${associate.totalRevenue},${monthlyAvgRevenue.toFixed(0)},${associate.totalOnboarded},${monthlyAvgOnboarded.toFixed(1)},${revenueAchievement.toFixed(2)}%,${status}\n`;
    });
    return csv;
}