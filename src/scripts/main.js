document.addEventListener('DOMContentLoaded', function() {
    const cartasContainer = document.getElementById('cartas-container');
    const reiniciarJogoBtn = document.getElementById('reiniciar-jogo');
    let cartas = [];
    let cartasSelecionadas = [];
    let cartasEncontradas = [];

    // Adicione suas imagens aqui
    const imagens = [
        'https://cdn.pixabay.com/photo/2016/09/25/09/14/computer-art-1693322_1280.jpg',
        'https://img.freepik.com/fotos-premium/girafa-regal-de-gigantes-graciosos-na-savana-aberta_756535-3386.jpg',
        'https://img.freepik.com/fotos-gratis/close-de-uma-arara-escarlate-vista-lateral-da-cabeca-da-arara-escarlate_488145-3540.jpg?ga=GA1.1.1705357421.1724279397&semt=ais_hybrid',
        'https://img.freepik.com/fotos-gratis/cao-close-up-a-lingua-de-fora_23-2148366805.jpg?t=st=1727369479~exp=1727373079~hmac=e12f7fd6cb3af59f73a2730b16458b03e9f0490b1bba9ed702c67071ba0c0e80&w=740',
        'https://cdn.pixabay.com/photo/2016/09/25/09/14/computer-art-1693322_1280.jpg',
        'https://img.freepik.com/fotos-premium/girafa-regal-de-gigantes-graciosos-na-savana-aberta_756535-3386.jpg',
        'https://img.freepik.com/fotos-gratis/close-de-uma-arara-escarlate-vista-lateral-da-cabeca-da-arara-escarlate_488145-3540.jpg?ga=GA1.1.1705357421.1724279397&semt=ais_hybrid',
        'https://img.freepik.com/fotos-gratis/cao-close-up-a-lingua-de-fora_23-2148366805.jpg?t=st=1727369479~exp=1727373079~hmac=e12f7fd6cb3af59f73a2730b16458b03e9f0490b1bba9ed702c67071ba0c0e80&w=740'
    ];

    function inicializarJogo() {
        cartas = shuffle(imagens.slice()); // Embaralha as imagens
        cartasSelecionadas = [];
        cartasEncontradas = [];
        renderizarCartas();
    }

    function renderizarCartas() {
        cartasContainer.innerHTML = '';
        cartas.forEach((imagem, index) => {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.dataset.imagem = imagem;
            carta.dataset.index = index;
            carta.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161466_1280.png")'; // Imagem de fundo da carta virada
            carta.addEventListener('click', virarCarta);
            cartasContainer.appendChild(carta);
        });
    }

    function virarCarta(event) {
        const carta = event.currentTarget;
        if (carta.classList.contains('virada') || cartasSelecionadas.length === 2) return;

        carta.style.backgroundImage = `url("${carta.dataset.imagem}")`; // Exibe a imagem da carta
        carta.classList.add('virada');
        cartasSelecionadas.push(carta);

        if (cartasSelecionadas.length === 2) {
            verificarPar();
        }
    }

    function verificarPar() {
        const [carta1, carta2] = cartasSelecionadas;

        if (carta1.dataset.imagem === carta2.dataset.imagem) {
            cartasEncontradas.push(carta1.dataset.imagem);
            cartasSelecionadas = [];
        } else {
            setTimeout(() => {
                carta1.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161466_1280.png")'; // Imagem de fundo da carta virada
                carta2.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2013/07/13/13/45/playing-card-161466_1280.png")';
                carta1.classList.remove('virada');
                carta2.classList.remove('virada');
                cartasSelecionadas = [];
            }, 1000);
        }

        if (cartasEncontradas.length === 4) {
            alert('Você encontrou todos os pares!');
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    reiniciarJogoBtn.addEventListener('click', inicializarJogo);
    inicializarJogo(); // Inicia o jogo na carga
});
