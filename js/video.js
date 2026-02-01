/* VIDEO*/

const video = document.querySelector('.video-seccion__video');
const btnPlay = document.querySelector('.video-seccion__boton--play');
const btnPause = document.querySelector('.video-seccion__boton--pause');
const tiempoActual = document.querySelector('.js-tiempo-actual');

function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);
    const minDisplay = minutos < 10 ? `0${minutos}` : minutos;
    const secDisplay = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
    
    return `${minDisplay}:${secDisplay}`;
}

btnPlay.addEventListener('click', () => {
    video.play();
});

btnPause.addEventListener('click', () => {
    video.pause();
});

video.addEventListener('timeupdate', () => {
    const tiempo = video.currentTime;
    tiempoActual.textContent = formatearTiempo(tiempo);
});