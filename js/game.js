;(function () {

    var BLACK_COLOR = 0x000000;
    var YELLOW_COLOR = 0xffff00;

    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;

    // FigurePart
    function FigurePart(row, col) {
        this.row = row || 0;
        this.col = col || 0;
    }

    FigurePart.prototype.constructor = FigurePart;

    FigurePart.prototype.setRowCol = function (row, col) {
        this.row = row || 0;
        this.col = col || 0;
    };
    // end FigurePart ===============================================

    // Figure
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

    FigureO.prototype.update = function () {
        throw new Error("You can't use abstact method");
    };
    // end Figure ===============================================

    // FigureO
    function FigureO(row, col) {
        Figure.call(this, row, col, 1);

        this.partOfMe[0] = new FigurePart(this.row, this.col - 1);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row + 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row + 1, this.col - 1);
    }

    FigureO.prototype = Object.create(Figure.prototype);
    FigureO.prototype.constructor = FigureO;

    FigureO.color = 0xFF0000;

    FigureO.prototype.update = function () {
        switch (this.state) {
            case 0:
    // *0 *1
    // *3 *2
                this.partOfMe[0].setRowCol(this.row, this.col - 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row + 1, this.col);
                this.partOfMe[3].setRowCol(this.row + 1, this.col - 1);
                break;
        }
    };
    // end FigureO ===============================================

    // FigureS
    function FigureS(row, col) {
        Figure.call(this, row, col, 2);

        this.partOfMe[0] = new FigurePart(this.row, this.col - 1);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row - 1, this.col + 1);
    }

    FigureS.prototype = Object.create(Figure.prototype);
    FigureS.prototype.constructor = FigureS;

    FigureS.color = 0x00FF00;

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
    // end FigureS ===============================================

    // FigureZ
    function FigureZ(row, col) {
        Figure.call(this, row, col, 2);

        this.partOfMe[0] = new FigurePart(this.row, this.col + 1);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row - 1, this.col - 1);
    }

    FigureZ.prototype = Object.create(Figure.prototype);
    FigureZ.prototype.constructor = FigureZ;

    FigureZ.color = 0x0000FF;

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
    // end FigureZ ===============================================

    // FigureI
    function FigureI(row, col) {
        Figure.call(this, row, col, 2);

        this.partOfMe[0] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row + 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row + 2, this.col);
    }

    FigureI.prototype = Object.create(Figure.prototype);
    FigureI.prototype.constructor = FigureI;

    FigureI.color = 0xFFFF00;

    FigureI.prototype.update = function () {
        switch (this.state) {
            case 0:
    // *0
    // *1
    // *2
    // *3
                this.partOfMe[0].setRowCol(this.row - 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row + 1, this.col);
                this.partOfMe[3].setRowCol(this.row + 2, this.col);
                break;
            case 1:
    // *3 *2 *1 *0
                this.partOfMe[0].setRowCol(this.row, this.col + 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col - 1);
                this.partOfMe[3].setRowCol(this.row, this.col - 2);
                break;
        }
    };
    // end FigureI ===============================================

    // FigureL
    function FigureL(row, col) {
        Figure.call(this, row, col, 4);

        this.partOfMe[0] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row + 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row + 1, this.col + 1);
    }

    FigureL.prototype = Object.create(Figure.prototype);
    FigureL.prototype.constructor = FigureL;

    FigureL.color = 0xFF00FF;

    FigureL.prototype.update = function () {
        switch (this.state) {
            case 0:
    //  *0
    //  *1
    //  *2 *3
                this.partOfMe[0].setRowCol(this.row - 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row + 1, this.col);
                this.partOfMe[3].setRowCol(this.row + 1, this.col + 1);
                break;
            case 1:
    //        *3
    //  *0 *1 *2
                this.partOfMe[0].setRowCol(this.row, this.col - 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col + 1);
                this.partOfMe[3].setRowCol(this.row - 1, this.col + 1);
                break;
            case 2:
    // *3 *2
    //    *1
    //    *0
                this.partOfMe[0].setRowCol(this.row + 1, this.col);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row - 1, this.col);
                this.partOfMe[3].setRowCol(this.row - 1, this.col - 1);
                break;
            case 3:
    // *2 *1 *0
    // *3
                this.partOfMe[0].setRowCol(this.row, this.col + 1);
                this.partOfMe[1].setRowCol(this.row, this.col);
                this.partOfMe[2].setRowCol(this.row, this.col - 1);
                this.partOfMe[3].setRowCol(this.row + 1, this.col - 1);
                break;
        }
    };
    // end FigureL ===============================================

    // FigureJ
    function FigureJ(row, col) {
        Figure.call(this, row, col, 4);

        this.partOfMe[0] = new FigurePart(this.row - 1, this.col);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row + 1, this.col);
        this.partOfMe[3] = new FigurePart(this.row + 1, this.col + 1);
    }

    FigureJ.prototype = Object.create(Figure.prototype);
    FigureJ.prototype.constructor = FigureJ;

    FigureJ.color = 0x00FFFF;

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
    // end FigureJ ===============================================

    // FigureT
    function FigureT(row, col) {
        Figure.call(this, row, col, 4);

        this.partOfMe[0] = new FigurePart(this.row, this.col - 1);
        this.partOfMe[1] = new FigurePart(this.row, this.col);
        this.partOfMe[2] = new FigurePart(this.row, this.col + 1);
        this.partOfMe[3] = new FigurePart(this.row - 1, this.col);
    }

    FigureT.prototype = Object.create(Figure.prototype);
    FigureT.prototype.constructor = FigureT;

    FigureT.color = 0x00A0FF;

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
    // end FigureT ===============================================

    // GridSquare
    function GridSquare(x, y, edgeLength, scene) {
        this.x = x;
        this.y = y;
        this.edgeLength = edgeLength;
        this.scene = scene;
    }

    GridSquare.prototype = {
        toString: function () {
            return "x: " + this.x + "; y: " + this.y +
                "; edgeLength: " + this.edgeLength +
                "; color: " + this.color;
        },

        draw: function (color) {
            this.scene.beginFill(color);
            this.scene.drawRect(this.x + 1, this.y + 1, this.edgeLength - 2, this.edgeLength - 2);
            this.scene.endFill();
        }
    };

    GridSquare.prototype.constructor = GridSquare;
    // end GridSquare ===============================================

    // Grid
    function Grid(width, height, cellSize, scene) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.scene = scene;

        this.cells = [];
        this.rows = Math.floor(this.height / cellSize);
        this.cols = Math.floor(this.width / cellSize);

        var i, j;
        for (i = 0; i < this.rows; i++)
            for (j = 0; j < this.cols; j++)
                this.cells[i * this.cols + j] = new GridSquare(j * this.cellSize, i * this.cellSize, this.cellSize, this.scene);
    }

    Grid.prototype = {
        drawCell: function (row, col, color) {
            if (this.cells[row * this.cols + col] === undefined)
                return;

            this.cells[row * this.cols + col].draw(color);
        },

        drawFigure: function (figure, color) {
            var self = this;
            figure.partOfMe.forEach(function (square) {
                self.drawCell(square.row, square.col, color);
            });
        },

        fillGridSolidColor: function (color) {
            var self = this;

            var i, j;
            for (i = 0; i < this.rows; i++)
                for (j = 0; j < this.cols; j++)
                    self.drawCell(i, j, color);
        },

        drawGridRandomColor: function () {
            var i, j;
            for (i = 0; i < this.rows; i++)
                for (j = 0; j < this.cols; j++)
                    this.cells[i * this.cols + j].draw(Math.random() * 0xFFFFFF);
        }
    };

    Grid.prototype.constructor = Grid;
    // end Grid ===============================================

    // Logic
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

        this.time = 0;
        this.grid = grid;
        this.gridS = gridS;

        this.score = 0;
        this.scoreText = new PIXI.Text('Score: ' + this.score, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x00ff00,
            align: 'left'
        });

        this.needRotate = false;
    }

    Logic.prototype.constructor = Logic;

    Logic.prototype.init = function () {
        this.currentFigure = this.figures[Math.floor(Math.random() * this.figures.length)];
        this.currentFigure.row = 0;
        this.currentFigure.col = Math.floor(this.grid.cols / 2);
        this.currentFigure.setStateAndUpdate(Math.floor(Math.random() * this.currentFigure.numberOfStates));

        do {
            this.nextFigure = this.figures[Math.floor(Math.random() * this.figures.length)];
        } while (this.nextFigure == this.currentFigure);

        this.nextFigure.row = 2;
        this.nextFigure.col = Math.floor(this.gridS.cols / 2);
        this.nextFigure.setStateAndUpdate(Math.floor(Math.random() * this.nextFigure.numberOfStates));

        this.gridS.fillGridSolidColor(BLACK_COLOR);
        this.gridS.drawFigure(this.nextFigure, YELLOW_COLOR);

        var i, j;
        for (i = 0; i < this.grid.rows; i++)
            for (j = 0; j < this.grid.cols; j++)
                this.glasse[i * this.grid.cols + j] = true;

        this.grid.fillGridSolidColor(BLACK_COLOR);

        this.score = 0;
        this.scoreText.text = "Score: " + this.score;

        this.gridS.scene.addChild(this.scoreText);
        this.scoreText.position.x = 20;
        this.scoreText.position.y = 120;
    };

    Logic.prototype.oneIterate = function () {
        if (this.time >= 6) {
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
            this.time = 0;
        }

        this.time++;
    };

    Logic.prototype.onPressDownEvent = function (event) {
        switch (event.keyCode) {
            case LEFT_KEY:
                this._tryMoveLeftAndRedraw();
                break;
            case RIGHT_KEY:
                this._tryMoveRightAndRedraw();
                break;
            case UP_KEY:
                this.needRotate = true;
                break;
            case DOWN_KEY:
                break;
        }
    };

    Logic.prototype._tryMoveLeftAndRedraw = function () {
        if (this._canMoveLeft(this.currentFigure)) {
            this.grid.drawFigure(this.currentFigure, 0x000000);
            this.currentFigure.moveLeft();
            this.grid.drawFigure(this.currentFigure, 0xffff00);
        }
    };

    Logic.prototype._tryMoveRightAndRedraw = function () {
        if (this._canMoveRight(this.currentFigure)) {
            this.grid.drawFigure(this.currentFigure, 0x000000);
            this.currentFigure.moveRight();
            this.grid.drawFigure(this.currentFigure, 0xffff00);
        }
    };

    Logic.prototype._tryRotateAndRedraw = function () {
        if (this._canRotate(this.currentFigure)) {
            this.grid.drawFigure(this.currentFigure, 0x000000);
            this.currentFigure.rotateClockWise();
            this.grid.drawFigure(this.currentFigure, 0xffff00);
        }
    };

    Logic.prototype._isFinish = function () {
        return this.currentFigure.partOfMe.some(function (square) {
            return square.row === 0;
        });
    };

    Logic.prototype._moveDownFigureAndRedraw = function () {
        this.grid.drawFigure(this.currentFigure, 0x000000);
        this.currentFigure.moveDown();
        this.grid.drawFigure(this.currentFigure, 0xffff00);
    };

    Logic.prototype._canMoveDown = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self.glasse[(square.row + 1) * self.grid.cols + square.col];
        });
    };

    Logic.prototype._canMoveLeft = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self.glasse[square.row * self.grid.cols + square.col - 1] &&
                (square.col - 1) >= 0;
        });
    };

    Logic.prototype._canMoveRight = function (figure) {
        var self = this;

        return figure.partOfMe.every(function (square) {
            return self.glasse[square.row * self.grid.cols + square.col + 1] &&
                (square.col + 1) < self.grid.cols;
        });
    };

    Logic.prototype._canRotate = function (figure) {
        var self = this;

        var originState = figure.state;
        figure.rotateClockWise();

        var result = figure.partOfMe.every(function (square) {
            return self.glasse[square.row * self.grid.cols + square.col] &&
                square.col >= 0 && square.col < self.grid.cols;
        });

        figure.setStateAndUpdate(originState);

        return result;
    };

    Logic.prototype._newFalling = function () {
        this.gridS.drawFigure(this.nextFigure, BLACK_COLOR);

        this.currentFigure = this.nextFigure;
        this.nextFigure.row = 0;
        this.nextFigure.col = Math.floor(this.grid.cols / 2);

        do {
            this.nextFigure = this.figures[Math.floor(Math.random() * this.figures.length)];
        } while (this.nextFigure == this.currentFigure);

        this.nextFigure.row = 2;
        this.nextFigure.col = Math.floor(this.gridS.cols / 2);
        this.nextFigure.setStateAndUpdate(Math.floor(Math.random() * this.nextFigure.numberOfStates));

        this.gridS.drawFigure(this.nextFigure, YELLOW_COLOR);
    };

    Logic.prototype._fillGlass = function () {
        var self = this;

        this.currentFigure.partOfMe.forEach(function (square) {
            self.glasse[square.row * self.grid.cols + square.col] = false;
        });
    };

    Logic.prototype._checkGlass = function () {
        var i, j;
        var self = this;

        var collapseRows = [];

        for (i = 0; i < this.grid.rows; i++) {
            for (j = 0; j < this.grid.cols; j++) {
                if (this.glasse[i * this.grid.cols + j])
                    break;
            }

            if (j == this.grid.cols)
                collapseRows.push(i);
        }

        if (collapseRows.length != 0) {
            collapseRows.forEach(function (row) {
                for (i = row; i > 0; i--)
                    for (j = 0; j < self.grid.cols; j++)
                        self.glasse[i * self.grid.cols + j] = self.glasse[(i - 1) * self.grid.cols + j];
            });

            this.grid.fillGridSolidColor(BLACK_COLOR);

            for (i = 0; i < this.grid.rows; i++) {
                for (j = 0; j < this.grid.cols; j++) {
                    if (!this.glasse[i * this.grid.cols + j])
                        this.grid.drawCell(i, j, YELLOW_COLOR);
                }
            }

            for (i = 0; i < collapseRows.length; i++)
                this.score += (i + 1) * 10;

            this.scoreText.text = "Score: " + this.score;
        }
    };
    // end Logic ===============================================

    // Controller
    function Controller() {
        this.sceneWidth = 300;
        this.sceneHeight = this.sceneWidth * 2;

        this.sceneSecondaryWidth = 180;
        this.sceneSecondaryHeight = 180;

        var cellSize = 20;

        this.rendererMain = new PIXI.autoDetectRenderer(this.sceneWidth, this.sceneHeight);
        this.rendererSecondary = new PIXI.autoDetectRenderer(this.sceneSecondaryWidth, this.sceneSecondaryHeight);

        this.sceneMain = new PIXI.Graphics();
        this.sceneSecondary = new PIXI.Graphics();

        this.grid = new Grid(this.sceneWidth, this.sceneHeight, cellSize, this.sceneMain);
        this.gridS = new Grid(this.sceneSecondaryWidth, this.sceneSecondaryHeight, cellSize, this.sceneSecondary);

        this.logic = new Logic(this.grid, this.gridS);
    }

    Controller.prototype = {
        startAnimate: function () {
            var self = this;

            //The addition rendererMain to page
            document.body.appendChild(this.rendererMain.view);

            var delimiter = document.createElement("span");
            delimiter.innerHTML = "&nbsp &nbsp &nbsp &nbsp";
            document.body.appendChild(delimiter);

            document.body.appendChild(this.rendererSecondary.view);

            this.logic.init();
            document.addEventListener("keydown", this.logic.onPressDownEvent.bind(this.logic));

            function animate() {
                requestAnimationFrame(animate);

                self.logic.oneIterate();
                self.rendererMain.render(self.sceneMain);
            }

            function animate2() {
                requestAnimationFrame(animate2);

                self.rendererSecondary.render(self.sceneSecondary);
            }

            animate();
            animate2();
        }
    };

    Controller.prototype.constructor = Controller;

    Controller.prototype._addKeyboardListener = function () {
        window.addEventListener()
    };
    // end Controller ===============================================

    //main
    var controller = new Controller();
    controller.startAnimate();

} ());