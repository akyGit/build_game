var WebGLManager = require('./WebGLManager');

/**
 * @class
 * @memberof PIXI
 * @param renderer {PIXI.WebGLRenderer} The rendererMain this manager works for.
 */
function StencilManager(renderer)
{
    WebGLManager.call(this, renderer);
    this.stencilMaskStack = null;
}

StencilManager.prototype = Object.create(WebGLManager.prototype);
StencilManager.prototype.constructor = StencilManager;
module.exports = StencilManager;

/**
 * Changes the mask stack that is used by this manager.
 *
 * @param stencilMaskStack {PIXI.Graphics[]} The mask stack
 */
StencilManager.prototype.setMaskStack = function ( stencilMaskStack )
{
    this.stencilMaskStack = stencilMaskStack;

    var gl = this.rendererMain.gl;

    if (stencilMaskStack.length === 0)
    {
        gl.disable(gl.STENCIL_TEST);
    }
    else
    {
        gl.enable(gl.STENCIL_TEST);
    }
};

/**
 * Applies the Mask and adds it to the current filter stack. @alvin
 *
 * @param graphics {PIXI.Graphics}
 */
StencilManager.prototype.pushStencil = function (graphics)
{
    this.rendererMain.setObjectRenderer(this.rendererMain.plugins.graphics);

    this.rendererMain._activeRenderTarget.attachStencilBuffer();

    var gl = this.rendererMain.gl,
        sms = this.stencilMaskStack;

    if (sms.length === 0)
    {
        gl.enable(gl.STENCIL_TEST);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.stencilFunc(gl.ALWAYS,1,1);
    }

    sms.push(graphics);

    gl.colorMask(false, false, false, false);
    gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);

    this.rendererMain.plugins.graphics.render(graphics);

    gl.colorMask(true, true, true, true);
    gl.stencilFunc(gl.NOTEQUAL,0, sms.length);
    gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
};

/**
 * TODO @alvin
 */
StencilManager.prototype.popStencil = function ()
{
    this.rendererMain.setObjectRenderer(this.rendererMain.plugins.graphics);

    var gl = this.rendererMain.gl,
        sms = this.stencilMaskStack;

    var graphics = sms.pop();

    if (sms.length === 0)
    {
        // the stack is empty!
        gl.disable(gl.STENCIL_TEST);
    }
    else
    {
        gl.colorMask(false, false, false, false);
        gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);

        this.rendererMain.plugins.graphics.render(graphics);

        gl.colorMask(true, true, true, true);
        gl.stencilFunc(gl.NOTEQUAL, 0, sms.length);
        gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
    }
};

/**
 * Destroys the mask stack.
 *
 */
StencilManager.prototype.destroy = function ()
{
    WebGLManager.prototype.destroy.call(this);

    this.stencilMaskStack.stencilStack = null;
};
