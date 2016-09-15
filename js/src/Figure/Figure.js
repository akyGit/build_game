/**
 * Created by Aky on 14.09.2016.
 */
define([], function() {
    function Figure(row, col, numberOfStates) {
        if (this.constructor === Figure) {
            throw new Error("You can't create abstract class");
        }

        this.row = row || 0;
        this.col = col || 0;

        this.state = 0;
        this.numberOfStates = numberOfStates;
        this.partOfMe = [];
    }

    Figure.prototype.constructor = Figure;

    Figure.prototype.moveDown = function () {
        this.row++;
        this.update();
    };

    Figure.prototype.moveLeft = function () {
        this.col--;
        this.update();
    };

    Figure.prototype.moveRight = function () {
        this.col++;
        this.update();
    };

    Figure.prototype.setStateAndUpdate = function (state) {
        this.state = state % this.numberOfStates;
        this.update();
    };

    Figure.prototype.rotateClockWise = function () {
        if ((++(this.state)) >= this.numberOfStates)
            this.state = 0;

        this.update();
    };

    Figure.prototype.update = function () {
        throw new Error("You can't use abstact method");
    };

    return Figure;
});