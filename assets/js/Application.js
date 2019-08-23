import Canvas from './Library/Canvas.js'
import Canvas2 from './Library/Canvas2.js'
import Tests from './Tests/Tests.js'

/** Class for the application. */
export default class Application {
    /**
     * Create a new application.
     */
    constructor() {
        const tests = false
        if (tests) {
            new Tests()
        }
        console.info('WebGL2 Demo')

        this.shaderSources = {
            fragment: null,
            vertex: null,
        }
        this.preloader()
    }

    /** methode to load glsl shaders     */
    async preloader() {
        console.info('Preloading source code for shaders')
        await fetch('./assets/glsl/vertex-shader.glsl')
            .then(response => response.text())
            .then(source => this.shaderSources.vertex = source)
            .catch(error => console.error(error.message))
        await fetch('./assets/glsl/fragment-shader.glsl')
            .then(response => response.text())
            .then(source => this.shaderSources.fragment = source)
            .catch(error => console.error(error.message))
        this.run()
    }

    /** methode to draw Canvas     */
    run() {
        const width = 800
        const height = 600
        
        new Canvas(width, height, this.shaderSources)

        new Canvas2(width, height, this.shaderSources)
    }
}