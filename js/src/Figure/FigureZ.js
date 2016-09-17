define(['./FigurePart', './Figure'], function(FigurePart, Figure) {
    function FigureZ(row, col) {
        Figure.call(this, row, col, 2);

        this.partOfMe[0] = new FigurePart(this.row, this.col + 1);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row - 1, this.col - 1);
    }

    FigureZ.prototype = Object.create(Figure.prototype);
    FigureZ.prototype.constructor = FigureZ;

    FigureZ.prototype.update = function () {
        switch (this.state) {
            case 0:
                //  *3 *2
                //     *1 *0
                this.partOfMe[0].setRowCol(this.row, this.col + 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row - 1, this.col);
                this.partOfMe[3].setRowCol(this.row - 1, this.col - 1);
                break;
            case 1:
                //    *3
                // *1 *2
                // *0
                this.partOfMe[0].setRowCol(this.row + 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col + 1);
                this.partOfMe[3].setRowCol(this.row - 1, this.col + 1);
                break;
        }
    };

    return FigureZ;
});