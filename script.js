document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.book-card');
    const labels = [];
    const pages = [];
    let total = 0;

    cards.forEach(card => {
        labels.push(card.dataset.label || '');
        const p = parseInt(card.dataset.pages) || 0;
        pages.push(p);
        total += p;
    });

    const statsContainer = document.getElementById('data-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <h2>${total}</h2>
            <p>Páginas Totais</p>
        `;
    }

    const canvas = document.getElementById('polarChart');
    if (!canvas) return;

    let chartInstance;

    function createChart() {
        const isMobile = window.innerWidth < 768;
        
        if (chartInstance) {
            chartInstance.destroy(); // Limpa o gráfico anterior antes de criar o novo (essencial para modo dev)
        }

        chartInstance = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: pages,
                    backgroundColor: [
                        '#3776ab', '#e5c07b', '#e74c3c', '#2ecc71', '#9b59b2',
                        '#f1c40f', '#3498db', '#e67e22', '#1abc9c', '#95a5a6'
                    ],
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                layout: {
                    padding: { left: 0, right: 30, top: 0, bottom: 0 }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: Math.max(...pages) * 1.15,
                        grid: { display: false },
                        ticks: { display: false }
                    },
                    y: {
                        grid: { display: false },
                        ticks: {
                            color: '#ffffff',
                            font: { 
                                size: isMobile ? 12 : 14, 
                                weight: '700' 
                            },
                            padding: 10
                        }
                    }
                }
            }
        });
    }

    createChart();

    // Escuta mudanças de tamanho de tela para manter a responsividade 100% técnica
    window.addEventListener('resize', createChart);
});