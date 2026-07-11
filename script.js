// Konfigurasi Lapisan Kelopak Mawar (Berdasarkan konsep PETAL_LAYERS di video Anda)
const PETAL_LAYERS = [
    { count: 6,  w: 35,  h: 45,  rotX: 15, transZ: 5,   delayBase: 0 },   // Lapisan Inti Dalam
    { count: 10, w: 55,  h: 65,  rotX: 30, transZ: 12,  delayBase: 8 }, 
    { count: 14, w: 75,  h: 85,  rotX: 45, transZ: 20,  delayBase: 18 },
    { count: 18, w: 95,  h: 105, rotX: 60, transZ: 28,  delayBase: 30 },
    { count: 22, w: 115, h: 125, rotX: 75, transZ: 35,  delayBase: 44 }   // Lapisan Luar Lebar
];

document.addEventListener('DOMContentLoaded', () => {
    simulateLoading();
    
    const bloomBtn = document.getElementById('bloomBtn');
    bloomBtn.addEventListener('click', () => {
        // Sembunyikan Loading Card, Munculkan Mawar
        document.getElementById('loadingCard').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingCard').classList.add('hidden');
            const roseContainer = document.getElementById('roseContainer');
            roseContainer.classList.remove('hidden');
            setTimeout(() => roseContainer.style.opacity = '1', 50);
            
            // Jalankan pembuatan kelopak bunga mawar
            createPetals();
        }, 800);
    });
});

// Simulasi Loading Bar
function simulateLoading() {
    const progressBar = document.getElementById('progressBar');
    const statusText = document.getElementById('statusText');
    const bloomBtn = document.getElementById('bloomBtn');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            statusText.textContent = "Ready to bloom!";
            bloomBtn.removeAttribute('disabled');
            bloomBtn.classList.add('ready');
        }
        progressBar.style.width = progress + '%';
    }, 150);
}

// Logika Pembuatan Kelopak Mawar Matematik (Sesuai potongan kode di video)
function createPetals() {
    const flowerHead = document.getElementById('flowerHead');

    PETAL_LAYERS.forEach((layer, li) => {
        const angleStep = 360 / layer.count;
        // Memberikan sedikit offset acak antar lapisan agar kelopak tidak bertumpuk lurus sejajar
        const layerOffset = li * 24 + (Math.random() - 0.5) * 8;

        for (let i = 0; i < layer.count; i++) {
            const petal = document.createElement('div');
            petal.className = `petal layer-${li}`;
            
            // Mengalkulasi Sudut Rotasi & Variasi Acak halus (mirip potongan kode di video)
            const angle = layerOffset + i * angleStep + (Math.random() - 0.5) * 5;
            const delay = (layer.delayBase + i) * 0.03 + (Math.random() - 0.5) * 0.05;
            const scaleJitter = 0.94 + Math.random() * 0.12;
            const bloomDur = 2.1 + Math.random() * 0.4;
            
            // Mengatur Ukuran Kelopak
            petal.style.width = `${layer.w}px`;
            petal.style.height = `${layer.h}px`;
            
            // Menyimpan variabel CSS secara dinamis untuk dibaca di keyframes CSS
            petal.style.setProperty('--rotY', `${angle}deg`);
            petal.style.setProperty('--rotX', `${layer.rotX + (Math.random() - 0.5) * 6}deg`);
            petal.style.setProperty('--transZ', `${layer.transZ}px`);
            petal.style.setProperty('--scale', scaleJitter);
            
            // Memicu animasi CSS secara bertahap
            petal.style.animation = `bloomAction ${bloomDur}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`;
            petal.style.animationDelay = `${delay}s`;

            flowerHead.appendChild(petal);
        }
    });
}
