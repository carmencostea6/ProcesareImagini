const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d");
const processingLog = document.getElementById("processing-log");
const mirrorButton = document.getElementById("mirror-button");
const smoothButton = document.getElementById("smooth-button");

let loadedImage = null; // Variabilă pentru a stoca imaginea încărcată
let isMirrored = false; // Variabilă pentru a ține evidența stării de oglindire

// Funcție pentru încărcarea imaginii automat la refresh
async function loadImage() {
    try {
        // Obține imaginea de la Dog API
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();

        // Încarca imaginea
        const image = new Image();
        image.crossOrigin = "Anonymous"; // Permite procesarea imaginii din alte domenii
        image.src = data.message;

        image.onload = () => {
            // Setez dimensiunile canvasului și desenez imaginea
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            loadedImage = image; // Salvez imaginea încărcată
        };
    } catch (error) {
        console.error("Eroare la încărcarea imaginii:", error);
    }
}

// Funcție pentru oglindirea imaginii
mirrorButton.addEventListener("click", () => {
    if (!loadedImage) {
        alert("Vă rugăm să așteptați încărcarea imaginii.");
        return;
    }

    const mirrorStartTime = performance.now();
    const width = canvas.width;
    const height = canvas.height;

    // Resetez transformările anterioare
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);

    // Aplic oglindirea 
    if (isMirrored) {
        ctx.drawImage(loadedImage, 0, 0); // Imaginea originală
    } else {
        ctx.scale(-1, 1); // Oglindesc axa X
        ctx.drawImage(loadedImage, -width, 0); // Desenez imaginea oglindită
    }

    isMirrored = !isMirrored; // Schimb starea de oglindire
    const mirrorTime = performance.now() - mirrorStartTime;
    updateProcessingLog(`Imagine oglindită în ${mirrorTime.toFixed(2)} ms`);
});
// Funcție pentru netezirea imaginii
smoothButton.addEventListener("click", async () => {
    if (!loadedImage) {
        alert("Vă rugăm să așteptați încărcarea imaginii.");
        return;
    }

    const smoothingStartTime = performance.now();

    // Obțin datele imaginii din canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    const smoothedData = new Uint8ClampedArray(data);

    // Masca de convoluție pentru netezire
    const kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ];
    const kernelSize = 3;
    const kernelSum = kernel.flat().reduce((a, b) => a + b, 0);

    // Funcție de procesare a unei secțiuni
    const processSection = (startY, endY) => {
        for (let y = startY; y < endY; y++) {
            for (let x = 1; x < width - 1; x++) {
                let r = 0, g = 0, b = 0;

                // Iterez prin vecinii pixelului curent
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
                        const kernelValue = kernel[ky + 1][kx + 1];
                        r += data[pixelIndex] * kernelValue;
                        g += data[pixelIndex + 1] * kernelValue;
                        b += data[pixelIndex + 2] * kernelValue;
                    }
                }

                // Calculez valorile medii și actualizez pixelul
                const destIndex = (y * width + x) * 4;
                smoothedData[destIndex] = r / kernelSum;
                smoothedData[destIndex + 1] = g / kernelSum;
                smoothedData[destIndex + 2] = b / kernelSum;
            }
        }
    };

    // Procesare asincronă pe 4 secțiuni
    let sectionPromises = [];
    for (let i = 0; i < 4; i++) {
        const startY = Math.floor(i * height / 4);
        const endY = Math.floor((i + 1) * height / 4);

        sectionPromises.push(
            new Promise((resolve) => {
                setTimeout(() => {
                    processSection(startY, endY);
                    // Afișez progresul pe canvas după fiecare secțiune procesată
                    ctx.putImageData(new ImageData(smoothedData, width, height), 0, 0);
                    resolve();
                }, 1000 * i);  // Pauză de 1 secundă între secțiuni
            })
        );
    }

    // Aștept finalizarea tuturor secțiunilor
    await Promise.all(sectionPromises);

    const smoothingTime = performance.now() - smoothingStartTime;
    updateProcessingLog(`Imagine netezită în ${smoothingTime.toFixed(2)} ms`);
});

// Funcție pentru actualizarea log-ului de procesare
function updateProcessingLog(message) {
    processingLog.textContent = message; // Suprascrie orice mesaj anterior
}

// Încărcă automat imaginea la refresh
window.onload = loadImage;
