/* Drag and Drop para el Rompecabezas/Puzzle */

const piezas = document.querySelectorAll('.puzzle__pieza');
const zonas = document.querySelectorAll('.puzzle__zona');
const contenidoZonas = document.getElementById('contenidoZonas');
const feedback = document.getElementById('feedback');
const mensajeTexto = document.getElementById('mensajeTexto');
const btnReiniciar = document.getElementById('btnReiniciar');

let piezasColocadas = 0;
let errores = 0;

piezas.forEach(pieza => {
    pieza.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('id_pieza', e.target.id);
    });
});

zonas.forEach(zona => {
    zona.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    zona.addEventListener('drop', (e) => {
        e.preventDefault();
        const idPieza = e.dataTransfer.getData('id_pieza');
        const piezaArrastrada = document.getElementById(idPieza);

        if (zona.querySelectorAll('img').length === 0) {
            zona.innerHTML = '';
            zona.appendChild(piezaArrastrada);
            piezaArrastrada.setAttribute('draggable', 'false');
            piezaArrastrada.style.cursor = 'default';
            if (zona.dataset.id !== piezaArrastrada.dataset.id) {
                errores++;
            }
            piezasColocadas++;
            if (piezasColocadas === 3) {
                verificarResultado();
            }
        }
    });
});

function verificarResultado() {
    feedback.style.display = 'block';
    if (errores === 0) {
        contenidoZonas.classList.add('puzzle__zonas--unir');
        mensajeTexto.classList.add('puzzle__mensaje--exito');
        mensajeTexto.innerHTML = "¡Felicitaciones!<br>Has resuelto correctamente el puzzle";
        btnReiniciar.textContent = "Volver a jugar";
    } else {
        mensajeTexto.style.color = "#d32f2f";
        mensajeTexto.innerHTML = "Lo sentimos, no has resuelto bien el puzzle. Prueba otra vez...";
        btnReiniciar.textContent = "Inténtalo una vez más";
    }
}
btnReiniciar.addEventListener('click', () => {
    location.reload();
});