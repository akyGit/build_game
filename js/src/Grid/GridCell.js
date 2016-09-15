/**
 * Created by Aky on 14.09.2016.
 */
define([], function() {
    function GridCell(x, y, edgeLength, scene) {
        this.x = x;
        this.y = y;
        this.edgeLength = edgeLength;
        this.scene = scene;
    }

    GridCell.prototype.constructor = GridCell;

    GridCell.prototype.draw = function (color) {
        this.scene.beginFill(color);
        this.scene.drawRect(this.x + 1, this.y + 1, this.edgeLength - 2, this.edgeLength - 2);
        this.scene.endFill();
    };

    return GridCell;
});