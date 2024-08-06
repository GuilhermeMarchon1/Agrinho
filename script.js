// Simulação de dados de sensores
let sensorData = {
    ph: 7,
    turbidity: 1,
    temperature: 25
};

let phData = [];
let turbidityData = [];
let temperatureData = [];
let labels = [];

// Configuração dos gráficos
let phChart = new Chart(document.getElementById('phChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'pH',
            data: phData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Hora' }},
            y: { beginAtZero: true, max: 14, title: { display: true, text: 'pH' }}
        }
    }
});

let turbidityChart = new Chart(document.getElementById('turbidityChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Turbidez (NTU)',
            data: turbidityData,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Hora' }},
            y: { beginAtZero: true, max: 10, title: { display: true, text: 'NTU' }}
        }
    }
});

let temperatureChart = new Chart(document.getElementById('temperatureChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperatura (°C)',
            data: temperatureData,
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Hora' }},
            y: { beginAtZero: true, max: 100, title: { display: true, text: '°C' }}
        }
    }
});

// Função para atualizar a exibição dos dados
function updateDisplay() {
    let currentTime = new Date().toLocaleTimeString();

    phData.push(sensorData.ph);
    turbidityData.push(sensorData.turbidity);
    temperatureData.push(sensorData.temperature);
    labels.push(currentTime);

    if (phData.length > 20) {
        phData.shift();
        turbidityData.shift();
        temperatureData.shift();
        labels.shift();
    }

    phChart.update();
    turbidityChart.update();
    temperatureChart.update();

    checkAlerts();
}

// Função para verificar alertas
function checkAlerts() {
    let alerts = document.getElementById('alerts');
    alerts.innerHTML = '';

    if (sensorData.ph < 6.5 || sensorData.ph > 8.5) {
        alerts.innerHTML += '<p>Alerta: Nível de pH fora do padrão!</p>';
    }
    if (sensorData.turbidity > 5) {
        alerts.innerHTML += '<p>Alerta: Turbidez elevada!</p>';
    }
    if (sensorData.temperature < 0 || sensorData.temperature > 35) {
        alerts.innerHTML += '<p>Alerta: Temperatura fora do padrão!</p>';
    }
}

// Atualiza os dados e exibição a cada 5 segundos (simulação de leitura de sensores)
setInterval(() => {
    // Atualiza os valores simulados dos sensores
    sensorData.ph = (Math.random() * 4 + 6).toFixed(1); // Simula pH entre 6 e 10
    sensorData.turbidity = (Math.random() * 10).toFixed(1); // Simula turbidez entre 0 e 10 NTU
    sensorData.temperature = (Math.random() * 40).toFixed(1); // Simula temperatura entre 0 e 40°C

    updateDisplay();
}, 5000);

// Inicializa a exibição ao carregar a página
updateDisplay();