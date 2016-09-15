/**
 * Created by Aky on 14.09.2016.
 */
define(['./FigurePart', './Figure'], function(FigurePart, Figure) {
    function FigureS(row, col) {
        Figure.call(this, row, col, 2);

        this.partOfMe[0] = new FigurePart(this.row, this.col - 1);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row - 1, this.col + 1);
    }

    FigureS.prototype = Object.create(Figure.prototype);
    FigureS.prototype.constructor = FigureS;

    FigureS.prototype.update = function () {
        switch (this.state) {
            case 0:
                //    *2 *3
                // *0 *1
                this.partOfMe[0].setRowCol(this.row, this.col - 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row - 1, this.col);
                this.partOfMe[3].setRowCol(this.row - 1, this.col + 1);
                break;
            case 1:
                // *0
                // *1 *2
                //    *3
                this.partOfMe[0].setRowCol(this.row - 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col + 1);
                this.partOfMe[3].setRowCol(this.row + 1, this.col + 1);
                break;
        }
    };

    return FigureS;
});