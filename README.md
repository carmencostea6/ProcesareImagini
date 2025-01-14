
# Aplicație de Procesare a Imaginilor cu HTML5 Canvas

Această aplicație permite încărcarea și procesarea imaginilor folosind JavaScript și HTML5 Canvas. Utilizatorul poate încărca automat o imagine de pe internet, aplica efecte vizuale de oglindire și netezire, și vizualiza un log al timpului necesar pentru fiecare acțiune.

---

## Caracteristici principale
1. **Încărcarea unei imagini aleatorii de la Dog API**: La încărcarea paginii, aplicația descarcă și afișează o imagine aleatorie.
2. **Oglindirea imaginii pe axa X**: Permite inversarea imaginii pe orizontală.
3. **Netezirea imaginii**: Aplică un filtru de netezire folosind o mască de convoluție 3x3.
4. **Log de procesare**: Afișează timpul necesar pentru aplicarea fiecărui efect.

---

## Teorie

### Canvas în HTML5
Canvas este un element HTML5 folosit pentru desenarea graficii dinamice. Prin JavaScript, acest element permite încărcarea, manipularea și afișarea imaginilor sau graficii vectoriale.

### Oglindirea și Netezirea Imaginilor
- **Oglindire**: Inversarea pixelilor pe axa X prin scalarea contextului canvas-ului pe orizontală cu o valoare negativă.
- **Netezire**: Se utilizează o tehnică de convoluție aplicată pixelilor imaginii pentru a calcula o valoare medie pe baza vecinilor.

### Asincronismul în JavaScript
Pentru o performanță optimă, netezirea imaginii este procesată pe secțiuni utilizând promisiuni și `setTimeout` pentru a păstra aplicația receptivă.

---

## Implementare

### HTML
Structura HTML include:
- Un element `<canvas>` pentru afișarea imaginii.
- Două butoane pentru a aplica efectele de oglindire și netezire.
- Un container pentru log-ul de procesare.

### CSS
Fișierul CSS organizează și stilizează aplicația:
- Elementele sunt centrate pe pagină.
- Canvas-ul este redimensionat proporțional.

### JavaScript
Aplicația este interactivă și include funcționalități pentru:
- **Încărcarea imaginii**: Folosind Dog API, imaginea este descărcată și afișată pe canvas.
- **Oglindire**: Transformarea coordonatelor cu `scale()` pentru inversarea imaginii.
- **Netezire**: Aplicarea unei măști de convoluție 3x3, procesând pixelii imaginii pe secțiuni pentru performanță sporită.
- **Log-ul de procesare**: Afișarea timpului necesar fiecărei operațiuni.

---

## Descrierea Funcționalităților

1. **Vizualizarea unei imagini aleatorii**:
   - Imaginea este descărcată automat de la Dog API.
   - Este afișată pe canvas la încărcarea paginii.

2. **Oglindirea imaginii**:
   - La apăsarea butonului "Mirror Image", imaginea este inversată pe axa X.

3. **Netezirea imaginii**:
   - La apăsarea butonului "Smooth Image", este aplicat un filtru de netezire folosind o mască de convoluție 3x3.

4. **Log-ul de procesare**:
   - După aplicarea fiecărui efect, timpul de procesare este afișat pentru utilizator.

---

## Module

### `loadImage`
- Încărcarea unei imagini aleatorii folosind Dog API.
- Redarea imaginii pe canvas.

### `mirrorButton`
- Oglindirea imaginii pe axa X.
- Folosește transformarea coordonatelor prin funcția `scale`.

### `smoothButton`
- Aplicarea unei măști de convoluție 3x3 pentru netezire.
- Procesarea este optimizată prin secționarea imaginii.

### `updateProcessingLog`
- Actualizează log-ul cu timpul necesar pentru fiecare operațiune.

---

## Bibliografie

- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images)
- [JavaScript Asynchronous Programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [Dog API](https://dog.ceo/dog-api/)
- [W3Schools JavaScript API Guide](https://www.w3schools.com/js/js_api_intro.asp)

---
