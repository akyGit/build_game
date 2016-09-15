/**
 * Created by Aky on 14.09.2016.
 */
define(['./FigurePart', './Figure'], function(FigurePart, Figure) {
    function FigureT(row, col) {
        Figure.call(this, row, col, 4);

        this.partOfMe[0] = new FigurePart(this.row, this.col - 1);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row, this.col + 1);
        this.partOfMe[3] = new FigurePart(this.row - 1, this.col);
    }

    FigureT.prototype = Object.create(Figure.prototype);
    FigureT.prototype.constructor = FigureT;

    FigureT.prototype.update = function () {
        switch (this.state) {
            case 0:
                //    *3
                // *0 *1 *2
                this.partOfMe[0].setRowCol(this.row, this.col - 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col + 1);
                this.partOfMe[3].setRowCol(this.row - 1, this.col);
                break;
            case 1:
                //  *0
                //  *1 *3
                //  *2
                this.partOfMe[0].setRowCol(this.row - 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row + 1, this.col);
                this.partOfMe[3].setRowCol(this.row, this.col + 1);
                break;
            case 2:
                // *2 *1 *0
                //    *3
                this.partOfMe[0].setRowCol(this.row, this.col + 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col - 1);
                this.partOfMe[3].setRowCol(this.row + 1, this.col);
                break;
            case 3:
                //    *2
                // *3 *1
                //    *0
                this.partOfMe[0].setRowCol(this.row + 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row - 1, this.col);
                this.partOfMe[3].setRowCol(this.row, this.col - 1);
                break;
        }
    };

    return FigureT;
});