class Board {
    x = 0;
    y = 0;
    board;
    error;
    tab;
    turn = 0;
    phase = 0;
    player1 = {
        x: 0,
        y: 3
    };
    player2 = {
        x: 6,
        y: 3
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.board = document.getElementById('board');
        this.error = document.getElementById('error');
        this.tab = [];
        for (let i = 0; i < this.x; i++) {
            this.tab[i] = [];
            const tr = document.createElement('tr');
            this.board.appendChild(tr);
            for (let j = 0; j < this.y; j++) {
                this.tab[i][j] = false;
                const td = document.createElement('td');
                td.id = `col-${i}-${j}`;
                td.classList.add('playable');
                td.addEventListener('click', () => this.playEvent(i, j));
                this.board.appendChild(td);
            }
        }
        this.movePlayer(0, 3, this.player1, false);
        this.movePlayer(6, 3, this.player2, false);
        console.table(this.tab);
    }

    render(td, state) {
        td.classList.add(state);
    }

    movePlayer(x, y, player, flag = true) {
        const td = document.getElementById(`col-${x}-${y}`);
        const oldTd = document.getElementById(`col-${player.x}-${player.y}`);
        oldTd.classList.remove('player');
        td.classList.add('player');
        if (flag)
            this.turn % 2 === 0 ? this.player1 = {x, y} : this.player2 = {x, y};
    }

    playEvent(x, y) {
        let player = this.turn % 2 === 0 ? this.player1 : this.player2;
        const td = document.getElementById(`col-${x}-${y}`);
        if (this.phase === 0) {
            if ((player.x - x === 1 || player.x - x === -1 || player.x - x === 0) && (player.y - y === 1 || player.y - y === -1 || player.y - y === 0) && !td.classList.contains('removed')) {
                this.error.innerText = '';
                this.movePlayer(x, y, player);
                this.phase = 1;
            } else this.error.innerText = 'Mauvais mouvement !';
        } else {
            if (this.tab[x][y] === false && (x !== this.player1.x || y !== this.player1.y) && (x !== this.player2.x || y !== this.player2.y) && !td.classList.contains('removed')) {
                this.phase = 0;
                this.tab[x][y] = true;
                this.turn++;
                this.render(td, 'removed');
                this.checkWin();
            } else this.error.innerText = 'Case deja enlevee !';
        }
        console.log(this)
    }

    checkWin() {
        if ((this.tab[this.player1.x - 1] === undefined || this.tab[this.player1.x - 1][this.player1.y] === undefined || this.tab[this.player1.x - 1][this.player1.y] === true) &&
            (this.tab[this.player1.x - 1] === undefined || this.tab[this.player1.x - 1][this.player1.y - 1] === undefined || this.tab[this.player1.x - 1][this.player1.y - 1] === true) &&
            (this.tab[this.player1.x][this.player1.y - 1] === undefined || this.tab[this.player1.x][this.player1.y - 1] === true) &&
            (this.tab[this.player1.x + 1] === undefined || this.tab[this.player1.x + 1][this.player1.y] === undefined || this.tab[this.player1.x + 1][this.player1.y] === true) &&
            (this.tab[this.player1.x + 1] === undefined || this.tab[this.player1.x + 1][this.player1.y + 1] === undefined || this.tab[this.player1.x + 1][this.player1.y + 1] === true) &&
            (this.tab[this.player1.x - 1] === undefined || this.tab[this.player1.x - 1][this.player1.y + 1] === undefined || this.tab[this.player1.x - 1][this.player1.y + 1] === true) &&
            (this.tab[this.player1.x][this.player1.y + 1] === undefined || this.tab[this.player1.x][this.player1.y + 1] === true) &&
            (this.tab[this.player1.x + 1] === undefined ||this.tab[this.player1.x + 1][this.player1.y - 1] === undefined || this.tab[this.player1.x + 1][this.player1.y - 1] === true))
            alert('player 2 win');
        else if ((this.tab[this.player2.x - 1] === undefined || this.tab[this.player2.x - 1][this.player2.y] === undefined || this.tab[this.player2.x - 1][this.player2.y] === true) &&
            (this.tab[this.player2.x - 1] === undefined || this.tab[this.player2.x - 1][this.player2.y - 1] === undefined || this.tab[this.player2.x - 1][this.player2.y - 1] === true) &&
            (this.tab[this.player2.x][this.player2.y - 1] === undefined || this.tab[this.player2.x][this.player2.y - 1] === true) &&
            (this.tab[this.player2.x + 1] === undefined || this.tab[this.player2.x + 1][this.player2.y] === undefined || this.tab[this.player2.x + 1][this.player2.y] === true) &&
            (this.tab[this.player2.x + 1] === undefined || this.tab[this.player2.x + 1][this.player2.y + 1] === undefined || this.tab[this.player2.x + 1][this.player2.y + 1] === true) &&
            (this.tab[this.player2.x - 1] === undefined || this.tab[this.player2.x - 1][this.player2.y + 1] === undefined || this.tab[this.player2.x - 1][this.player2.y + 1] === true) &&
            (this.tab[this.player2.x][this.player2.y + 1] === undefined || this.tab[this.player2.x][this.player2.y + 1] === true) &&
            (this.tab[this.player2.x + 1] === undefined ||this.tab[this.player2.x + 1][this.player2.y - 1] === undefined || this.tab[this.player2.x + 1][this.player2.y - 1] === true))

            alert('player 1 win');
    }
}

const board = new Board(7, 7);
