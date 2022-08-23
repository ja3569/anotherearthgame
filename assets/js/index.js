
grid_length = 4;
max_score = 2;

function generateRandomTile() {
    let col = Math.floor(Math.random() * (grid_length));
    let row = Math.floor(Math.random() * (grid_length));
    let position = Math.random() * (grid_length); // integers between 0 to 3
    if (grid[col][row] !== 0) {//tile is occupied
        generateRandomTile();
    } else {
        if (position < 2.3)
            grid[col][row] = 2;
        else
            grid[col][row] = 4;
    }
};


var gameObject = {
    if_end: 1,
    
    generateNewGame: function() {
        max_score = 2;
        grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        row = 0;
        col = 0;
        generateRandomTile();
        /**
        document.getElementById("navbar navbar" + 1).style.display = "none";
        document.getElementById("navbar" + 2).style.display = "none";
         */
        this.changeHTMLElement();


        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37:
                    this.shiftLeft();
                    break;
                case 38:
                    this.shiftUp();
                    break;
                case 39:
                    this.shiftRight();
                    break;
                case 40:
                    this.shiftDown();
                    break;
            }
        });
    },

    shiftLeft: function() {
        let prev_grid = String(grid);
        for (let col = 0; col < grid_length; col++) {
            for (let row = 0; row < 3; row++) {
                let check_left = checkLeft(col, row);
                if (check_left == -1) {
                    break;
                }
                if (grid[col][row] == 0) {
                    grid[col][row] = grid[col][check_left];
                    grid[col][check_left] = 0;
                    row--;
                } else if (grid[col][row] == grid[col][check_left]) {
                    grid[col][row] = grid[col][row] * 2;
                    grid[col][check_left] = 0;
                }
            }
        }
        if (prev_grid !== String(grid)) {
            generateRandomTile();
            if (!checkEnd()) {
                this.if_end = 0;
            }
            this.changeHTMLElement();
        }
    },

    
    shiftRight: function() {
        let prev_grid = String(grid);
        for (let col = 0; col < 4; col++) {
            for (let row = 3; row > 0; row--) {
                let check_right = checkRight(col, row);
                if (check_right  == -1) {
                    break;
                }
                if (grid[col][row] == 0) {
                    grid[col][row] = grid[col][check_right];
                    grid[col][check_right ] = 0;
                    row++;
                } else if (grid[col][row] == grid[col][check_right]) {
                    grid[col][row] *= 2;
                    grid[col][check_right ] = 0;
                }
            }
        }
        if (prev_grid !== String(grid)) {
            generateRandomTile();
            if (!checkEnd()) {
                this.if_end = 0;
            }
            this.changeHTMLElement();
        }

    },

    
    shiftUp: function() {
        let prev_grid = String(grid);
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 3; col++) {
                let check_up = checkUp(col, row);
                if (check_up == -1) {
                    break;
                }
                if (grid[col][row] == 0) {
                    grid[col][row] = grid[check_up][row];
                    grid[check_up][row] = 0;
                    col--;
                } else if (grid[col][row] == grid[check_up][row]) {
                    grid[col][row] *= 2;
                    grid[check_up][row] = 0;
                }
                
            }
        }
        if (prev_grid !== String(grid)) {
            generateRandomTile();
            if (!checkEnd()) {
                this.if_end = 0;
            }
            this.changeHTMLElement();
        }
    },
    
    shiftDown: function() {
        let prev_grid = String(grid);
        for (let row = 0; row < 4; row++) {
            for (let col = 3; col > 0; col--) {
                let check_down = checkDown(col, row);
                if (check_down == -1) {
                    break;
                }
                if (grid[col][row] == 0) {
                    grid[col][row] = grid[check_down][row];
                    grid[check_down][row] = 0;
                    col++;
                } else if (grid[col][row] == grid[check_down][row]) {
                    grid[col][row] *= 2;
                    grid[check_down][row] = 0;
                }
            }
        }
        if (prev_grid !== String(grid)) {
            generateRandomTile();
            if (!checkEnd()) {
                this.if_end = 0;
            }
            this.changeHTMLElement();
        }
    },
    
    changeHTMLElement: function() {
        if (this.if_end == 0) {
            document.getElementById("grid").style.display = "none";
            document.getElementById("ifEnd").style.display = "flex";
            
        } else {
            document.getElementById("ifEnd").style.display = "none";
            document.getElementById("navbar" + max_score).style.display = "none";
            
        }
        for (let row = 0; row < grid_length; row++) {
            for (let col = 0; col < grid_length; col++) {
                let html = document.getElementById((row+1) + "" + (col+1));
                html.className = "tile planet_" + grid[row][col];
                html.innerHTML = grid[row][col];
                if (grid[row][col] > max_score) {
                    max_score = grid[row][col];
                }
                
                for (let count = 1; count <=11; count++) {
                    let tile_id = Math.pow(2, count);
                    if (tile_id != max_score) {
                        document.getElementById("navbar"+tile_id).style.display = "none";
                    }
                }
                document.getElementById("navbar" + max_score).style.display = "flex";
                 
            }
        }
    }
}

gameObject.generateNewGame();
document.getElementById('restart').addEventListener('click', function() {
    gameObject.if_end=1;
    document.getElementById("ifEnd").style.display = "none";
    document.getElementById("grid").style.display = "flex";
    document.getElementById("restart").style.display = "flex";
    gameObject.generateNewGame();
});

