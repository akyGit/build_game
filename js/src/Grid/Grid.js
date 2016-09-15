/**
 * Created by Aky on 14.09.2016.
 */
define(['./GridCell'], function (GridCell) {
    function Grid(width, height, cellSize, scene) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.scene = scene;

        this.cells = [];
        this.rows = Math.floor(this.height / cellSize);
        this.cols = Math.floor(this.width / cellSize);

        var i, j;
        for (i = 0; i < this.rows; i++)
            for (j = 0; j < this.cols; j++)
                this.cells[i * this.cols + j] = new GridCell(j * this.cellSize, i * this.cellSize, this.cellSize, this.scene);
    }

    Grid.prototype.constructor = Grid;

    Grid.prototype.drawCell = function (row, col, color) {
        if (this.cells[row * this.cols + col] === undefined)
            return;

        this.cells[row * this.cols + col].draw(color);
    };

    Grid.prototype.drawFigure = function (figure, color) {
        var self = this;
        figure.partOfMe.forEach(function (square) {
            self.drawCell(square.row, square.col, color);
        });
    };

    Grid.prototype.fillGridSolidColor = function (color) {
        var self = this;

        var i, j;
        for (i = 0; i < this.rows; i++)
            for (j = 0; j < this.cols; j++)
                self.drawCell(i, j, color);
    };

    return Grid;
});