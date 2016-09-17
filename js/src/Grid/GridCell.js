define([], function() {
    function GridCell(x, y, edgeLength, scene) {
        this.x = x;
        this.y = y;
        this.edgeLength = edgeLength;
        this._scene = scene;
    }

    GridCell.prototype.constructor = GridCell;

    GridCell.prototype.draw = function (color) {
        this._scene.beginFill(color);
        this._scene.drawRect(this.x, this.y, this.edgeLength, this.edgeLength);
        this._scene.endFill();
    };

    GridCell.prototype.drawWithBorder = function (color, borderColor) {
        this.draw(borderColor);

        this._scene.beginFill(color);
        this._scene.drawRect(this.x + 1, this.y + 1, this.edgeLength - 2, this.edgeLength - 2);
        this._scene.endFill();
    };

    return GridCell;
});