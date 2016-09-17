define(['./GridCell'], function (GridCell) {
    function Grid(width, height, cellSize, scene) {
        var _width = width;
        var _height = height;
        var _cellSize = cellSize;
        var _scene = scene;

        this._cells = [];
        this._rows = Math.floor(_height / _cellSize);
        this._cols = Math.floor(_width / _cellSize);

        var i, j;
        for (i = 0; i < this._rows; i++)
            for (j = 0; j < this._cols; j++)
                this._cells[i * this._cols + j] = new GridCell(j * _cellSize, i * _cellSize, _cellSize, _scene);
    }

    Grid.prototype.constructor = Grid;

    Grid.prototype.drawCell = function (row, col, color) {
        if (this._cells[row * this._cols + col] === undefined)
            return;

        this._cells[row * this._cols + col].draw(color);
    };

    Grid.prototype.drawCellWithBorder = function (row, col, color, borderColor) {
        if (this._cells[row * this._cols + col] === undefined)
            return;

        this._cells[row * this._cols + col].drawWithBorder(color, borderColor);
    };

    Grid.prototype.drawFigure = function (figure, color) {
        var self = this;
        figure.partOfMe.forEach(function (square) {
            self.drawCell(square.row, square.col, color);
        });
    };

    Grid.prototype.drawFigureWithGrid = function (figure, color, gridColor) {
        var self = this;
        figure.partOfMe.forEach(function (square) {
            self.drawCellWithBorder(square.row, square.col, color, gridColor);
        });
    };

    Grid.prototype.drawGrid = function(bgColor, gridColor) {
        var i, j;
        for (i = 0; i < this._rows; i++)
            for (j = 0; j < this._cols; j++)
                this.drawCellWithBorder(i, j, bgColor, gridColor);
    };

    Grid.prototype.fillGridSolidColor = function (color) {
        var self = this;

        var i, j;
        for (i = 0; i < this._rows; i++)
            for (j = 0; j < this._cols; j++)
                self.drawCell(i, j, color);
    };

    return Grid;
});