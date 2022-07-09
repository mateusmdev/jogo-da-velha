const jogo = {
    campos: ['', '', '', '', '', '', '', '', ''],
    simbolos: ['X', 'O'],
    index: 0,
    gameover: false,
    sequencias: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
    botao: null,

    init() {
        this.botao = document.getElementById('iniciar');
        this.botao.addEventListener('click', () => this.iniciar(), false);
        this.desenhar();
    },

    iniciar() {
        this.campos.fill('');
        this.index = 0;
        this.gameover = false;
        this.desenhar();
    },

    jogada(indice) {
        if (this.gameover)
            return

        if (this.campos[indice] === '') {
            this.campos[indice] = this.simbolos[this.index];
            let vencedor = this.verificaJogada();
            this.desenhar();
            if (vencedor > -1){
                this.vitoria(vencedor);
                this.gameover = true;
            }
            this.index = (this.index === 1) ? 0 : 1;
        }
    },

    desenhar() {
        let app = document.getElementById('app');
        app.innerHTML = '';

        for (let i = 0; i < this.campos.length; i++) {
            let novaDiv = document.createElement('div');
            novaDiv.textContent = this.campos[i];
            novaDiv.addEventListener('click', () => this.jogada(i), false);
            app.appendChild(novaDiv);
        }
    },

    verificaJogada() {
        for (let i in this.sequencias) {

            if (this.campos[this.sequencias[i][0]] === this.simbolos[this.index] &&
                this.campos[this.sequencias[i][1]] === this.simbolos[this.index] &&
                this.campos[this.sequencias[i][2]] === this.simbolos[this.index]) {

                return i;
            }
        }
        return -1;
    },
    vitoria(posicao){
        let elementos = document.getElementsByTagName('div');
        let sequencia =  this.sequencias[posicao];

        for(let i in sequencia){
            elementos[sequencia[i] + 1].style.boxShadow = '0px 0px 8px orangered';
        }
    }
}

jogo.init();