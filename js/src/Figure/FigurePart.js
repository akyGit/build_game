define([], function(){
    function FigurePart(row, col) {
        this.row = row || 0;
        this.col = col || 0;
    }

    FigurePart.prototype.constructor = FigurePart;

    FigurePart.prototype.setRowCol = function (row, col) {
        this.row = row || 0;
        this.col = col || 0;
    };

    return FigurePart;
});