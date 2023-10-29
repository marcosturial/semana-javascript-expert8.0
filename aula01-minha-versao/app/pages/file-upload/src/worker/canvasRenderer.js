/** @type {HTMLCanvasElement} */
let _canvas
let _context
export default class CanvasRenderer {

    /** @param {VideoFrame} frame */
    static draw(frame) {
        const { displayHeight, displayWidth } = frame

        _canvas.height = displayHeight
        _canvas.width = displayWidth
        _context.drawImage(frame, 0, 0, displayWidth, displayHeight)
        frame.close()
    }

    /** @param {HTMLCanvasElement} canvas */
    static getRenderer(canvas) {
        _canvas = canvas
        _context = canvas.getContext('2d')
        const renderer = this
        let pendingFrame = null
        return frame => {
            const renderAnimationFrame = () => {
                renderer.draw(pendingFrame)
                pendingFrame = null
            }
            if (!pendingFrame) {
                requestAnimationFrame(renderAnimationFrame)
            } else {
                pendingFrame.close()
            }
            pendingFrame = frame;
        }
    }
}