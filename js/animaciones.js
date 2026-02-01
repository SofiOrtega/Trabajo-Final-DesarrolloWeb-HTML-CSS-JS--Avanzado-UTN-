document.addEventListener('DOMContentLoaded', () => {
    
    const elementos = document.querySelectorAll('.historia__visual, .historia__info, .tarjeta');
    const opciones = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    };

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('aparecer');
                observador.unobserve(entrada.target);
            }
        });
    }, opciones);

    elementos.forEach(el => observador.observe(el));
});