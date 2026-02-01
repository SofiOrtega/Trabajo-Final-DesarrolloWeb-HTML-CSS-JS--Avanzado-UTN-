/* Drag and Drop para el Rompecabezas/Puzzle (Funciona en compus y celulares) */

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
    zona.addEventListener('dragover', (e) => e.preventDefault());
    zona.addEventListener('drop', (e) => {
        e.preventDefault();
        const idPieza = e.dataTransfer.getData('id_pieza');
        soltarPieza(document.getElementById(idPieza), zona);
    });
});

piezas.forEach(pieza => {
    pieza.addEventListener('touchstart', (e) => {
        if (pieza.getAttribute('draggable') === 'false') return;
        pieza.classList.add('arrastrando');
    });

    pieza.addEventListener('touchmove', (e) => {
        if (pieza.getAttribute('draggable') === 'false') return;
        e.preventDefault();
        
        const toque = e.touches[0];
        pieza.style.position = 'fixed';
        pieza.style.zIndex = '1000';
        pieza.style.left = `${toque.clientX - 50}px`;
        pieza.style.top = `${toque.clientY - 50}px`;
    });

    pieza.addEventListener('touchend', (e) => {
        if (pieza.getAttribute('draggable') === 'false') return;
        pieza.style.position = 'static';
        pieza.classList.remove('arrastrando');

        const toque = e.changedTouches[0];
        const elementoDebajo = document.elementFromPoint(toque.clientX, toque.clientY);
        const zonaDestino = elementoDebajo ? elementoDebajo.closest('.puzzle__zona') : null;

        if (zonaDestino && zonaDestino.querySelectorAll('img').length === 0) {
            soltarPieza(pieza, zonaDestino);
        } else {
            pieza.style.position = 'relative';
            pieza.style.left = '0';
            pieza.style.top = '0';
        }
    });
});

function soltarPieza(pieza, zona) {
    zona.innerHTML = '';
    zona.appendChild(pieza);
    
    pieza.setAttribute('draggable', 'false');
    pieza.style.cursor = 'default';
    pieza.style.position = 'static';

    if (zona.dataset.id !== pieza.dataset.id) {
        errores++;
    }

    piezasColocadas++;

    if (piezasColocadas === 3) {
        verificarResultado();
    }
}

function verificarResultado() {
    feedback.style.display = 'block';
    if (errores === 0) {
        contenidoZonas.classList.add('puzzle__zonas--unir');
        mensajeTexto.classList.add('puzzle__mensaje--exito');
        mensajeTexto.innerHTML = "¡Felicitaciones!<br>Has resuelto correctamente el puzzle";
    } else {
        mensajeTexto.style.color = "#d32f2f";
        mensajeTexto.innerHTML = "Lo sentimos, no has resuelto bien el puzzle.<br>Prueba otra vez";
    }
}

btnReiniciar.addEventListener('click', () => location.reload());
