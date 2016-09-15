/**
 * Created by Aky on 14.09.2016.
 */
define(
[
    'Figure/FigureI',
    'Figure/FigureO',
    'Figure/FigureL',
    'Figure/FigureJ',
    'Figure/FigureS',
    'Figure/FigureZ',
    'Figure/FigureT',
    'Constants'
], function(
    FigureI,
    FigureO,
    FigureL,
    FigureJ,
    FigureS,
    FigureZ,
    FigureT,
    Constants
    ){
    function Logic(grid, gridS) {
        this.currentFigure = null;
        this.nextFigure = null;

        this.figures = [];
        this.figures[0] = new FigureI();
        this.figures[1] = new FigureO();
        this.figures[2] = new FigureL();
        this.figures[3] = new FigureJ();
        this.figures[4] = new FigureS();
        this.figures[5] = new FigureZ();
        this.figures[6] = new FigureT();

        this.glasse = [];

        this._time = 0;
        this.gridMain = grid;
        this.gridSecondary = gridS;

        this.score = 0;
        this.scoreText = new PIXI.Text( this.score, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x00ff00,
            align: 'left'
        });

        this.needRotate = false;
    }

    Logic.prototype.constructor = Logic;

// TODO divide init function into init function and reset function
    Logic.prototype.init = function () {
        this.currentFigure = this.figures[Math.floor(Math.random() * this.figures.length)];
        this.currentFigure.row = 0;
        this.currentFigure.col = Math.floor(this.gridMain.cols / 2);
        this.currentFigure.setStateAndUpdate(Math.floor(Math.random() * this.currentFigure.numberOfStates));

        do {
            this.nextFigure = this.figures[Math.floor(Math.random() * this.figures.length)];
        } while (this.nextFigure == this.currentFigure);

        this.nextFigure.row = 2;
        this.nextFigure.col = Math.floor(this.gridSecondary.cols / 2);
        this.nextFigure.setStateAndUpdate(Math.floor(Math.random() * this.nextFigure.numberOfStates));

        this.gridSecondary.fillGridSolidColor(Constants.BLACK_COLOR);
        this.gridSecondary.drawFigure(this.nextFigure, Constants.YELLOW_COLOR);

        var i, j;
        for (i = 0; i < this.gridMain.rows; i++)
            for (j = 0; j < this.gridMain.cols; j++)
                this.glasse[i * this.gridMain.cols + j] = true;

        this.gridMain.fillGridSolidColor(Constants.BLACK_COLOR);

        this.score = 0;
        this.scoreText.text = "Score: " + this.score;

        this.gridSecondary.scene.addChild(this.scoreText);
        this.scoreText.position.x = 20;
        this.scoreText.position.y = 120;
    };

    Logic.prototype.oneIterate = function () {
        if (this._time >= 6) {
            // =================================
            if (this.needRotate) {
                this._tryRotateAndRedraw();
                this.needRotate = false;
            }

            if (this._canMoveDown(this.currentFigure)) {
                this._moveDownFigureAndRedraw();
            } else if (this._isFinish()) {
                alert("Your score: " + this.score);
                this.init();
            } else {
                this._fillGlass();
                this._checkGlass();
                this._newFalling();
            }
            // =================================
            this._time = 0;
        }

        this._time++;
    };

    Logic.prototype.onPressDownEvent = function (event) {
        switch (event.keyCode) {
            case Constants.LEFT_KEY:
                this._tryMoveLeftAndRedraw();
                break;
            case Constants.RIGHT_KEY:
                this._tryMoveRightAndRedraw();
                break;
            case Constants.UP_KEY:
                this.needRotate = true;
                break;
            case Constants.DOWN_KEY:
                break;
        }
    };

    Logic.prototype._tryMoveLeftAndRedraw = function () {
        if (this._canMoveLeft(this.currentFigure)) {
            this.gridMain.drawFigure(this.currentFigure, 0x000000);
            this.currentFigure.moveLeft();
            this.gridMain.drawFigure(this.currentFigure, 0xffff00);
        }
    };

    Logic.prototype._tryMoveRightAndRedraw = function () {
        if (this._canMoveRight(this.currentFigure)) {
            this.gridMain.drawFigure(this.currentFigure, 0x000000);
            this.currentFigure.moveRight();
            this.gridMain.drawFigure(this.currentFigure, 0xffff00);
        }
    };

    Logic.prototype._tryRotateAndRedraw = function () {
        if (this._canRotate(this.currentFigure)) {
            this.gridMain.drawFigure(this.currentFigure, 0x000000);
            this.currentFigure.rotateClockWise();
            this.gridMain.drawFigure(this.currentFigure, 0xffff00);
        }
    };

    Logic.prototype._isFinish = function () {
        return this.currentFigure.partOfMe.some(function (square) {
            return square.row === 0;
        });
    };

    Logic.prototype._moveDownFigureAndRedraw = function () {
        this.gridMain.drawFigure(this.currentFigure, 0x000000);
        this.currentFigure.moveDown();
        this.gridMain.drawFigure(this.currentFigure, 0xffff00);
    };

    Logic.prototype._canMoveDown = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self.glasse[(square.row + 1) * self.gridMain.cols + square.col];
        });
    };

    Logic.prototype._canMoveLeft = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self.glasse[square.row * self.gridMain.cols + square.col - 1] &&
                (square.col - 1) >= 0;
        });
    };

    Logic.prototype._canMoveRight = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self.glasse[square.row * self.gridMain.cols + square.col + 1] &&
                (square.col + 1) < self.gridMain.cols;
        });
    };

    Logic.prototype._canRotate = function (figure) {
        var self = this;

        var originState = figure.state;
        figure.rotateClockWise();

        var result = figure.partOfMe.every(function (square) {
            return self.glasse[square.row * self.gridMain.cols + square.col] &&
                square.col >= 0 && square.col < self.gridMain.cols;
        });

        figure.setStateAndUpdate(originState);

        return result;
    };

    Logic.prototype._newFalling = function () {
        this.gridSecondary.drawFigure(this.nextFigure, Constants.BLACK_COLOR);

        this.currentFigure = this.nextFigure;
        this.nextFigure.row = 0;
        this.nextFigure.col = Math.floor(this.gridMain.cols / 2);

        do {
            this.nextFigure = this.figures[Math.floor(Math.random() * this.figures.length)];
        } while (this.nextFigure == this.currentFigure);

        this.nextFigure.row = 2;
        this.nextFigure.col = Math.floor(this.gridSecondary.cols / 2);
        this.nextFigure.setStateAndUpdate(Math.floor(Math.random() * this.nextFigure.numberOfStates));

        this.gridSecondary.drawFigure(this.nextFigure, Constants.YELLOW_COLOR);
    };

    Logic.prototype._fillGlass = function () {
        var self = this;

        this.currentFigure.partOfMe.forEach(function (square) {
            self.glasse[square.row * self.gridMain.cols + square.col] = false;
        });
    };

    Logic.prototype._checkGlass = function () {
        var i, j;
        var self = this;

        var collapseRows = [];

        for (i = 0; i < this.gridMain.rows; i++) {
            for (j = 0; j < this.gridMain.cols; j++) {
                if (this.glasse[i * this.gridMain.cols + j])
                    break;
            }

            if (j == this.gridMain.cols)
                collapseRows.push(i);
        }

        if (collapseRows.length != 0) {
            collapseRows.forEach(function (row) {
                for (i = row; i > 0; i--)
                    for (j = 0; j < self.gridMain.cols; j++)
                        self.glasse[i * self.gridMain.cols + j] = self.glasse[(i - 1) * self.gridMain.cols + j];
            });

            this.gridMain.fillGridSolidColor(Constants.BLACK_COLOR);

            for (i = 0; i < this.gridMain.rows; i++) {
                for (j = 0; j < this.gridMain.cols; j++) {
                    if (!this.glasse[i * this.gridMain.cols + j])
                        this.gridMain.drawCell(i, j, Constants.YELLOW_COLOR);
                }
            }

            for (i = 0; i < collapseRows.length; i++)
                this.score += (i + 1) * 10;

            this.scoreText.text = "Score: " + this.score;
        }
    };

    return Logic;
});