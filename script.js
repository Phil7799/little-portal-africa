// Simplified Data Manager with Last Year Data Support
class DataManager {
    constructor() {
        this.corporateAssociates = [
            'carol.ngugi@little.africa',
            'christine.nyiva@little.africa',
            'david.miiri@little.africa',
            'laura.kabaara@little.africa',
            'lillian.lugano@little.africa',
            'mary.matevwa@little.africa',
            'wanjiru.kahuro@little.africa'
        ];
        this.loadData();
    }
    loadData() {
        this.monthlyTargets = JSON.parse(localStorage.getItem('monthly_targets')) || this.getDefaultMonthlyTargets();
        this.teamMonthlyTargets = JSON.parse(localStorage.getItem('team_monthly_targets')) || this.getDefaultTeamMonthlyTargets();
        this.weeklyTargets = JSON.parse(localStorage.getItem('weekly_targets')) || this.getDefaultWeeklyTargets();
        this.associateTargets = JSON.parse(localStorage.getItem('associate_targets')) || this.getDefaultAssociateTargets();
        this.corporateOnboarded = JSON.parse(localStorage.getItem('corporate_onboarded')) || this.initializeEmptyAssociateData();
        this.corporateRiding = JSON.parse(localStorage.getItem('corporate_riding')) || this.initializeEmptyAssociateData();
        this.weeklyPerformance = JSON.parse(localStorage.getItem('weekly_performance')) || {};
        this.lastYearPerformance = JSON.parse(localStorage.getItem('last_year_performance')) || {};
        this.corporateWeeklyRevenue = JSON.parse(localStorage.getItem('corporate_weekly_revenue')) || {};
        this.corporateAssociateWeeklyRevenue = JSON.parse(localStorage.getItem('corporate_associate_weekly_revenue')) || {};
        // Diaspora data (Sheet4)
        this.diasporaData = JSON.parse(localStorage.getItem('diaspora_data')) || [];
        this.calculateAggregates();
    }
    getDefaultMonthlyTargets() {
        const totalAnnualRevenue = 196000000;
        const totalMonthlyRevenue = totalAnnualRevenue / 12;
        const totalAnnualOnboarded = 1008;
        const totalMonthlyOnboarded = totalAnnualOnboarded / 12;
        return {
            revenue: Array(12).fill(totalMonthlyRevenue),
            onboarded: Array(12).fill(totalMonthlyOnboarded)
        };
    }
    getDefaultTeamMonthlyTargets() {
        return [
            1108315.46, 4070568.25, 7384069.91, 9342151.63,
            13879589.29, 15015767.90, 15552607.70, 17834998.93,
            21805249.83, 33336563.61, 29531776.47, 27138341.02
        ];
    }
    getDefaultWeeklyTargets() {
        return [
            { week: 1, date: '2026-01-08', target: 31702.00837 },
            { week: 2, date: '2026-01-15', target: 31702.00837 },
            { week: 3, date: '2026-01-22', target: 31702.00837 },
            { week: 4, date: '2026-01-29', target: 31702.00837 },
            { week: 5, date: '2026-02-05', target: 145542.03658 },
            { week: 6, date: '2026-02-12', target: 145542.03658 },
            { week: 7, date: '2026-02-19', target: 145542.03658 },
            { week: 8, date: '2026-02-26', target: 145542.03658 },
            { week: 9, date: '2026-03-05', target: 264015.35977 },
            { week: 10, date: '2026-03-12', target: 264015.35977 },
            { week: 11, date: '2026-03-19', target: 264015.35977 },
            { week: 12, date: '2026-03-26', target: 264015.35977 },
            { week: 13, date: '2026-04-02', target: 267220.82445 },
            { week: 14, date: '2026-04-09', target: 267220.82445 },
            { week: 15, date: '2026-04-16', target: 267220.82445 },
            { week: 16, date: '2026-04-23', target: 267220.82445 },
            { week: 17, date: '2026-04-30', target: 267220.82445 },
            { week: 18, date: '2026-05-07', target: 496260.86129 },
            { week: 19, date: '2026-05-14', target: 496260.86129 },
            { week: 20, date: '2026-05-21', target: 496260.86129 },
            { week: 21, date: '2026-05-28', target: 496260.86129 },
            { week: 22, date: '2026-06-04', target: 429507.68984 },
            { week: 23, date: '2026-06-11', target: 429507.68984 },
            { week: 24, date: '2026-06-18', target: 429507.68984 },
            { week: 25, date: '2026-06-25', target: 429507.68984 },
            { week: 26, date: '2026-07-02', target: 429507.68984 },
            { week: 27, date: '2026-07-09', target: 556079.15978 },
            { week: 28, date: '2026-07-16', target: 556079.15978 },
            { week: 29, date: '2026-07-23', target: 556079.15978 },
            { week: 30, date: '2026-07-30', target: 556079.15978 },
            { week: 31, date: '2026-08-06', target: 510148.34238 },
            { week: 32, date: '2026-08-13', target: 510148.34238 },
            { week: 33, date: '2026-08-20', target: 510148.34238 },
            { week: 34, date: '2026-08-27', target: 510148.34238 },
            { week: 35, date: '2026-09-03', target: 510148.34238 },
            { week: 36, date: '2026-09-10', target: 779640.64631 },
            { week: 37, date: '2026-09-17', target: 779640.64631 },
            { week: 38, date: '2026-09-24', target: 779640.64631 },
            { week: 39, date: '2026-10-01', target: 779640.64631 },
            { week: 40, date: '2026-10-08', target: 1191939.55833 },
            { week: 41, date: '2026-10-15', target: 1191939.55833 },
            { week: 42, date: '2026-10-22', target: 1191939.55833 },
            { week: 43, date: '2026-10-29', target: 1191939.55833 },
            { week: 44, date: '2026-11-05', target: 1055900.45926 },
            { week: 45, date: '2026-11-12', target: 1055900.45926 },
            { week: 46, date: '2026-11-19', target: 1055900.45926 },
            { week: 47, date: '2026-11-26', target: 1055900.45926 },
            { week: 48, date: '2026-12-03', target: 776259.07158 },
            { week: 49, date: '2026-12-10', target: 776259.07158 },
            { week: 50, date: '2026-12-17', target: 776259.07158 },
            { week: 51, date: '2026-12-24', target: 776259.07158 },
            { week: 52, date: '2026-12-31', target: 776259.07158 }
        ];
    }
    getDefaultAssociateTargets() {
        const targets = {};
        const individualAnnualRevenue = 28000000;
        const individualMonthlyRevenue = individualAnnualRevenue / 12;
        const individualAnnualOnboarded = 144;
        const individualMonthlyOnboarded = individualAnnualOnboarded / 12;
        this.corporateAssociates.forEach(associate => {
            targets[associate] = {
                monthlyRevenue: Array(12).fill(individualMonthlyRevenue),
                monthlyOnboarded: Array(12).fill(individualMonthlyOnboarded),
                annualRevenue: individualAnnualRevenue,
                annualOnboarded: individualAnnualOnboarded,
                weeklyRevenue: this.getDefaultWeeklyTargets()
            };
        });
        return targets;
    }
    initializeEmptyAssociateData() {
        const data = {};
        this.corporateAssociates.forEach(associate => {
            data[associate] = Array(12).fill(0);
        });
        return data;
    }
    calculateAggregates() {
        const associatesCount = (this.corporateAssociates || []).length || 1;
        this.overviewData = {
            totalRevenueTarget: this.monthlyTargets.revenue.reduce((a, b) => a + b, 0) * associatesCount,
            totalOnboardedTarget: this.monthlyTargets.onboarded.reduce((a, b) => a + b, 0) * associatesCount,
            totalRevenueActual: this.calculateTotalRevenueActual(),
            totalOnboardedActual: this.calculateTotalOnboardedActual(),
            weeklyPerformance: this.calculateWeeklyAggregates(),
            associatePerformance: this.calculateAssociatePerformance(),
            lastYearComparison: this.calculateLastYearComparison()
        };
    }
    calculateTotalRevenueActual() {
        let total = 0;
        Object.values(this.weeklyPerformance).forEach(weekData => {
            Object.values(weekData).forEach(revenue => { total += revenue; });
        });
        return total;
    }
    calculateTotalOnboardedActual() {
        let total = 0;
        this.corporateAssociates.forEach(associate => {
            total += this.corporateOnboarded[associate].reduce((a, b) => a + b, 0);
        });
        return total;
    }
    calculateWeeklyAggregates() {
        const aggregates = {};
        this.weeklyTargets.forEach(week => {
            aggregates[week.week] = {
                target: week.target * 7,
                actual: this.getWeeklyActual(week.week),
                date: week.date,
                lastYear: this.getLastYearWeeklyActual(week.week)
            };
        });
        return aggregates;
    }
    getWeeklyActual(weekNumber) {
        if (!this.weeklyPerformance[weekNumber]) return 0;
        return Object.values(this.weeklyPerformance[weekNumber]).reduce((a, b) => a + b, 0);
    }
    getLastYearWeeklyActual(weekNumber) {
        if (!this.lastYearPerformance[weekNumber]) return 0;
        return Object.values(this.lastYearPerformance[weekNumber]).reduce((a, b) => a + b, 0);
    }
    calculateAssociatePerformance() {
        const performance = {};
        this.corporateAssociates.forEach(associate => {
            const monthlyRevenue = this.calculateAssociateMonthlyRevenue(associate);
            const monthlyOnboarded = this.corporateOnboarded[associate];
            const weeklyRevenue = this.calculateAssociateWeeklyRevenue(associate);
            const lastYearWeeklyRevenue = this.calculateAssociateLastYearWeeklyRevenue(associate);
            performance[associate] = {
                name: associate.split('@')[0].split('.').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' '),
                monthlyRevenue,
                monthlyOnboarded,
                weeklyRevenue,
                lastYearWeeklyRevenue,
                totalRevenue: monthlyRevenue.reduce((a, b) => a + b, 0),
                totalOnboarded: monthlyOnboarded.reduce((a, b) => a + b, 0),
                revenueAchievement: this.calculateAchievement(monthlyRevenue, this.associateTargets[associate].monthlyRevenue),
                onboardedAchievement: this.calculateAchievement(monthlyOnboarded, Array(12).fill(12)),
                growthRate: this.calculateGrowthRate(associate)
            };
        });
        return performance;
    }
    calculateAssociateMonthlyRevenue(associate) {
        const monthlyRevenue = Array(12).fill(0);
        Object.entries(this.weeklyPerformance).forEach(([week, data]) => {
            if (data[associate]) {
                const weekNumber = parseInt(week);
                const month = this.getMonthFromWeek(weekNumber);
                monthlyRevenue[month - 1] += data[associate];
            }
        });
        return monthlyRevenue;
    }
    calculateAssociateWeeklyRevenue(associate) {
        const weeklyRevenue = {};
        Object.entries(this.weeklyPerformance).forEach(([week, data]) => {
            weeklyRevenue[week] = data[associate] || 0;
        });
        return weeklyRevenue;
    }
    calculateAssociateLastYearWeeklyRevenue(associate) {
        const weeklyRevenue = {};
        Object.entries(this.lastYearPerformance).forEach(([week, data]) => {
            weeklyRevenue[week] = data[associate] || 0;
        });
        return weeklyRevenue;
    }
    getMonthFromWeek(weekNumber) {
        if (weekNumber <= 4) return 1;
        else if (weekNumber <= 8) return 2;
        else if (weekNumber <= 12) return 3;
        else if (weekNumber <= 17) return 4;
        else if (weekNumber <= 21) return 5;
        else if (weekNumber <= 26) return 6;
        else if (weekNumber <= 30) return 7;
        else if (weekNumber <= 35) return 8;
        else if (weekNumber <= 39) return 9;
        else if (weekNumber <= 43) return 10;
        else if (weekNumber <= 47) return 11;
        else return 12;
    }
    calculateAchievement(actual, target) {
        return actual.map((value, index) => {
            const targetValue = target[index] || 1;
            return targetValue > 0 ? (value / targetValue) * 100 : 0;
        });
    }
    calculateGrowthRate(associate) {
        const currentYearTotal = Object.values(this.weeklyPerformance).reduce((sum, weekData) => {
            return sum + (weekData[associate] || 0);
        }, 0);
        const lastYearTotal = Object.values(this.lastYearPerformance).reduce((sum, weekData) => {
            return sum + (weekData[associate] || 0);
        }, 0);
        if (lastYearTotal === 0) return 0;
        return ((currentYearTotal - lastYearTotal) / lastYearTotal) * 100;
    }
    calculateLastYearComparison() {
        const comparison = { weekly: {}, monthly: Array(12).fill(0), total: 0 };
        Object.entries(this.lastYearPerformance).forEach(([week, data]) => {
            const weekNumber = parseInt(week);
            comparison.weekly[weekNumber] = Object.values(data).reduce((a, b) => a + b, 0);
            const month = this.getMonthFromWeek(weekNumber);
            comparison.monthly[month - 1] += comparison.weekly[weekNumber];
        });
        comparison.total = Object.values(comparison.weekly).reduce((a, b) => a + b, 0);
        return comparison;
    }
    async processExcelData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async(e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    if (workbook.Sheets['Sheet1']) {
                        const sheet1Data = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1'], { header: 1 });
                        this.processSheet1Data(sheet1Data);
                    }
                    if (workbook.Sheets['Sheet2']) {
                        const sheet2Data = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet2'], { header: 1 });
                        this.processSheet2Data(sheet2Data);
                    }
                    if (workbook.Sheets['Sheet3']) {
                        const sheet3Data = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet3'], { header: 1 });
                        this.processSheet3Data(sheet3Data);
                    }
                    if (workbook.Sheets['Sheet4']) {
                        const sheet4Data = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet4'], { header: 1 });
                        this.processSheet4Data(sheet4Data);
                    }
                    this.calculateAggregates();
                    this.saveData();
                    resolve({ success: true, message: 'Data uploaded successfully' });
                } catch (error) {
                    reject({ success: false, message: 'Error processing file: ' + error.message });
                }
            };
            reader.onerror = () => reject({ success: false, message: 'Error reading file' });
            reader.readAsArrayBuffer(file);
        });
    }
    processSheet1Data(rows) {
        rows.forEach((row, index) => {
            if (index === 0) return;
            if (row.length >= 4) {
                const month = parseInt(row[0]) - 1;
                const associate = row[1];
                const onboarded = parseInt(row[2]) || 0;
                const riding = parseInt(row[3]) || 0;
                if (!this.corporateOnboarded[associate]) {
                    this.corporateOnboarded[associate] = Array(12).fill(0);
                    this.corporateRiding[associate] = Array(12).fill(0);
                }
                if (!this.corporateAssociates.includes(associate)) this.corporateAssociates.push(associate);
                this.corporateOnboarded[associate][month] = onboarded;
                this.corporateRiding[associate][month] = riding;
            }
        });
    }
    processSheet2Data(rows) {
        this.weeklyPerformance = {};
        this.corporateWeeklyRevenue = {};
        this.corporateAssociateWeeklyRevenue = {};
        rows.forEach((row, index) => {
            if (index === 0) return;
            if (row.length >= 4) {
                const corporateName = row[0];
                const associate = row[1];
                const revenue = parseFloat(String(row[2]).replace(/,/g, '')) || 0;
                const week = row[3];
                if (!this.corporateAssociates.includes(associate)) {
                    this.corporateAssociates.push(associate);
                    this.corporateOnboarded[associate] = Array(12).fill(0);
                    this.corporateRiding[associate] = Array(12).fill(0);
                }
                const weekNumber = this.extractWeekNumber(week);
                if (!this.weeklyPerformance[weekNumber]) this.weeklyPerformance[weekNumber] = {};
                if (!this.weeklyPerformance[weekNumber][associate]) this.weeklyPerformance[weekNumber][associate] = 0;
                this.weeklyPerformance[weekNumber][associate] += revenue;
                if (!this.corporateWeeklyRevenue[corporateName]) this.corporateWeeklyRevenue[corporateName] = {};
                if (!this.corporateWeeklyRevenue[corporateName][weekNumber]) this.corporateWeeklyRevenue[corporateName][weekNumber] = 0;
                this.corporateWeeklyRevenue[corporateName][weekNumber] += revenue;
                if (!this.corporateAssociateWeeklyRevenue[corporateName]) this.corporateAssociateWeeklyRevenue[corporateName] = {};
                if (!this.corporateAssociateWeeklyRevenue[corporateName][associate]) this.corporateAssociateWeeklyRevenue[corporateName][associate] = {};
                if (!this.corporateAssociateWeeklyRevenue[corporateName][associate][weekNumber]) this.corporateAssociateWeeklyRevenue[corporateName][associate][weekNumber] = 0;
                this.corporateAssociateWeeklyRevenue[corporateName][associate][weekNumber] += revenue;
            }
        });
    }
    processSheet3Data(rows) {
        this.lastYearPerformance = {};
        rows.forEach((row, index) => {
            if (index === 0) return;
            if (row.length >= 3) {
                const associate = row[0];
                const week = row[1];
                const revenue = parseFloat(String(row[2]).replace(/,/g, '')) || 0;
                if (!this.corporateAssociates.includes(associate)) {
                    this.corporateAssociates.push(associate);
                    this.corporateOnboarded[associate] = Array(12).fill(0);
                    this.corporateRiding[associate] = Array(12).fill(0);
                }
                const weekNumber = this.extractWeekNumber(week);
                if (!this.lastYearPerformance[weekNumber]) this.lastYearPerformance[weekNumber] = {};
                if (!this.lastYearPerformance[weekNumber][associate]) this.lastYearPerformance[weekNumber][associate] = 0;
                this.lastYearPerformance[weekNumber][associate] += revenue;
            }
        });
    }
    processSheet4Data(rows) {
        // Sheet4: month_name, COUNTRY, associate_name, new_corporates_onboarded, total_revenue, revenue_from_new_corporates, total_trips
        this.diasporaData = [];
        rows.forEach((row, index) => {
            if (index === 0) return; // skip header
            if (row.length >= 5) {
                const monthName = row[0] ? String(row[0]).trim() : '';
                const country = row[1] ? String(row[1]).trim() : '';
                const associateName = row[2] ? String(row[2]).trim() : '';
                const newCorporatesOnboarded = parseInt(row[3]) || 0;
                const totalRevenue = parseFloat(String(row[4]).replace(/,/g, '')) || 0;
                const revenueFromNewCorporates = parseFloat(String(row[5] || 0).replace(/,/g, '')) || 0;
                const totalTrips = parseInt(row[6]) || 0;
                if (monthName && country) {
                    this.diasporaData.push({
                        monthName,
                        country,
                        associateName,
                        newCorporatesOnboarded,
                        totalRevenue,
                        revenueFromNewCorporates,
                        totalTrips
                    });
                }
            }
        });
    }
    extractWeekNumber(weekString) {
        if (!weekString) return 0;
        const match = String(weekString).match(/WEEK\s+(\d+)/i);
        return match ? parseInt(match[1]) : 0;
    }
    saveData() {
        localStorage.setItem('monthly_targets', JSON.stringify(this.monthlyTargets));
        localStorage.setItem('team_monthly_targets', JSON.stringify(this.teamMonthlyTargets));
        localStorage.setItem('weekly_targets', JSON.stringify(this.weeklyTargets));
        localStorage.setItem('associate_targets', JSON.stringify(this.associateTargets));
        localStorage.setItem('corporate_onboarded', JSON.stringify(this.corporateOnboarded));
        localStorage.setItem('corporate_riding', JSON.stringify(this.corporateRiding));
        localStorage.setItem('weekly_performance', JSON.stringify(this.weeklyPerformance));
        localStorage.setItem('last_year_performance', JSON.stringify(this.lastYearPerformance));
        localStorage.setItem('corporate_weekly_revenue', JSON.stringify(this.corporateWeeklyRevenue));
        localStorage.setItem('corporate_associate_weekly_revenue', JSON.stringify(this.corporateAssociateWeeklyRevenue));
        localStorage.setItem('overview_data', JSON.stringify(this.overviewData));
        localStorage.setItem('diaspora_data', JSON.stringify(this.diasporaData));
        localStorage.setItem('last_data_update', new Date().toISOString());
    }
}

// Chart Manager
class ChartManager {
    constructor() {
        this.charts = {};
        this.colors = {
            red: '#E63946', green: '#2A9D8F', blue: '#1D3557',
            yellow: '#F4A261', lightBlue: '#A8DADC', lightRed: '#FFB4B4',
            lightGreen: '#A8E6CF', lightYellow: '#FFD166', purple: '#9D4EDD'
        };
    }
    initRevenueTrendChart(data) {
        const ctx = document.getElementById('revenueTrendChart');
        if (!ctx) return;
        if (this.charts.revenueTrend) this.charts.revenueTrend.destroy();
        this.charts.revenueTrend = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    { label: 'Target Revenue', data: data.targets, borderColor: this.colors.blue, backgroundColor: 'rgba(29,53,87,0.1)', borderWidth: 3, fill: true, tension: 0.4 },
                    { label: 'Actual Revenue', data: data.actuals, borderColor: this.colors.green, backgroundColor: 'rgba(42,157,143,0.1)', borderWidth: 3, fill: true, tension: 0.4 },
                    { label: 'Last Year', data: data.lastYear, borderColor: this.colors.purple, backgroundColor: 'rgba(157,78,221,0.1)', borderWidth: 2, borderDash: [5, 5], fill: false, tension: 0.4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: Ksh ${formatNumber(ctx.raw)}` } }
                },
                scales: { y: { beginAtZero: true, ticks: { callback: v => 'Ksh ' + formatNumber(v) } } }
            }
        });
    }
    // Combo chart: bars for revenue, line for onboarded corporates with dual axes
    initAssociatePerformanceChart(associatesData) {
        const ctx = document.getElementById('associatePerformanceChart');
        if (!ctx) return;
        if (this.charts.associatePerformance) this.charts.associatePerformance.destroy();
        const labels = Object.values(associatesData).map(a => a.name);
        const revenue = Object.values(associatesData).map(a => a.totalRevenue);
        const onboarded = Object.values(associatesData).map(a => a.totalOnboarded);
        this.charts.associatePerformance = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Total Revenue (Ksh)',
                        data: revenue,
                        backgroundColor: 'rgba(230,57,70,0.75)',
                        borderColor: this.colors.red,
                        borderWidth: 1,
                        yAxisID: 'yRevenue',
                        type: 'bar',
                        order: 2
                    },
                    {
                        label: 'Corporates Onboarded',
                        data: onboarded,
                        backgroundColor: 'rgba(29,53,87,0.15)',
                        borderColor: this.colors.blue,
                        borderWidth: 2,
                        yAxisID: 'yOnboarded',
                        type: 'line',
                        tension: 0.4,
                        pointRadius: 6,
                        pointBackgroundColor: this.colors.blue,
                        fill: false,
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                if (ctx.dataset.yAxisID === 'yRevenue') return `Revenue: Ksh ${formatNumber(ctx.raw)}`;
                                return `Onboarded: ${ctx.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    yRevenue: {
                        type: 'linear',
                        position: 'left',
                        beginAtZero: true,
                        title: { display: true, text: 'Revenue (Ksh)', color: this.colors.red },
                        ticks: { callback: v => 'Ksh ' + formatNumber(v), color: this.colors.red }
                    },
                    yOnboarded: {
                        type: 'linear',
                        position: 'right',
                        beginAtZero: true,
                        title: { display: true, text: 'Corporates Onboarded', color: this.colors.blue },
                        ticks: { color: this.colors.blue },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    }
    initWeeklyPerformanceChart(weeklyData) {
        const ctx = document.getElementById('weeklyPerformanceChart');
        if (!ctx) return;
        if (this.charts.weeklyPerformance) this.charts.weeklyPerformance.destroy();
        const weeks = Object.keys(weeklyData).sort((a, b) => parseInt(a) - parseInt(b));
        this.charts.weeklyPerformance = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: weeks.map(w => `Week ${w}`),
                datasets: [
                    { label: 'Target', data: weeks.map(w => weeklyData[w].target), borderColor: this.colors.blue, backgroundColor: 'rgba(29,53,87,0.1)', borderWidth: 2, fill: false, tension: 0.4 },
                    { label: 'Current Year', data: weeks.map(w => weeklyData[w].actual), borderColor: this.colors.green, backgroundColor: 'rgba(42,157,143,0.1)', borderWidth: 2, fill: false, tension: 0.4 },
                    { label: 'Last Year', data: weeks.map(w => weeklyData[w].lastYear || 0), borderColor: this.colors.purple, backgroundColor: 'rgba(157,78,221,0.1)', borderWidth: 2, borderDash: [5,5], fill: false, tension: 0.4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, ticks: { callback: v => 'Ksh ' + formatNumber(v) } } }
            }
        });
    }
    initYearComparisonChart(currentYearData, lastYearData) {
        const ctx = document.getElementById('yearComparisonChart');
        if (!ctx) return;
        if (this.charts.yearComparison) this.charts.yearComparison.destroy();
        this.charts.yearComparison = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    { label: 'Current Year', data: currentYearData, borderColor: this.colors.green, backgroundColor: 'rgba(42,157,143,0.1)', borderWidth: 3, fill: true, tension: 0.4 },
                    { label: 'Last Year', data: lastYearData, borderColor: this.colors.purple, backgroundColor: 'rgba(157,78,221,0.1)', borderWidth: 2, borderDash: [5,5], fill: false, tension: 0.4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: Ksh ${formatNumber(ctx.raw)}` } }
                },
                scales: { y: { beginAtZero: true, ticks: { callback: v => 'Ksh ' + formatNumber(v) } } }
            }
        });
    }
}

// Initialize Managers
const dataManager = new DataManager();
const chartManager = new ChartManager();

// Helper Functions
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    const n = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
    if (n >= 1000000000) return (n / 1000000000).toFixed(1) + 'B';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toFixed(0);
}

function formatCurrency(num) {
    const n = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
    if (isNaN(n)) return 'Ksh 0';
    return new Intl.NumberFormat('en-KE', {
        style: 'currency', currency: 'KES',
        minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(n);
}

// Dashboard Initialization
function initDashboard() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = new Date().toLocaleDateString('en-KE', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
    if (!dataManager.teamMonthlyTargets || dataManager.teamMonthlyTargets.length !== 12) {
        dataManager.teamMonthlyTargets = dataManager.getDefaultTeamMonthlyTargets();
        dataManager.saveData();
    }
    loadOverviewData();
    loadCharts();
    loadTables();
    initFilters();
    applyFilters();
}

function loadTables() {
    updateAssociateTable('all', 'all');
    updateWeeklyTable('all', 'all');
}

function loadOverviewData() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const lastUpdate = localStorage.getItem('last_data_update');
        if (lastUpdate) {
            lastUpdatedElement.textContent = new Date(lastUpdate).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' });
        } else {
            lastUpdatedElement.textContent = 'Never';
        }
    }
}

function loadCharts() {
    const monthlyData = getFilteredMonthlyData('all', 'all');
    chartManager.initRevenueTrendChart(monthlyData);
    chartManager.initAssociatePerformanceChart(dataManager.overviewData.associatePerformance);
    chartManager.initWeeklyPerformanceChart(dataManager.overviewData.weeklyPerformance);
    const yearComparisonCtx = document.getElementById('yearComparisonChart');
    if (yearComparisonCtx) {
        chartManager.initYearComparisonChart(dataManager.calculateMonthlyActuals(), dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0));
    }
}

function calculateMonthlyActuals() {
    const monthlyActuals = Array(12).fill(0);
    Object.entries(dataManager.weeklyPerformance).forEach(([week, data]) => {
        const month = dataManager.getMonthFromWeek(parseInt(week));
        Object.values(data).forEach(revenue => { monthlyActuals[month - 1] += revenue; });
    });
    return monthlyActuals;
}
DataManager.prototype.calculateMonthlyActuals = calculateMonthlyActuals;

function initFilters() {
    const associateFilter = document.getElementById('associateFilter');
    if (associateFilter) {
        associateFilter.innerHTML = '<option value="all">All Associates</option>';
        dataManager.corporateAssociates.forEach(associate => {
            const name = associate.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            associateFilter.innerHTML += `<option value="${associate}">${name}</option>`;
        });
        associateFilter.addEventListener('change', applyFilters);
    }
    const monthFilter = document.getElementById('monthFilter');
    if (monthFilter) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        monthFilter.innerHTML = '<option value="all">All Months</option>';
        months.forEach((month, index) => { monthFilter.innerHTML += `<option value="${index}">${month}</option>`; });
        monthFilter.addEventListener('change', applyFilters);
    }
    const weekFilter = document.getElementById('weekFilter');
    if (weekFilter) {
        weekFilter.innerHTML = '<option value="all">All Weeks</option>';
        const weeks = Object.keys(dataManager.overviewData.weeklyPerformance).sort((a, b) => parseInt(a) - parseInt(b));
        weeks.forEach(weekNum => {
            const weekData = dataManager.overviewData.weeklyPerformance[weekNum];
            weekFilter.innerHTML += `<option value="${weekNum}">Week ${weekNum} (${weekData.date})</option>`;
        });
        weekFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const associate = document.getElementById('associateFilter')?.value || 'all';
    const month = document.getElementById('monthFilter')?.value || 'all';
    const week = document.getElementById('weekFilter')?.value || 'all';
    updateOverviewKPIs(associate, month);
    updateChartsWithFilters(associate, month);
    updateAssociateTable(associate, month);
    updateWeeklyTable(associate, week);
    updateAnalyticsPage(associate, month);
    updateAnalyticsBanner(associate);
}

function updateAnalyticsBanner(associateFilter) {
    const banner = document.getElementById('analyticsAssociateBanner');
    const bannerName = document.getElementById('analyticsBannerName');
    const analyticsLabel = document.getElementById('analyticsAssociateLabel');
    if (!banner || !bannerName) return;
    if (associateFilter && associateFilter !== 'all') {
        const data = dataManager.overviewData.associatePerformance[associateFilter];
        const name = data ? data.name : associateFilter;
        banner.style.display = 'flex';
        bannerName.textContent = name;
        if (analyticsLabel) analyticsLabel.textContent = `— ${name}`;
    } else {
        banner.style.display = 'none';
        if (analyticsLabel) analyticsLabel.textContent = '';
    }
}

function updateOverviewKPIs(associateFilter = 'all', monthFilter = 'all') {
    const teamMonthlyTargets = dataManager.getDefaultTeamMonthlyTargets();
    let totalRevenueTarget = 0, totalRevenueActual = 0, totalOnboardedTarget = 0, totalOnboardedActual = 0;

    if (associateFilter === 'all') {
        if (monthFilter === 'all') {
            totalRevenueTarget = teamMonthlyTargets.reduce((a, b) => a + b, 0);
            totalOnboardedTarget = 1008;
            Object.values(dataManager.overviewData.associatePerformance).forEach(data => {
                totalRevenueActual += data.totalRevenue;
                totalOnboardedActual += data.totalOnboarded;
            });
        } else {
            const month = parseInt(monthFilter);
            totalRevenueTarget = teamMonthlyTargets[month] || 0;
            totalOnboardedTarget = 84;
            Object.values(dataManager.overviewData.associatePerformance).forEach(data => {
                totalRevenueActual += data.monthlyRevenue[month] || 0;
                totalOnboardedActual += data.monthlyOnboarded[month] || 0;
            });
        }
    } else {
        const data = dataManager.overviewData.associatePerformance[associateFilter];
        if (data) {
            if (monthFilter === 'all') {
                totalRevenueTarget = teamMonthlyTargets.reduce((a, b) => a + b, 0) / 7;
                totalOnboardedTarget = 144;
                totalRevenueActual = data.totalRevenue;
                totalOnboardedActual = data.totalOnboarded;
            } else {
                const month = parseInt(monthFilter);
                totalRevenueTarget = (teamMonthlyTargets[month] || 0) / 7;
                totalOnboardedTarget = 12;
                totalRevenueActual = data.monthlyRevenue[month] || 0;
                totalOnboardedActual = data.monthlyOnboarded[month] || 0;
            }
        }
    }

    const netRevenueAchieved = totalRevenueActual * 0.18;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('totalRevenueTarget', formatCurrency(totalRevenueTarget));
    set('totalRevenueActual', formatCurrency(totalRevenueActual));
    set('netRevenueAchieved', formatCurrency(netRevenueAchieved));
    set('totalOnboardedTarget', Math.round(totalOnboardedTarget));
    set('totalOnboardedActual', Math.round(totalOnboardedActual));

    const revenueAchievement = (totalRevenueActual / totalRevenueTarget) * 100 || 0;
    const raEl = document.getElementById('revenueAchievement');
    if (raEl) {
        raEl.textContent = Math.round(revenueAchievement) + '%';
        raEl.className = revenueAchievement >= 100 ? 'trend-positive' : 'trend-negative';
    }
    const onboardedAchievement = (totalOnboardedActual / totalOnboardedTarget) * 100 || 0;
    const oaEl = document.getElementById('onboardedAchievement');
    if (oaEl) {
        oaEl.textContent = Math.round(onboardedAchievement) + '%';
        oaEl.className = onboardedAchievement >= 100 ? 'trend-positive' : 'trend-negative';
    }
}

function updateChartsWithFilters(associateFilter = 'all', monthFilter = 'all') {
    chartManager.initRevenueTrendChart(getFilteredMonthlyData(associateFilter, monthFilter));
    const associatePerformanceData = associateFilter === 'all'
        ? dataManager.overviewData.associatePerformance
        : { [associateFilter]: dataManager.overviewData.associatePerformance[associateFilter] };
    chartManager.initAssociatePerformanceChart(associatePerformanceData);
    chartManager.initWeeklyPerformanceChart(getFilteredWeeklyData(associateFilter));
    chartManager.initYearComparisonChart(getFilteredCurrentYearMonthly(associateFilter), getFilteredLastYearMonthly(associateFilter));
}

function getFilteredMonthlyData(associateFilter = 'all', monthFilter = 'all') {
    const teamMonthlyTargets = dataManager.getDefaultTeamMonthlyTargets();
    if (associateFilter === 'all') {
        return {
            targets: teamMonthlyTargets,
            actuals: dataManager.calculateMonthlyActuals(),
            lastYear: dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0)
        };
    } else {
        const data = dataManager.overviewData.associatePerformance[associateFilter];
        return {
            targets: teamMonthlyTargets.map(t => t / 7),
            actuals: data ? data.monthlyRevenue : Array(12).fill(0),
            lastYear: data ? Object.values(data.lastYearWeeklyRevenue || {}).reduce((monthly, revenue, index) => {
                const month = dataManager.getMonthFromWeek(parseInt(index) + 1);
                monthly[month - 1] = (monthly[month - 1] || 0) + revenue;
                return monthly;
            }, Array(12).fill(0)) : Array(12).fill(0)
        };
    }
}

function getFilteredWeeklyData(associateFilter = 'all') {
    const filtered = {};
    Object.entries(dataManager.overviewData.weeklyPerformance).forEach(([week, data]) => {
        if (associateFilter === 'all') {
            filtered[week] = data;
        } else {
            const weekTargets = dataManager.weeklyTargets.find(w => w.week == week);
            filtered[week] = {
                target: weekTargets ? weekTargets.target : 0,
                actual: dataManager.weeklyPerformance[week]?.[associateFilter] || 0,
                date: data.date,
                lastYear: dataManager.lastYearPerformance[week]?.[associateFilter] || 0
            };
        }
    });
    return filtered;
}

function getFilteredCurrentYearMonthly(associateFilter = 'all') {
    if (associateFilter === 'all') return dataManager.calculateMonthlyActuals();
    const data = dataManager.overviewData.associatePerformance[associateFilter];
    return data ? data.monthlyRevenue : Array(12).fill(0);
}

function getFilteredLastYearMonthly(associateFilter = 'all') {
    if (associateFilter === 'all') return dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0);
    const data = dataManager.overviewData.associatePerformance[associateFilter];
    if (!data) return Array(12).fill(0);
    const monthly = Array(12).fill(0);
    Object.entries(data.lastYearWeeklyRevenue || {}).forEach(([week, revenue]) => {
        const month = dataManager.getMonthFromWeek(parseInt(week));
        monthly[month - 1] += revenue;
    });
    return monthly;
}

function updateAnalyticsPage(associateFilter = 'all', monthFilter = 'all') {
    updateRevenueTargetsTable(associateFilter, monthFilter);
    updateCorporateWeeklyTable(associateFilter, monthFilter);
}

function updateRevenueTargetsTable(associateFilter = 'all', monthFilter = 'all') {
    const tbody = document.getElementById('revenueTargetsTableBody');
    if (!tbody) return;
    const teamMonthlyTargets = dataManager.getDefaultTeamMonthlyTargets();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let html = '';
    for (let month = 0; month < 12; month++) {
        if (monthFilter !== 'all' && parseInt(monthFilter) !== month) continue;
        let revenueTarget = associateFilter === 'all' ? (teamMonthlyTargets[month] || 0) : (teamMonthlyTargets[month] || 0) / 7;
        let onboardingTarget = associateFilter === 'all' ? 84 : 12;
        let revenueActual = 0, onboardingActual = 0, lastYearRevenue = 0;
        if (associateFilter === 'all') {
            Object.values(dataManager.overviewData.associatePerformance || {}).forEach(data => {
                revenueActual += data.monthlyRevenue[month] || 0;
                onboardingActual += data.monthlyOnboarded[month] || 0;
            });
            lastYearRevenue = dataManager.overviewData.lastYearComparison?.monthly?.[month] || 0;
        } else {
            const data = dataManager.overviewData.associatePerformance[associateFilter];
            if (data) {
                revenueActual = data.monthlyRevenue[month] || 0;
                onboardingActual = data.monthlyOnboarded[month] || 0;
                Object.entries(data.lastYearWeeklyRevenue || {}).forEach(([week, revenue]) => {
                    if (dataManager.getMonthFromWeek(parseInt(week)) === month + 1) lastYearRevenue += revenue;
                });
            }
        }
        const growth = lastYearRevenue > 0 ? ((revenueActual - lastYearRevenue) / lastYearRevenue) * 100 : 0;
        const revenueGap = revenueTarget - revenueActual;
        const onboardingGap = onboardingTarget - onboardingActual;
        const revenueGapClass = revenueGap > 0 ? 'trend-negative' : 'trend-positive';
        const revenueGapText = formatCurrency(Math.abs(revenueGap)) + (revenueGap > 0 ? ' deficit' : revenueGap < 0 ? ' surplus' : '');
        const onboardingGapClass = onboardingGap > 0 ? 'trend-negative' : 'trend-positive';
        const onboardingGapText = Math.abs(onboardingGap) + (onboardingGap > 0 ? ' deficit' : onboardingGap < 0 ? ' surplus' : '');
        let monthLabel = months[month];
        if (associateFilter !== 'all') {
            const data = dataManager.overviewData.associatePerformance[associateFilter];
            monthLabel += ` — ${data?.name || associateFilter}`;
        }
        html += `<tr>
            <td>${monthLabel}</td>
            <td>${formatCurrency(revenueTarget)}</td>
            <td>${formatCurrency(revenueActual)}</td>
            <td>${formatCurrency(lastYearRevenue)}</td>
            <td class="${growth >= 0 ? 'trend-positive' : 'trend-negative'}">${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%</td>
            <td>${Math.round(onboardingTarget)}</td>
            <td>${Math.round(onboardingActual)}</td>
            <td class="${revenueGapClass}">${revenueGapText}</td>
            <td class="${onboardingGapClass}">${onboardingGapText}</td>
        </tr>`;
    }
    tbody.innerHTML = html || '<tr><td colspan="9" class="text-center">No data available</td></tr>';
}

function updateCorporateWeeklyTable(associateFilter = 'all', monthFilter = 'all') {
    const thead = document.getElementById('corporateWeeklyTableHead');
    const tbody = document.getElementById('corporateWeeklyTableBody');
    if (!thead || !tbody) return;
    const allWeeks = Object.keys(dataManager.overviewData.weeklyPerformance || {}).map(w => parseInt(w)).sort((a, b) => a - b);
    if (allWeeks.length === 0) { tbody.innerHTML = '<tr><td colspan="99" class="text-center">No data available</td></tr>'; return; }
    let weeksToDisplay = allWeeks;
    if (monthFilter !== 'all') {
        weeksToDisplay = allWeeks.filter(week => dataManager.getMonthFromWeek(week) === parseInt(monthFilter) + 1);
    }
    thead.innerHTML = '<tr><th>Corporate</th>' + weeksToDisplay.map(w => `<th>WEEK ${w}</th>`).join('') + '</tr>';
    const corporateWeeklyRevenue = dataManager.corporateWeeklyRevenue || {};
    const corporateAssociateWeeklyRevenue = dataManager.corporateAssociateWeeklyRevenue || {};
    if (Object.keys(corporateWeeklyRevenue).length === 0) {
        tbody.innerHTML = '<tr><td colspan="99" class="text-center">No corporate data available. Please upload data first.</td></tr>';
        return;
    }
    let bodyHtml = '';
    if (associateFilter === 'all') {
        Object.entries(corporateWeeklyRevenue).forEach(([corporateName, weeklyData]) => {
            bodyHtml += `<tr><td><strong>${corporateName}</strong></td>` +
                weeksToDisplay.map(w => `<td>${formatCurrency(weeklyData[w] || 0)}</td>`).join('') + '</tr>';
        });
    } else {
        Object.entries(corporateAssociateWeeklyRevenue).forEach(([corporateName, associateData]) => {
            if (associateData[associateFilter]) {
                bodyHtml += `<tr><td><strong>${corporateName}</strong></td>` +
                    weeksToDisplay.map(w => `<td>${formatCurrency(associateData[associateFilter][w] || 0)}</td>`).join('') + '</tr>';
            }
        });
    }
    tbody.innerHTML = bodyHtml || '<tr><td colspan="99" class="text-center">No data available</td></tr>';
}

function updateAssociateTable(associateFilter = 'all', monthFilter = 'all') {
    const tbody = document.getElementById('associateTableBody');
    if (!tbody) return;
    let html = '';
    Object.entries(dataManager.overviewData.associatePerformance).forEach(([email, data]) => {
        if (associateFilter !== 'all' && email !== associateFilter) return;
        let revenueAchievement, onboardedAchievement;
        if (monthFilter !== 'all') {
            const month = parseInt(monthFilter);
            revenueAchievement = data.revenueAchievement[month] || 0;
            onboardedAchievement = data.onboardedAchievement[month] || 0;
        } else {
            revenueAchievement = data.revenueAchievement.reduce((a, b) => a + b, 0) / data.revenueAchievement.length;
            onboardedAchievement = data.onboardedAchievement.reduce((a, b) => a + b, 0) / data.onboardedAchievement.length;
        }
        html += `<tr>
            <td>${data.name}</td>
            <td>${formatCurrency(data.totalRevenue)}</td>
            <td>${data.totalOnboarded}</td>
            <td><div class="progress-cell"><span>${revenueAchievement.toFixed(1)}%</span><div class="progress-bar"><div class="progress-fill ${revenueAchievement >= 100 ? 'green' : revenueAchievement >= 70 ? 'yellow' : 'red'}" style="width: ${Math.min(revenueAchievement, 100)}%"></div></div></div></td>
            <td><div class="progress-cell"><span>${onboardedAchievement.toFixed(1)}%</span><div class="progress-bar"><div class="progress-fill ${onboardedAchievement >= 100 ? 'green' : onboardedAchievement >= 70 ? 'yellow' : 'red'}" style="width: ${Math.min(onboardedAchievement, 100)}%"></div></div></div></td>
            <td><span class="badge ${revenueAchievement >= 100 ? 'badge-success' : revenueAchievement >= 70 ? 'badge-warning' : 'badge-danger'}">${revenueAchievement >= 100 ? 'On Target' : revenueAchievement >= 70 ? 'Needs Attention' : 'At Risk'}</span></td>
        </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="6" class="text-center">No data available</td></tr>';
}

function updateWeeklyTable(associateFilter = 'all', weekFilter = 'all') {
    const tbody = document.getElementById('weeklyTableBody');
    if (!tbody) return;
    let html = '';
    const weeks = weekFilter === 'all'
        ? Object.keys(dataManager.overviewData.weeklyPerformance).sort((a, b) => parseInt(a) - parseInt(b))
        : [weekFilter];
    weeks.forEach(weekNumber => {
        const weekData = dataManager.overviewData.weeklyPerformance[weekNumber];
        if (!weekData) return;
        const weekTargets = dataManager.weeklyTargets.find(w => w.week == weekNumber);
        dataManager.corporateAssociates.forEach(associate => {
            if (associateFilter !== 'all' && associate !== associateFilter) return;
            const revenue = dataManager.weeklyPerformance[weekNumber]?.[associate] || 0;
            const lastYearRevenue = dataManager.lastYearPerformance[weekNumber]?.[associate] || 0;
            const target = weekTargets ? weekTargets.target : 0;
            const achievement = target > 0 ? (revenue / target) * 100 : 0;
            const growth = lastYearRevenue > 0 ? ((revenue - lastYearRevenue) / lastYearRevenue) * 100 : 0;
            const name = associate.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            html += `<tr>
                <td>Week ${weekNumber}</td>
                <td>${weekData.date}</td>
                <td>${name}</td>
                <td>${formatCurrency(target)}</td>
                <td>${formatCurrency(revenue)}</td>
                <td><div class="progress-cell"><span>${achievement.toFixed(1)}%</span><div class="progress-bar"><div class="progress-fill ${achievement >= 100 ? 'green' : achievement >= 70 ? 'yellow' : 'red'}" style="width: ${Math.min(achievement, 100)}%"></div></div></div></td>
                <td class="${growth >= 0 ? 'trend-positive' : 'trend-negative'}">${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%</td>
            </tr>`;
        });
    });
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No data available</td></tr>';
}

// Upload Functions
async function handleFileUpload(file) {
    try {
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        if (progressContainer) { progressContainer.style.display = 'block'; }
        if (progressBar) progressBar.style.width = '0%';
        if (progressText) progressText.textContent = 'Processing file...';
        const result = await dataManager.processExcelData(file);
        if (result.success) {
            if (progressBar) progressBar.style.width = '100%';
            if (progressText) progressText.textContent = 'Data processed successfully!';
            setTimeout(() => {
                if (progressContainer) progressContainer.style.display = 'none';
                showMessage(result.message, 'success');
            }, 1000);
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        return { success: false, message: 'Error: ' + error.message };
    }
}

// Export Functions
function exportToCSV() {
    const data = [];
    data.push(['Corporate Performance Report', 'Generated on', new Date().toLocaleString()]);
    data.push([]);
    data.push(['ASSOCIATE PERFORMANCE']);
    data.push(['Name', 'Total Revenue', 'Total Onboarded', 'Status']);
    Object.values(dataManager.overviewData.associatePerformance).forEach(associate => {
        const revenueAchievement = associate.revenueAchievement.reduce((a, b) => a + b, 0) / associate.revenueAchievement.length;
        const status = revenueAchievement >= 100 ? 'On Target' : revenueAchievement >= 70 ? 'Needs Attention' : 'At Risk';
        data.push([associate.name, associate.totalRevenue, associate.totalOnboarded, status]);
    });
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event Listeners and Initialization
function initializeApp() {
    if (window.location.pathname.includes('dashboard.html')) {
        initDashboard();
    } else if (window.location.pathname.includes('upload.html')) {
        initUploadPage();
    } else if (window.location.pathname.includes('diaspora.html')) {
        initDiasporaPage();
    }
}

function initUploadPage() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
        uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; handleFileSelection(); }
        });
        fileInput.addEventListener('change', handleFileSelection);
    }
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!fileInput || !fileInput.files.length) { showMessage('Please select a file', 'error'); return; }
            const uploadBtn = document.getElementById('uploadBtn');
            const originalText = uploadBtn?.innerHTML;
            if (uploadBtn) { uploadBtn.innerHTML = '<span class="loading"></span> Uploading...'; uploadBtn.disabled = true; }
            try {
                const result = await handleFileUpload(fileInput.files[0]);
                if (result.success) {
                    showMessage(result.message, 'success');
                    setTimeout(() => { window.location.href = 'dashboard.html'; }, 2000);
                } else {
                    showMessage(result.message, 'error');
                    if (uploadBtn) { uploadBtn.innerHTML = originalText; uploadBtn.disabled = false; }
                }
            } catch (error) {
                showMessage('Error during upload: ' + error.message, 'error');
                if (uploadBtn) { uploadBtn.innerHTML = originalText; uploadBtn.disabled = false; }
            }
        });
    }
    loadUploadHistory();
}

function loadUploadHistory() {
    const tbody = document.getElementById('uploadHistory');
    if (!tbody) return;
    const lastUpdate = localStorage.getItem('last_data_update');
    if (lastUpdate) {
        tbody.innerHTML = `<tr>
            <td>${new Date(lastUpdate).toLocaleString('en-KE')}</td>
            <td>Excel Upload</td>
            <td>Admin</td>
            <td>—</td>
            <td><span class="badge badge-success">Success</span></td>
        </tr>`;
    } else {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No upload history</td></tr>';
    }
}

function handleFileSelection() {
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const uploadBtn = document.getElementById('uploadBtn');
    if (fileInput && fileInput.files.length) {
        const file = fileInput.files[0];
        if (fileName) fileName.textContent = file.name;
        if (uploadBtn) uploadBtn.disabled = false;
        previewFile(file);
    }
}

async function previewFile(file) {
    try {
        const reader = new FileReader();
        const fileData = await new Promise((resolve, reject) => { reader.onload = e => resolve(e.target.result); reader.onerror = reject; reader.readAsArrayBuffer(file); });
        const data = new Uint8Array(fileData);
        const workbook = XLSX.read(data, { type: 'array' });
        const previewContainer = document.getElementById('uploadPreview');
        if (!previewContainer) return;
        let previewHTML = '<h4>File Preview (First 5 rows of each sheet):</h4>';
        ['Sheet1', 'Sheet2', 'Sheet3', 'Sheet4'].forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            if (sheet) {
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(0, 6);
                previewHTML += `<h5 style="margin-top:15px;">${sheetName}</h5><table class="preview-table"><thead><tr>`;
                if (rows[0]) {
                    rows[0].forEach(cell => { previewHTML += `<th>${cell || ''}</th>`; });
                    previewHTML += '</tr></thead><tbody>';
                    rows.slice(1).forEach(row => {
                        previewHTML += '<tr>';
                        row.forEach(cell => { previewHTML += `<td>${cell || ''}</td>`; });
                        previewHTML += '</tr>';
                    });
                }
                previewHTML += '</tbody></table>';
            }
        });
        previewContainer.innerHTML = previewHTML;
    } catch (error) { console.error('Preview error:', error); }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    setTimeout(() => { messageDiv.textContent = ''; messageDiv.className = 'message'; }, 5000);
}

// Global functions
window.applyFilters = applyFilters;
window.exportToCSV = exportToCSV;
window.updateAnalyticsPage = updateAnalyticsPage;
window.updateRevenueTargetsTable = updateRevenueTargetsTable;
window.updateCorporateWeeklyTable = updateCorporateWeeklyTable;
window.updateAssociateTable = updateAssociateTable;
window.updateWeeklyTable = updateWeeklyTable;

window.showSection = function(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) selectedSection.classList.add('active');
    document.querySelectorAll('.nav-tabs a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
    });
    if (sectionId === 'analytics') {
        const associate = document.getElementById('associateFilter')?.value || 'all';
        const month = document.getElementById('monthFilter')?.value || 'all';
        updateAnalyticsPage(associate, month);
        updateAnalyticsBanner(associate);
    }
    if (sectionId === 'performance') {
        setTimeout(() => initAdditionalCharts(), 100);
    }
};

window.showTeamTargetsEditor = function() {
    const modal = document.getElementById('teamTargetsModal');
    if (!modal) return;
    const inputs = modal.querySelectorAll('.month-target-input');
    const targets = (dataManager.teamMonthlyTargets && dataManager.teamMonthlyTargets.length === 12)
        ? dataManager.teamMonthlyTargets : dataManager.getDefaultTeamMonthlyTargets();
    inputs.forEach(input => { const idx = parseInt(input.dataset.month, 10); input.value = targets[idx] !== undefined ? targets[idx] : ''; });
    modal.style.display = 'flex';
};
window.closeTeamTargetsEditor = function() {
    const modal = document.getElementById('teamTargetsModal');
    if (modal) modal.style.display = 'none';
};
window.saveTeamMonthlyTargets = function() {
    const modal = document.getElementById('teamTargetsModal');
    if (!modal) return;
    const inputs = Array.from(modal.querySelectorAll('.month-target-input')).sort((a, b) => parseInt(a.dataset.month) - parseInt(b.dataset.month));
    const values = inputs.map(i => parseFloat(i.value) || 0);
    if (values.length !== 12) { alert('Please provide 12 monthly values.'); return; }
    dataManager.teamMonthlyTargets = values;
    dataManager.saveData();
    dataManager.calculateAggregates();
    loadCharts();
    applyFilters();
    closeTeamTargetsEditor();
    showMessage('Team monthly targets saved', 'success');
};

window.downloadTemplate = function() {
    const templateData = {
        Sheet1: [['Month', 'Associate', 'Corporates_Onboarded', 'Corporates_Riding'], [1, 'carol.ngugi@little.africa', 5, 2]],
        Sheet2: [['Corporate', 'Associate', 'Revenue', 'WEEK'], ['G4S KENYA LIMITED', 'mary.matevwa@little.africa', 79920, 'WEEK 1']],
        Sheet3: [['Associate', 'WEEK', 'Revenue'], ['lillian.lugano@little.africa', 'WEEK 40', '865858.00']],
        Sheet4: [['month_name', 'COUNTRY', 'associate_name', 'new_corporates_onboarded', 'total_revenue', 'revenue_from_new_corporates', 'total_trips'],
                 ['January', 'ETHIOPIA', 'Unidentified', 1, 4557598, 326, 8406]]
    };
    const wb = XLSX.utils.book_new();
    Object.entries(templateData).forEach(([name, data]) => {
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(data), name);
    });
    XLSX.writeFile(wb, 'sales_data_template.xlsx');
};

window.generateReport = function() {
    const reportType = document.getElementById('reportType')?.value || 'performance';
    let reportData = '';
    if (reportType === 'year_comparison') reportData = generateYearComparisonReport();
    else if (reportType === 'weekly') reportData = generateWeeklyReport();
    else if (reportType === 'monthly') reportData = generateMonthlyReport();
    else if (reportType === 'associate') reportData = generateAssociateReport();
    else reportData = generatePerformanceReport();
    const blob = new Blob([reportData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

function generatePerformanceReport() {
    let csv = 'Performance Report\n\nAssociate,Total Revenue,Total Onboarded,Status\n';
    Object.values(dataManager.overviewData.associatePerformance).forEach(a => {
        const ra = a.revenueAchievement.reduce((x, y) => x + y, 0) / a.revenueAchievement.length;
        csv += `${a.name},${a.totalRevenue},${a.totalOnboarded},${ra >= 100 ? 'On Target' : ra >= 70 ? 'Needs Attention' : 'At Risk'}\n`;
    });
    return csv;
}
function generateYearComparisonReport() {
    let csv = 'Year-over-Year Comparison\n\nMonth,Current Year,Last Year,Growth %\n';
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const current = dataManager.calculateMonthlyActuals();
    const last = dataManager.overviewData.lastYearComparison?.monthly || Array(12).fill(0);
    months.forEach((m, i) => {
        const g = last[i] > 0 ? ((current[i] - last[i]) / last[i]) * 100 : 0;
        csv += `${m},${current[i]},${last[i]},${g.toFixed(2)}%\n`;
    });
    return csv;
}
function generateWeeklyReport() {
    let csv = 'Weekly Report\n\nWeek,Date,Target,Actual,Achievement %\n';
    Object.keys(dataManager.overviewData.weeklyPerformance).sort((a, b) => parseInt(a) - parseInt(b)).forEach(w => {
        const d = dataManager.overviewData.weeklyPerformance[w];
        const ach = d.target > 0 ? (d.actual / d.target) * 100 : 0;
        csv += `Week ${w},${d.date},${d.target},${d.actual},${ach.toFixed(2)}%\n`;
    });
    return csv;
}
function generateMonthlyReport() {
    let csv = 'Monthly Report\n\nMonth,Target,Actual,Achievement %\n';
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const targets = dataManager.teamMonthlyTargets || Array(12).fill(0);
    const actuals = dataManager.calculateMonthlyActuals();
    months.forEach((m, i) => {
        const ach = targets[i] > 0 ? (actuals[i] / targets[i]) * 100 : 0;
        csv += `${m},${targets[i]},${actuals[i]},${ach.toFixed(2)}%\n`;
    });
    return csv;
}
function generateAssociateReport() {
    let csv = 'Associate Report\n\nAssociate,Total Revenue,Total Onboarded\n';
    Object.values(dataManager.overviewData.associatePerformance).forEach(a => {
        csv += `${a.name},${a.totalRevenue},${a.totalOnboarded}\n`;
    });
    return csv;
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}