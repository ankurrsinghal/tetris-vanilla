function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1
    var rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    var ctx = canvas.getContext('2d')

    ctx.scale(dpr, dpr)
    return ctx
}

const randomValueFrom = object => {
    return object[Object.keys(object)[Math.floor(Math.random() * Object.keys(object).length)]]
}

const COLORS = {
    RED:       "#e74c3c",
    ORANGE:    "#e67e22",
    GREEN:     "#2ecc71",
    BLUE:      "#3498db",
    PURPLE:    "#9b59b6",
    TURQUOISE: "#1abc9c",
    YELLOW:    "#f1c40f",
}

const randomColor = () => randomValueFrom(COLORS)
const newArrayOfSize = (size, value) => new Array(size).join('_').split('_').map(() => value || 0)

const GRID_WIDTH = 400
const GRID_HEIGHT = 600
const POINT_SIZE = 25

const ROWS = GRID_HEIGHT / POINT_SIZE
const COLUMNS = GRID_WIDTH / POINT_SIZE

const canvas = document.getElementById('canvas')
canvas.width = GRID_WIDTH
canvas.height = GRID_HEIGHT

const initializeMatrix = () => {
    const __matrix = []
    for (let index = 0; index < ROWS + 1; index++) {
        const newArray = []
        for (let index2 = 0; index2 < COLUMNS + 2; index2++) {
            if (index2 === 0 || index2 === COLUMNS + 1) {
                newArray.push(1)
            } else {
                if (index === ROWS) {
                    newArray.push(1)
                } else {
                    newArray.push(0)
                }
            }
        }
        __matrix.push(newArray)
    }
    return __matrix
}

let MATRIX = initializeMatrix()



const context = canvas.getContext('2d')

function drawRect(rect, color) {
    context.beginPath()
    context.rect(rect.point.x, rect.point.y, rect.size.width, rect.size.height)
    context.fillStyle = color || randomColor()
    context.fill()
    context.closePath()
}

function clearRect(rect) {
    context.clearRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height)
}

class Point {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    static createPoints(points) {
        return points.map(point => new Point(point[0], point[1]))
    }
}

class Size {
    constructor(width, height) {
        this.width = width
        this.height = height
    }

    static createSquareSize(size) {
        return new Size(size, size)
    }
}

class Rect {
    constructor(point, size) {
        this.point = point
        this.size = size
    }

    static createSquare(x, y, size) {
        return new Rect(new Point(x, y), Size.createSquareSize(size))
    }

    static createRectsFromPointsAndSize(points, size) {
        return points.map(point => new Rect(point, Size.createSquareSize(size)))
    }
}

class Shape {
    constructor(rects) {
        this.rects = rects
    }
}

const createScaledSquare = (x, y) => {
    return Rect.createSquare(x*POINT_SIZE, y*POINT_SIZE, POINT_SIZE)
}

const scaledPoints = (points, size) => {
    return points.map(point => point.map(coord => coord * size))
}

const createShape = cartisianPoints => {
    const SCALED_POINTS = scaledPoints(cartisianPoints, POINT_SIZE)
    const points = Point.createPoints(SCALED_POINTS)
    const rects = Rect.createRectsFromPointsAndSize(points, POINT_SIZE)
    return new Shape(rects)
}

const L_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1]
]

const L_2_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2]
]

const L_3_SHAPE_CARTESIAN_POINTS = [
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1]
]

const L_4_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2]
]

const L_ORIENTATIONS = [
    L_SHAPE_CARTESIAN_POINTS,
    L_2_SHAPE_CARTESIAN_POINTS,
    L_3_SHAPE_CARTESIAN_POINTS,
    L_4_SHAPE_CARTESIAN_POINTS
]

const I_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
]

const I_2_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3]
]

const I_ORIENTATIONS = [
    I_SHAPE_CARTESIAN_POINTS,
    I_2_SHAPE_CARTESIAN_POINTS,
    I_SHAPE_CARTESIAN_POINTS,
    I_2_SHAPE_CARTESIAN_POINTS
]

const Z_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1]
]

const Z_2_SHAPE_CARTESIAN_POINTS = [
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2]
]

const Z_ORIENTATIONS = [
    Z_SHAPE_CARTESIAN_POINTS,
    Z_2_SHAPE_CARTESIAN_POINTS,
    Z_SHAPE_CARTESIAN_POINTS,
    Z_2_SHAPE_CARTESIAN_POINTS
]

const S_SHAPE_CARTESIAN_POINTS = [
    [0, 1],
    [1, 1],
    [1, 0],
    [2, 0]
]

const S_2_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2]
]

const S_ORIENTATIONS = [
    S_SHAPE_CARTESIAN_POINTS,
    S_2_SHAPE_CARTESIAN_POINTS,
    S_SHAPE_CARTESIAN_POINTS,
    S_2_SHAPE_CARTESIAN_POINTS
]

const J_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1]
]

const J_2_SHAPE_CARTESIAN_POINTS = [
    [1, 0],
    [1, 1],
    [1, 2],
    [0, 2]
]

const J_3_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1]
]

const J_4_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [0, 1],
    [0, 2]
]

const J_ORIENTATIONS = [
    J_SHAPE_CARTESIAN_POINTS,
    J_2_SHAPE_CARTESIAN_POINTS,
    J_3_SHAPE_CARTESIAN_POINTS,
    J_4_SHAPE_CARTESIAN_POINTS
]

const SQ_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
]

const SQ_ORIENTATIONS = [
    SQ_SHAPE_CARTESIAN_POINTS,
    SQ_SHAPE_CARTESIAN_POINTS,
    SQ_SHAPE_CARTESIAN_POINTS,
    SQ_SHAPE_CARTESIAN_POINTS
]

const T_SHAPE_CARTESIAN_POINTS = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, 2]
]

const T_2_SHAPE_CARTESIAN_POINTS = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1]
]

const T_3_SHAPE_CARTESIAN_POINTS = [
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 1]
]

const T_4_SHAPE_CARTESIAN_POINTS = [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1]
]

const T_ORIENTATIONS = [
    T_SHAPE_CARTESIAN_POINTS,
    T_2_SHAPE_CARTESIAN_POINTS,
    T_3_SHAPE_CARTESIAN_POINTS,
    T_4_SHAPE_CARTESIAN_POINTS
]

function drawShape(shape) {
    shape.rects.forEach(drawRect)
}

function clearShape(shape) {
    shape.rects.forEach(clearRect)
}

const SHAPE_TYPES = {
    L: 'L',
    T: 'T',
    S: 'S',
    Z: 'Z',
    J: 'J',
    I: 'I',
    SQ: 'SQ'
}

const moveDown = (orientation, y) => orientation.map(point => [point[0], point[1] + (y || 0)] )
const moveLeft = (orientation, x) => orientation.map(point => [point[0] + (x || 0), point[1]] )

let state = {}

const currentOrientationFromState = state => {
    const orientation = state.shape.orientation
    switch (state.shape.type) {
        case SHAPE_TYPES.L:
            return L_ORIENTATIONS[orientation]
        case SHAPE_TYPES.S:
            return S_ORIENTATIONS[orientation]
        case SHAPE_TYPES.Z:
            return Z_ORIENTATIONS[orientation]
        case SHAPE_TYPES.SQ:
            return SQ_ORIENTATIONS[orientation]
        case SHAPE_TYPES.T:
            return T_ORIENTATIONS[orientation]
        case SHAPE_TYPES.I:
            return I_ORIENTATIONS[orientation]
        case SHAPE_TYPES.J:
            return J_ORIENTATIONS[orientation]
    }
}

const createShapeFromState = state => {
    return createShape(moveLeft(moveDown(currentOrientationFromState(state), state.y), state.x))
}

const draw = state => {
    drawShape(createShapeFromState(state))
}

const setState = __newState => {
    const previousState = state
    const newState = Object.assign({}, state, __newState)

    const validity = validState(previousState, newState)
    if (validity.value) {
        state = newState
        updateMatrix(previousState, newState)
        clearMatrix()
        drawMatrix()
    }

    if (validity.isEnd) {
        if (checkForGameOver()) {
            restartGame()
            return
        }
        checkForLines()
        state = {}
        setState(createNewState())
    }

}

const dropNewShape = () => {
    setState(newState)
}

const validState = (oldState, newState) => {
    if (!oldState.shape) {
        return { value: true }   
    }

    const oldY = oldState.y
    const oldX = oldState.x
    const oldOrientation = currentOrientationFromState(oldState)


    const newY = newState.y
    const newX = newState.x
    const newOrientation = currentOrientationFromState(newState)

    if (newX + 1 === oldX) {
        return { value: checkForShiftXNegative(oldState) }
    } else if (newX === oldX + 1) {
        return { value: checkForShiftXPositive(oldState) }
    } else if (newY === oldY + 1) {
        const value = checkForShiftYPositive(oldState)
        if (value === false) {
            return { value, isEnd: true }
        } else {
            return { value }
        }
    } else if (oldOrientation !== newOrientation) {
        return { value: checkForValidOrientation(oldState, newOrientation) }
    }

    return { value: true }
}

const checkForShiftXNegative = state => {
    const { y, x } = state
    const orientation = currentOrientationFromState(state)
    const points = leastUniqueYPoints(orientation)
    for (let index = 0; index < points.length; index++) {
        const point = points[index]
        const pointX = point[0] + x
        const pointY = point[1] + y
        if (MATRIX[pointY][pointX - 1] === 1) {
            return false
        }
    }
    return true
}

const checkForShiftXPositive = state => {
    const { y, x } = state
    const orientation = currentOrientationFromState(state)
    const points = maxUniqueYPoints(orientation)
    for (let index = 0; index < points.length; index++) {
        const point = points[index]
        const pointX = point[0] + x
        const pointY = point[1] + y
        if (MATRIX[pointY][pointX + 1] === 1) {
            return false
        }
    }
    return true
}

const checkForShiftYPositive = state => {
    const { y, x } = state
    const orientation = currentOrientationFromState(state)
    const points = maxUniqueXPoints(orientation)
    for (let index = 0; index < points.length; index++) {
        const point = points[index]
        const pointX = point[0] + x
        const pointY = point[1] + y
        if (MATRIX[pointY + 1][pointX] === 1) {
            return false
        }
    }
    return true
}

const checkForValidOrientation = (state, newOrientation) => {
    const { y, x } = state
    for (let index = 0; index < newOrientation.length; index++) {
        const point = newOrientation[index]
        const pointY = point[1] + y
        const pointX = point[0] + x

        if (pointX > COLUMNS || pointX === 0) {
            return false
        }
        if (pointY >= ROWS) {
            return false
        }
    }

    return true
}

const clearMatrix = () => {
    context.clearRect(0, 0, GRID_WIDTH, GRID_HEIGHT)
}

const updateMatrix = (oldState, newState) => {
    const oldY = oldState.y
    const oldX = oldState.x

    const newY = newState.y
    const newX = newState.x

    if (oldY !== undefined && oldX !== undefined) {
        const oldOrientation = currentOrientationFromState(oldState)
        for (let index = 0; index < oldOrientation.length; index++) {
            const point = oldOrientation[index]
            const pointX = point[0] + oldX
            const pointY = point[1] + oldY
            MATRIX[pointY][pointX] = 0
        }
    }

    const newOrientation = currentOrientationFromState(newState)
    for (let index = 0; index < newOrientation.length; index++) {
        const point = newOrientation[index]
        const pointX = point[0] + newX
        const pointY = point[1] + newY
        MATRIX[pointY][pointX] = 1
    }
}

let score = 0
const scoreEl = document.getElementById('score')
const updateScore = count => {
    score += count
    scoreEl.innerText = score
}

const checkForLines = () => {
    const rows = MATRIX.slice(0, ROWS).filter(row => !row.includes(0)).length
    updateScore(rows)
    for (let index = 0; index < ROWS; index++) {
        const row = MATRIX[index]
        const isThereAnyZero = row.includes(0)
        if (!isThereAnyZero) {
            MATRIX = [
                MATRIX.slice(0, 1),
                ...MATRIX.slice(0, index),
                ...MATRIX.slice(index+1)
            ]
        }
    }
}

const checkForGameOver = () => {
    const firstRow = MATRIX[0]
    return firstRow.slice(1, firstRow.length - 1).includes(1)
}

const drawMatrix = () => {
    for (let index = 0; index < ROWS; index++) {
        const row = MATRIX[index]
        for (let index2 = 0; index2 < COLUMNS; index2++) {
            // increament 1 because we have to skip one wall
            const col = row[index2+1];
            if (col) {
                drawRect(createScaledSquare(index2, index), state.color)
            }
        }
    }
}

window.addEventListener('keydown', e => {
    if (e.keyCode === 38) {
        e.preventDefault()
        setState({
            shape: {
                type: state.shape.type,
                orientation: (state.shape.orientation + 1) % L_ORIENTATIONS.length
            }
        })
    } else if (e.keyCode === 40) {
        e.preventDefault()
        setState({
            y: state.y + 1
        })
    } else if (e.keyCode === 39) {
        e.preventDefault()
        setState({
            x: state.x + 1
        })
    } else if (e.keyCode === 37) {
        e.preventDefault()
        setState({
            x: state.x - 1
        })
    } else if (e.keyCode === 32) {
        e.preventDefault()
        const y = calculateHighestYValue()
        console.log(y)
        setState({
            y
        })
    }
})

const calculateHighestYValue = () => {
    const orientation = currentOrientationFromState(state)
    const maxY = maxYFromOrientation(orientation)
    const afterShapeY = maxY + state.y + 1
    const points = maxUniqueXPoints(orientation)
    

    let maxValue = 0
    for (let index = 0; index < points.length; index++) {
        const point = points[index]
        const currentShapeX = point[0] + state.x
        for (let y = afterShapeY; y < ROWS; y++) {
            for (let x = 1; x <= COLUMNS; x++) {
                if (x === currentShapeX) {
                    if (MATRIX[y][x] === 1) {
                        if (maxValue < (y)) {
                            maxValue = y
                        }
                    }
                }
            }
        }
    }
    return (ROWS - 2) - maxValue
}

const maxUniqueXPoints = orientation => {
    const __ = {}
    for (let index = 0; index < orientation.length; index++) {
        const point = orientation[index]
        if (!__[point[0]]) {
            __[point[0]] = point[1]
        }
        if (__[point[0]] < point[1]) {
            __[point[0]] = point[1]
        }
    }
    return Object.keys(__).map(x => [parseInt(x), __[x]])
}

const leastUniqueYPoints = orientation => {
    const __ = {}
    for (let index = 0; index < orientation.length; index++) {
        const point = orientation[index]
        if (__[point[1]] === undefined) {
            __[point[1]] = point[0]
        }
        if (__[point[1]] > point[0]) {
            __[point[1]] = point[0]
        }
    }
    return Object.keys(__).map(y => [__[y], parseInt(y)])
}

const maxUniqueYPoints = orientation => {
    const __ = {}
    for (let index = 0; index < orientation.length; index++) {
        const point = orientation[index]
        if (__[point[1]] === undefined) {
            __[point[1]] = point[0]
        }
        if (__[point[1]] < point[0]) {
            __[point[1]] = point[0]
        }
    }
    return Object.keys(__).map(y => [__[y], parseInt(y)])
}

setState({
    shape: {
        type: randomValueFrom(SHAPE_TYPES),
        orientation: 0
    },
    y: 0,
    x: COLUMNS / 2,
    color: randomColor()
})

const leastXFromOrientation = orientation => {
    let x = 2
    for (let index = 0; index < orientation.length; index++) {
        const point = orientation[index]
        if (x > point[0]) {
            x = point[0]
        }
    }

    return x
}

const maxXFromOrientation = orientation => {
    let x = -1
    for (let index = 0; index < orientation.length; index++) {
        const point = orientation[index]
        if (x < point[0]) {
            x = point[0]
        }
    }

    return x
}


const maxYFromOrientation = orientation => {
    let y = -1
    for (let index = 0; index < orientation.length; index++) {
        const point = orientation[index]
        if (y < point[1]) {
            y = point[1]
        }
    }

    return y
}

const randomNewShape = () => {
    const randomOrientation = Math.floor((Math.random() * 4))
    return {
        type: randomValueFrom(SHAPE_TYPES),
        orientation: randomOrientation
    }
}

const createNewState = () => {
    return {
        shape: randomNewShape(),
        y: 0,
        x: COLUMNS / 2 - 1,
        color: randomColor()
    }
}

let isPlaying = true
let reqAnimId
let timestamp = Date.now()
const tick = () => {
    if (Date.now() - timestamp >= 1000) {
        timestamp = Date.now()
        setState({
            y: state.y + 1
        })
    }
    reqAnimId = window.requestAnimationFrame(tick)
}
tick()

const togglePlay = document.getElementById('togglePlay')
togglePlay.addEventListener('click', () => {
    if (isPlaying) {
        isPlaying = false
        cancelAnimationFrame(reqAnimId)
        togglePlay.innerText = 'Play'
    } else {
        isPlaying = true
        reqAnimId = window.requestAnimationFrame(tick)
        togglePlay.innerText = 'Pause'
    }
})

const restart = document.getElementById('restart')
restart.addEventListener('click', () => {
    restartGame()
})

const restartGame = () => {
    clearAll()
    isPlaying = true
    togglePlay.innerText = 'Pause'
    MATRIX = initializeMatrix()
    setState({
        shape: randomNewShape(),
        y: 0,
        x: COLUMNS / 2 - 1,
        color: randomColor()
    })
}

const clearAll = () => {
    context.clearRect(0, 0, GRID_WIDTH, GRID_HEIGHT)
}