function checkLeft(col, row) {
    for (let r = (row + 1); r < grid_length; r++) {
        if (grid[col][r] != 0)
            return r;
    }
    return -1;
};


function checkRight(col, row) {
    for (let r = (row - 1); r >= 0; r--) {
        if (grid[col][r] != 0)
            return r;
    }
    return -1;
};

function checkUp(col, row) {
    for (let c = (col + 1); c < grid_length; c++) {
        if (grid[c][row] != 0)
            return c;
    }
    return -1;
};


function checkDown(col, row) {
    for (let c = (col - 1); c >= 0; c--) {
        if (grid[c][row] != 0)
            return c;
    }
    return -1;
};


function checkEnd() {
    for (let row = 0; row < grid_length; row++) {
        for (let col = 0; col < grid_length; col++){
            if (grid[col][row] == 0) {
                return true;
            } else if (row < grid_length - 1 && grid[col][row] == grid[col][row + 1]) {
                return true;
            } else if (col < grid_length - 1 && grid[col][row] == grid[col + 1][row]) {
                return true;
            }
        }
    }
    return false;
};









