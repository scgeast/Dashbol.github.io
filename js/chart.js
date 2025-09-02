// File: js/chart.js

// Initialize charts
function initCharts() {
    // Status Pengiriman Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Terkirim', 'Tertunda', 'Dibatalkan'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    '#2ecc71',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Volume per Tanggal Chart
    const volumeCtx = document.getElementById('volumeChart').getContext('2d');
    volumeChart = new Chart(volumeCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Volume Order',
                    data: [],
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                },
                {
                    label: 'Volume Terkirim',
                    data: [],
                    backgroundColor: '#2ecc71',
                    borderColor: '#27ae60',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Performa per Plant Chart
    const plantCtx = document.getElementById('plantChart').getContext('2d');
    plantChart = new Chart(plantCtx, {
        type: 'pie',
        data: {
            labels: ['Denpasar 2', 'Gianyar'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    '#3498db',
                    '#9b59b6'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Update charts with new data
function updateCharts(totalVolume, deliveredVolume, pendingVolume, denpasarOrder, gianyarOrder) {
    // Update status chart
    statusChart.data.datasets[0].data = [deliveredVolume, pendingVolume, 0];
    statusChart.update();
    
    // Update plant chart
    plantChart.data.datasets[0].data = [denpasarOrder, gianyarOrder];
    plantChart.update();
    
    // Update volume chart with dates
    const dateData = {};
    deliveryData.forEach(item => {
        const date = formatDisplayDate(item.date);
        if (!dateData[date]) {
            dateData[date] = { order: 0, delivered: 0 };
        }
        dateData[date].order += item.qtyOrder;
        dateData[date].delivered += item.qtyDelivered;
    });
    
    const dates = Object.keys(dateData).sort();
    const orderData = dates.map(date => dateData[date].order);
    const deliveredData = dates.map(date => dateData[date].delivered);
    
    volumeChart.data.labels = dates;
    volumeChart.data.datasets[0].data = orderData;
    volumeChart.data.datasets[1].data = deliveredData;
    volumeChart.update();
}
