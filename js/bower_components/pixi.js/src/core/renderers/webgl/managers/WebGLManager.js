/**
 * @class
 * @memberof PIXI
 * @param renderer {PIXI.WebGLRenderer} The rendererMain this manager works for.
 */
function WebGLManager(renderer)
{
    /**
     * The rendererMain this manager works for.
     *
     * @member {PIXI.WebGLRenderer}
     */
    this.rendererMain = renderer;

    this.rendererMain.on('context', this.onContextChange, this);
}

WebGLManager.prototype.constructor = WebGLManager;
module.exports = WebGLManager;

/**
 * Generic method called when there is a WebGL context change.
 *
 */
WebGLManager.prototype.onContextChange = function ()
{
	// do some codes init!
};

/**
 * Generic destroy methods to be overridden by the subclass
 *
 */
WebGLManager.prototype.destroy = function ()
{
    this.rendererMain.off('context', this.onContextChange, this);

    this.rendererMain = null;
};
