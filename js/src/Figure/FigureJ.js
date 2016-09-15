/**
 * Created by Aky on 14.09.2016.
 */
define(['./FigurePart', './Figure'], function(FigurePart, Figure) {
    function FigureJ(row, col) {
        Figure.call(this, row, col, 4);

        this.partOfMe[0] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row + 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row + 1, this.col + 1);
    }

    FigureJ.prototype = Object.create(Figure.prototype);
    FigureJ.prototype.constructor = FigureJ;

    FigureJ.prototype.update = function () {
        switch (this.state) {
            case 0:
                //     *0
                //     *1
                //  *3 *2
                this.partOfMe[0].setRowCol(this.row - 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row + 1, this.col);
                this.partOfMe[3].setRowCol(this.row + 1, this.col - 1);
                break;
            case 1:
                //  *0 *1 *2
                //        *3
                this.partOfMe[0].setRowCol(this.row, this.col - 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col + 1);
                this.partOfMe[3].setRowCol(this.row + 1, this.col + 1);
                break;
            case 2:
                //  *2 *3
                //  *1
                //  *0
                this.partOfMe[0].setRowCol(this.row + 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row - 1, this.col);
                this.partOfMe[3].setRowCol(this.row - 1, this.col + 1);
                break;
            case 3:
                // *3
                // *2 *1 *0
                this.partOfMe[0].setRowCol(this.row, this.col + 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col - 1);
                this.partOfMe[3].setRowCol(this.row - 1, this.col - 1);
                break;
        }
    };

    return FigureJ;
});