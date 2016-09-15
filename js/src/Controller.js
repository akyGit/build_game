/**
 * Created by Aky on 14.09.2016.
 */
define(['Grid/Grid', 'Logic'], function(Grid, Logic) {
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

        this.gridMain = new Grid(this.sceneWidth, this.sceneHeight, cellSize, this.sceneMain);
        this.gridSecondary = new Grid(this.sceneSecondaryWidth, this.sceneSecondaryHeight, cellSize, this.sceneSecondary);

        this.logic = new Logic(this.gridMain, this.gridSecondary);
    }

    Controller.prototype.constructor = Controller;

    Controller.prototype.startAnimate = function () {
        var self = this;

        document.getElementById("main").appendChild(this.rendererMain.view);
        document.getElementById("secondary").appendChild(this.rendererSecondary.view);

        this.logic.init();
        this._addKeyboardListener();

        animateMain();
        animateSecondary();

        function animateMain() {
            requestAnimationFrame(animateMain);
            self.logic.oneIterate();
            self.rendererMain.render(self.sceneMain);
        }

        function animateSecondary() {
            requestAnimationFrame(animateSecondary);
            self.rendererSecondary.render(self.sceneSecondary);
        }
    };

    Controller.prototype._addKeyboardListener = function () {
        window.addEventListener("keydown", this.logic.onPressDownEvent.bind(this.logic));
    };

    return Controller;
});