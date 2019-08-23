import Vector2 from './Math/Vector2.js'

/** Class representing a canvas element for WebGL2 */
export default class Canvas {
    constructor(width, height, shaderSources) {
        this.width = width
        this.height = height
        this.shaderSources = shaderSources

        this.colors = {
            black: [0, 0, 0, 0],
            blue: [0, 0, 255, 0],
            cyan: [0, 255, 255, 0],
            green: [0, 255, 0, 0],
            magenta: [255, 0, 255, 0],
            red: [255, 0, 0, 0],
            white: [255, 255, 255, 0],
            yellow: [255, 255, 0, 0],
        }
        this.data = {
            colors: [],
            positions: [],
        }

        this.gl = null
        this.program = null
        this.run()

        window.addEventListener('updateCanvas', event => {
            setInterval(() => {
            this.updateCanvasHandler(event)
            }, 500)
        }, false);

        let addSlider = document.getElementById('addSlider');
        let subSlider = document.getElementById('subSlider');
        addSlider.style.display = "block";
        subSlider.style.display = "none";

    }

    updateCanvasHandler(event) {
        console.log('updateCanvas')
        this.clearData()
        {   
            let math = document.getElementById('math').value;
            console.log(math);
            let addSlider = document.getElementById('addSlider');
            let subSlider = document.getElementById('subSlider');

            if(math === 'sub') {
                addSlider.style.display = "none";
                subSlider.style.display = "block";

                let xRangeSub = document.getElementById('xRangeSub').value;
                console.log(xRangeSub);
    
                let yRangeSub = document.getElementById('yRangeSub').value;
                console.log(yRangeSub);

                let xRangeSub1 = document.getElementById('xRangeSub1').value;
                console.log(xRangeSub1);
                
                let yRangeSub1 = document.getElementById('yRangeSub1').value;
                console.log(yRangeSub1);

                let subVector = new Vector2(xRangeSub/100, yRangeSub/100);
                this.data.positions.push(subVector.x, subVector.y)
                this.data.colors.push(...this.colors['blue']);

                let subVector1 = new Vector2(xRangeSub1/100, yRangeSub1/100);
                this.data.positions.push(subVector1.x, subVector1.y)
                this.data.colors.push(...this.colors['red']);

                let startVector2 = new Vector2(0, 0);
                subVector.sub(subVector1);
                startVector2 = subVector;
                this.data.positions.push(startVector2.x, startVector2.y)
                this.data.colors.push(...this.colors['black']);

                let corSub = document.getElementById('corSub');
                corSub.innerHTML = '';
                corSub.innerHTML += `x: ${xRangeSub} , y:${yRangeSub} -`;

                let corSub2 = document.getElementById('corSub2');
                corSub2.innerHTML = '';
                corSub2.innerHTML += `x': ${xRangeSub1} , y':${yRangeSub1} =`;

                let equalsSub = document.getElementById('equalsSub');
                equalsSub.innerHTML = '';
                equalsSub.innerHTML += `a: ${startVector2.x} , b:${startVector2.y}`;


            }else {
                addSlider.style.display = "block";
                subSlider.style.display = "none";

                let xRange = document.getElementById('xRange').value;
                console.log(xRange);
    
                let yRange = document.getElementById('yRange').value;
                console.log(yRange);

                let xRange1 = document.getElementById('xRange1').value;
                console.log(xRange1);
    
                let yRange1 = document.getElementById('yRange1').value;
                console.log(yRange1);

                let addVector = new Vector2( xRange/100, yRange/100);
                console.log('add vector', addVector);
                this.data.positions.push(addVector.x, addVector.y)
                this.data.colors.push(...this.colors['red']);
                
                let addVector1 = new Vector2( xRange1/100, yRange1/100);
                console.log('add vector1',addVector1);
                this.data.positions.push(addVector1.x, addVector1.y)
                this.data.colors.push(...this.colors['blue']);

                let startVector = new Vector2( 0 , 0 );
                addVector.add(addVector1);
                console.log(addVector);
                startVector = addVector;
                this.data.positions.push(startVector.x, startVector.y)
                this.data.colors.push(...this.colors['black'])
                
                let corAdd = document.getElementById('corAdd');
                corAdd.innerHTML = '';
                corAdd.innerHTML += `x: ${xRange} , y:${yRange} +`;

                let corAdd2 = document.getElementById('corAdd2');
                corAdd2.innerHTML = '';
                corAdd2.innerHTML += `x': ${xRange1} , y':${yRange1} =`;

                let equalsAdd = document.getElementById('equalsAdd');
                equalsAdd.innerHTML = '';
                equalsAdd.innerHTML += `a: ${startVector.x} , b:${startVector.y}`;

                let formulefilled = document.getElementById('formuleFilled');
                formulefilled.innerHTML = '';
                formulefilled.innerHTML += `𝑐⃗ = 〈 ${xRange} + ${xRange1} , ${yRange} + ${yRange1} 〉`
            }

        }
        
        this.drawScene()
    }

    // Methode to execute Clock
    run() {
        try {
            this.createCanvas()
            this.createShaders()
            this.createProgram()
            this.createVertexArray()
            // Initial drawing on the canvas
            {
                // Random points
                for (let i = 0, max = 100; i < max; i++) {
                    this.data.positions.push(Math.random() * 2 - 1, Math.random() * 2 - 1)
                    this.data.colors.push(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 0)
                }
                // White point in the middle.
                this.data.positions.push(0, 0)
                this.data.colors.push(...this.colors.white)
            }
            this.drawScene()

        } catch (error) {
            console.error(error)
        }
    }

    // Methode to clear Data
    clearData() {
        this.data = {
            colors: [],
            positions: [],
        }
    }

    createBuffers() {
        this.createBuffer('COLOR')
        this.createBuffer('POSITION')
    }

    createBuffer(bufferType) {
        const gl = this.gl
        const program = this.program

        let name // Name of attribute used in GLSL.
        let normalized // Should it be normalized to a value between 0 and 1.
        let size // Number of components per vertex attribute, can be 1 through 4.
        let srcData
        let type // Datatype.
        const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position.
        const offset = 0 // Start at the beginning of the buffer.

        switch (bufferType) {
            case 'COLOR':
                name = 'a_VertexColor'
                normalized = true
                size = 4
                srcData = new Uint8Array(this.data.colors)
                type = gl.UNSIGNED_BYTE // Integer from 0 through 255.
                break
            case 'POSITION':
                name = 'a_VertexPosition'
                normalized = false
                size = 2
                srcData = new Float32Array(this.data.positions)
                type = gl.FLOAT
                break
            default:
                return null
        }

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, srcData, gl.STATIC_DRAW)

        const index = gl.getAttribLocation(program, name)
        gl.enableVertexAttribArray(index)
        gl.vertexAttribPointer(index, size, type, normalized, stride, offset) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
    }

    // Create canvas element in HTML
    createCanvas() {

        //const canvasDiv = document.getElementById('canvasDiv');
        const canvas = document.createElement('canvas')
        document.getElementById("canvasDiv").appendChild(canvas);
        canvas.height = this.height
        canvas.width = this.width
        const gl = this.gl = canvas.getContext('webgl2')
        gl.clearColor(1, 1, 1, 1) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport

    }

    createProgram() {
        const gl = this.gl

        const program = gl.createProgram()
        gl.attachShader(program, this.vertexShader)
        gl.attachShader(program, this.fragmentShader)
        gl.linkProgram(program)

        const success = gl.getProgramParameter(program, gl.LINK_STATUS)
        if (success) {
            this.program = program
            gl.useProgram(program)
        } else {
            console.error(gl.getProgramInfoLog(program))
            gl.deleteProgram(program)
        }
    }

    // Create a shader with default parameter
    createShaders() {
        const gl = this.gl

        this.vertexShader = this.createShader(gl.VERTEX_SHADER)
        this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER)
    }

    // Create a shader with One parameter
    createShader(type) {
        const gl = this.gl

        let source
        switch (type) {
            case gl.FRAGMENT_SHADER:
                source = this.shaderSources.fragment
                break
            case gl.VERTEX_SHADER:
                source = this.shaderSources.vertex
                break
            default:
                console.error('Shader type does not exist.')
                return null
        }

        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (success) {
            return shader
        }
        console.error(type, gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
    }

    createVertexArray() {
        const gl = this.gl

        const vertexArray = gl.createVertexArray()
        gl.bindVertexArray(vertexArray)
    }

    // Draws the pixels inside canvas element
    drawScene() {
        const gl = this.gl

        this.createBuffers()

        gl.clear(gl.COLOR_BUFFER_BIT) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear

        const modes = [ // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#Rendering_primitives
            gl.POINTS,
            gl.LINES,
            gl.LINE_STRIP,
            gl.LINE_LOOP,
            gl.TRIANGLES,
            gl.TRIANGLE_STRIP,
            gl.TRIANGLE_FAN,
        ]
        const dimensions = 2
        const mode = modes[0]
        const first = 0
        const count = this.data.positions.length / dimensions
        gl.drawArrays(mode, first, count) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
    }
}