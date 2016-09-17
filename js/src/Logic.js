// TODO simplify
define(
[
    'Figure/FigureI', 'Figure/FigureO', 'Figure/FigureL', 'Figure/FigureJ',
    'Figure/FigureS', 'Figure/FigureZ', 'Figure/FigureT', 'Constants'
], function(FigureI, FigureO, FigureL, FigureJ, FigureS, FigureZ, FigureT, Constants){
    function Logic(grid, gridS) {
        this._currentFigure = null;
        this._nextFigure = null;

        this._figures = [];
        this._figures.push(new FigureI());
        this._figures.push(new FigureO());
        this._figures.push(new FigureL());
        this._figures.push(new FigureJ());
        this._figures.push(new FigureS());
        this._figures.push(new FigureZ());
        this._figures.push(new FigureT());

        this._glasseBuffer = [];

        this._time = 0;
        this._gridMain = grid;
        this._gridSecondary = gridS;

        this._score = 0;
        this._needRotate = false;
    }

    Logic.prototype.constructor = Logic;

    Logic.prototype.init = function () {
        // TODO divide init function into init function and reset function
        this._currentFigure = this._figures[Math.floor(Math.random() * this._figures.length)];
        this._currentFigure.row = 0;
        this._currentFigure.col = Math.floor(this._gridMain._cols / 2);
        this._currentFigure.setStateAndUpdate(Math.floor(Math.random() * this._currentFigure.numberOfStates));

        do {
            this._nextFigure = this._figures[Math.floor(Math.random() * this._figures.length)];
        } while (this._nextFigure == this._currentFigure);

        this._nextFigure.row = Math.floor(this._gridSecondary._rows / 2);
        this._nextFigure.col = Math.floor(this._gridSecondary._cols / 2);
        this._nextFigure.setStateAndUpdate(Math.floor(Math.random() * this._nextFigure.numberOfStates));

        this._gridSecondary.drawGrid(Constants.SEC_BG_COLOR, Constants.SEC_GRID_COLOR);
        this._gridSecondary.drawFigureWithGrid(this._nextFigure, Constants.YELLOW_COLOR, Constants.SEC_GRID_COLOR);

        var i, j;
        for (i = 0; i < this._gridMain._rows; i++)
            for (j = 0; j < this._gridMain._cols; j++)
                this._glasseBuffer[i * this._gridMain._cols + j] = true;

        this._gridMain.fillGridSolidColor(Constants.BLACK_COLOR);

        this._score = 0;
        // this._scoreText.text = "Score: " + this._score;

        // this._gridSecondary._scene.addChild(this._scoreText);
        // this._scoreText.position.x = 20;
        // this._scoreText.position.y = 120;
    };

    Logic.prototype.initUserControl = function() {
            window.addEventListener("keydown", this._onPressDownEvent.bind(this));
        };

    Logic.prototype.oneIterate = function () {
        if (this._time >= 6) {
            if (this._needRotate) {
                this._tryRotateAndRedraw();
                this._needRotate = false;
            }

            if (this._canMoveDown(this._currentFigure)) {
                this._moveDownFigureAndRedraw();
            } else if (this._isFinish()) {
                alert("Your score: " + this._score);
                this.init();
            } else {
                this._fillGlass();
                this._checkGlass();
                this._newFalling();
            }

            this._time = 0;
        }

        this._time++;
    };

    Logic.prototype._onPressDownEvent = function (event) {
        switch (event.keyCode) {
            case Constants.LEFT_KEY:
                this._tryMoveLeftAndRedraw();
                break;
            case Constants.RIGHT_KEY:
                this._tryMoveRightAndRedraw();
                break;
            case Constants.UP_KEY:
                this._needRotate = true;
                break;
            case Constants.DOWN_KEY:
                this._time += 10;
                break;
        }
    };

    Logic.prototype._moveDownFigureAndRedraw = function () {
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.BLACK_COLOR, Constants.BLACK_COLOR);
            this._currentFigure.moveDown();
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.YELLOW_COLOR, Constants.BLACK_COLOR);
        };

    Logic.prototype._tryMoveLeftAndRedraw = function () {
        if (this._canMoveLeft(this._currentFigure)) {
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.BLACK_COLOR, Constants.BLACK_COLOR);
            this._currentFigure.moveLeft();
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.YELLOW_COLOR, Constants.BLACK_COLOR);
        }
    };

    Logic.prototype._tryMoveRightAndRedraw = function () {
        if (this._canMoveRight(this._currentFigure)) {
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.BLACK_COLOR, Constants.BLACK_COLOR);
            this._currentFigure.moveRight();
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.YELLOW_COLOR, Constants.BLACK_COLOR);
        }
    };

    Logic.prototype._tryRotateAndRedraw = function () {
        if (this._canRotate(this._currentFigure)) {
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.BLACK_COLOR, Constants.BLACK_COLOR);
            this._currentFigure.rotateClockWise();
            this._gridMain.drawFigureWithGrid(this._currentFigure, Constants.YELLOW_COLOR, Constants.BLACK_COLOR);
        }
    };

    Logic.prototype._canMoveDown = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self._glasseBuffer[(square.row + 1) * self._gridMain._cols + square.col];
        });
    };

    Logic.prototype._canMoveLeft = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self._glasseBuffer[square.row * self._gridMain._cols + square.col - 1] &&
                (square.col - 1) >= 0;
        });
    };

    Logic.prototype._canMoveRight = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self._glasseBuffer[square.row * self._gridMain._cols + square.col + 1] &&
                (square.col + 1) < self._gridMain._cols;
        });
    };

    Logic.prototype._canRotate = function (figure) {
        var self = this;

        var originState = figure.state;
        figure.rotateClockWise();

        var result = figure.partOfMe.every(function (square) {
            return self._glasseBuffer[square.row * self._gridMain._cols + square.col] &&
                square.col >= 0 && square.col < self._gridMain._cols;
        });

        // restore original state
        figure.setStateAndUpdate(originState);
        return result;
    };

    Logic.prototype._isFinish = function () {
        return this._currentFigure.partOfMe.some(function (square) {
            return square.row === 0;
        });
    };

    Logic.prototype._newFalling = function () {
        // TODO simplify
        this._gridSecondary.drawFigureWithGrid(this._nextFigure, Constants.SEC_BG_COLOR, Constants.SEC_GRID_COLOR);

        this._currentFigure = this._nextFigure;
        this._nextFigure.row = 0;
        this._nextFigure.col = Math.floor(this._gridMain._cols / 2);

        do {
            this._nextFigure = this._figures[Math.floor(Math.random() * this._figures.length)];
        } while (this._nextFigure == this._currentFigure);

        this._nextFigure.row = Math.floor(this._gridSecondary._rows / 2);
        this._nextFigure.col = Math.floor(this._gridSecondary._cols / 2);
        this._nextFigure.setStateAndUpdate(Math.floor(Math.random() * this._nextFigure.numberOfStates));

        this._gridSecondary.drawFigureWithGrid(this._nextFigure, Constants.YELLOW_COLOR, Constants.SEC_GRID_COLOR);
    };

    Logic.prototype._fillGlass = function () {
        var self = this;

        this._currentFigure.partOfMe.forEach(function (square) {
            self._glasseBuffer[square.row * self._gridMain._cols + square.col] = false;
        });
    };

    Logic.prototype._checkGlass = function () {
        var i, j;
        var self = this;

        var collapseRows = [];

        for (i = 0; i < this._gridMain._rows; i++) {
            for (j = 0; j < this._gridMain._cols; j++) {
                if (this._glasseBuffer[i * this._gridMain._cols + j])
                    break;
            }

            if (j == this._gridMain._cols)
                collapseRows.push(i);
        }

        if (collapseRows.length != 0) {
            // collapse
            collapseRows.forEach(function (row) {
                for (i = row; i > 0; i--)
                    for (j = 0; j < self._gridMain._cols; j++)
                        self._glasseBuffer[i * self._gridMain._cols + j] = self._glasseBuffer[(i - 1) * self._gridMain._cols + j];
            });

            // fill of glass default color
            this._gridMain.fillGridSolidColor(Constants.BLACK_COLOR);

            // redraw new _scene after collapse
            for (i = 0; i < this._gridMain._rows; i++) {
                for (j = 0; j < this._gridMain._cols; j++) {
                    if (!this._glasseBuffer[i * this._gridMain._cols + j])
                        this._gridMain.drawCellWithBorder(i, j, Constants.YELLOW_COLOR, Constants.BLACK_COLOR);
                }
            }

            // recalculate _score
            for (i = 0; i < collapseRows.length; i++)
                this._score += (i + 1) * 10;

            // this._scoreText.text = "Score: " + this._score;
        }
    };

    return Logic;
});