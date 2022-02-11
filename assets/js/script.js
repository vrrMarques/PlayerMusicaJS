 let musicas = [
    {titulo:'black Summer', dev:'Codigo por Vinicius Marques', source:'./assets/music/blackSummer.mp3', img:'./assets/images/rock.jpg'},
    {titulo:'Californication', dev:'Codigo por Vinicius Marques', source:'./assets/music/californication.mp3', img:'./assets/images/samba.jpg'},
    {titulo:'Dark Necessities', dev:'Codigo por Vinicius Marques', source:'./assets/music/DarkNecessities.mp3', img:'./assets/images/piano.jpg'}
];

// INICIO
let musica = document.querySelector('audio');
let musicaIndex = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');
let botaoPlay = document.querySelector('.botao-play');
let botaoPause = document.querySelector('.botao-pause');
let setaAnterior = document.querySelector('.anterior');
let setaProximo = document.querySelector('.proximo')

renderizarMusica(musicaIndex);


// EVENTOS
botaoPlay.addEventListener('click', tocarMusica);

botaoPause.addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

setaAnterior.addEventListener('click', () => {
    musicaIndex--; 
    if (musicaIndex < 0){
        musicaIndex = 2;
    }
    renderizarMusica(musicaIndex);
    botaoPlay.style.display = 'block';
    botaoPause.style.display = 'none';
});

setaProximo.addEventListener('click', () => {
    musicaIndex++;
    if (musicaIndex > 2){
        musicaIndex = 0;
    }
    renderizarMusica(musicaIndex);
    botaoPlay.style.display = 'block';
    botaoPause.style.display = 'none';
    
});

// FUNÇÕES

function renderizarMusica(musicaIndex){
    musica.setAttribute('src', musicas[musicaIndex].source);

    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].dev;
        imagem.src = musicas[musicaIndex].img;
    
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

    
    });

   
}

function tocarMusica(){
    musica.play();
    botaoPlay.style.display = 'none';
    botaoPause.style.display = 'block';
}

function pausarMusica(){
    musica.pause();
    botaoPlay.style.display = 'block';
    botaoPause.style.display = 'none';
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10){
        campoSegundos = '0'+ campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`;
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration)*100) + '%';
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

