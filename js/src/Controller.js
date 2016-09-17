define(['Grid/Grid', 'Logic'], function(Grid, Logic) {
    function Controller() {
        var SCENE_WIDTH = 300;
        var SCENE_HEIGHT = SCENE_WIDTH * 2;

        var SCENE_WIDTH_SECONDARY = 140;
        var SCENE_HEIGHT_SECONDARY = 140;

        var CELL_SIZE = 20;

        this._rendererMain = new PIXI.autoDetectRenderer(SCENE_WIDTH, SCENE_HEIGHT);
        this._rendererSecondary = new PIXI.autoDetectRenderer(SCENE_WIDTH_SECONDARY, SCENE_HEIGHT_SECONDARY);

        this._sceneMain = new PIXI.Graphics();
        this._sceneSecondary = new PIXI.Graphics();

        var gridMain = new Grid(SCENE_WIDTH, SCENE_HEIGHT, CELL_SIZE, this._sceneMain);
        var gridSecondary = new Grid(SCENE_WIDTH_SECONDARY, SCENE_HEIGHT_SECONDARY, CELL_SIZE, this._sceneSecondary);

        this._logic = new Logic(gridMain, gridSecondary);
    }

    Controller.prototype.constructor = Controller;

    Controller.prototype.startAnimate = function () {
        var self = this;

        document.getElementById("main").appendChild(this._rendererMain.view);
        document.getElementById("secondary").appendChild(this._rendererSecondary.view);
        document.getElementById("music").play();
        document.getElementById("music").loop = true;

        this._logic.init();
        this._logic.initUserControl();

        animateMain();
        animateSecondary();

        function animateMain() {
            requestAnimationFrame(animateMain);
            self._logic.oneIterate();
            self._rendererMain.render(self._sceneMain);
        }

        function animateSecondary() {
            requestAnimationFrame(animateSecondary);
            self._rendererSecondary.render(self._sceneSecondary);
        }
    };

    return Controller;
});