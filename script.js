// ==========================================
// Riemann Sums → Definite Integral
// Interactive Simulation
// ==========================================


// ---------- Get HTML Elements ----------

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const rectangleSlider = document.getElementById("rectangleSlider");
const rectangleValue = document.getElementById("rectangleValue");

const methodSelect = document.getElementById("methodSelect");

const approxArea = document.getElementById("approxArea");
const exactIntegral = document.getElementById("exactIntegral");
const errorValue = document.getElementById("errorValue");

const ahaButton = document.getElementById("ahaButton");
const ahaMessage = document.getElementById("ahaMessage");


// ---------- Mathematical Settings ----------

// Function: f(x) = x²
function f(x) {
    return x * x;
}

// Integration interval
const xMin = 0;
const xMax = 1;

// Exact integral of x² from 0 to 1
const exactValue = 1 / 3;


// ---------- Canvas Setup ----------

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawGraph();
}


// ---------- Coordinate System ----------

function getGraphSettings() {

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const paddingLeft = 65;
    const paddingRight = 30;
    const paddingTop = 30;
    const paddingBottom = 55;

    return {
        width,
        height,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,

        graphWidth:
            width - paddingLeft - paddingRight,

        graphHeight:
            height - paddingTop - paddingBottom
    };
}


// Convert mathematical x → canvas x
function toCanvasX(x, settings) {

    return settings.paddingLeft +
        ((x - xMin) / (xMax - xMin)) *
        settings.graphWidth;
}


// Convert mathematical y → canvas y
function toCanvasY(y, settings) {

    const yMax = 1.1;

    return settings.height -
        settings.paddingBottom -
        (y / yMax) *
        settings.graphHeight;
}


// ---------- Draw Graph ----------

function drawGraph() {

    const settings = getGraphSettings();

    const width = settings.width;
    const height = settings.height;

    ctx.clearRect(0, 0, width, height);

    drawGrid(settings);

    drawAxes(settings);

    drawRectangles(settings);

    drawFunction(settings);
}


// ---------- Draw Grid ----------

function drawGrid(settings) {

    ctx.save();

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {

        const y =
            settings.height -
            settings.paddingBottom -
            (i / 5) * settings.graphHeight;

        ctx.beginPath();

        ctx.moveTo(
            settings.paddingLeft,
            y
        );

        ctx.lineTo(
            settings.width - settings.paddingRight,
            y
        );

        ctx.stroke();
    }


    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {

        const x =
            settings.paddingLeft +
            (i / 10) * settings.graphWidth;

        ctx.beginPath();

        ctx.moveTo(
            x,
            settings.paddingTop
        );

        ctx.lineTo(
            x,
            settings.height - settings.paddingBottom
        );

        ctx.stroke();
    }

    ctx.restore();
}


// ---------- Draw Axes ----------

function drawAxes(settings) {

    ctx.save();

    ctx.strokeStyle = "#111827";
    ctx.fillStyle = "#111827";

    ctx.lineWidth = 2;

    // X axis
    const xAxisY =
        settings.height -
        settings.paddingBottom;

    ctx.beginPath();

    ctx.moveTo(
        settings.paddingLeft,
        xAxisY
    );

    ctx.lineTo(
        settings.width - settings.paddingRight,
        xAxisY
    );

    ctx.stroke();


    // Y axis
    ctx.beginPath();

    ctx.moveTo(
        settings.paddingLeft,
        settings.paddingTop
    );

    ctx.lineTo(
        settings.paddingLeft,
        xAxisY
    );

    ctx.stroke();


    // X labels
    ctx.font = "13px Arial";

    ctx.textAlign = "center";

    for (let i = 0; i <= 10; i++) {

        const x =
            settings.paddingLeft +
            (i / 10) *
            settings.graphWidth;

        const value = i / 10;

        ctx.fillText(
            value.toFixed(1),
            x,
            xAxisY + 25
        );
    }


    // Y labels
    ctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {

        const value = i / 5;

        const y =
            xAxisY -
            (value / 1.1) *
            settings.graphHeight;

        ctx.fillText(
            value.toFixed(1),
            settings.paddingLeft - 10,
            y + 4
        );
    }


    // Axis titles
    ctx.font = "bold 14px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "x",
        settings.width - settings.paddingRight + 10,
        xAxisY + 5
    );

    ctx.save();

    ctx.translate(
        20,
        settings.paddingTop +
        settings.graphHeight / 2
    );

    ctx.rotate(-Math.PI / 2);

    ctx.fillText(
        "f(x)",
        0,
        0
    );

    ctx.restore();

    ctx.restore();
}


// ---------- Draw Function Curve ----------

function drawFunction(settings) {

    ctx.save();

    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;

    ctx.beginPath();

    const steps = 300;

    for (let i = 0; i <= steps; i++) {

        const x =
            xMin +
            (i / steps) *
            (xMax - xMin);

        const y = f(x);

        const canvasX =
            toCanvasX(x, settings);

        const canvasY =
            toCanvasY(y, settings);

        if (i === 0) {

            ctx.moveTo(
                canvasX,
                canvasY
            );

        } else {

            ctx.lineTo(
                canvasX,
                canvasY
            );
        }
    }

    ctx.stroke();

    ctx.restore();
}


// ---------- Draw Riemann Rectangles ----------

function drawRectangles(settings) {

    const n =
        Number(rectangleSlider.value);

    const method =
        methodSelect.value;

    const dx =
        (xMax - xMin) / n;


    ctx.save();

    ctx.fillStyle = "rgba(37, 99, 235, 0.18)";
    ctx.strokeStyle = "rgba(37, 99, 235, 0.65)";
    ctx.lineWidth = 1;


    for (let i = 0; i < n; i++) {

        const left =
            xMin + i * dx;

        const right =
            left + dx;

        let sampleX;


        if (method === "left") {

            sampleX = left;

        } else if (method === "right") {

            sampleX = right;

        } else {

            sampleX =
                (left + right) / 2;
        }


        const rectangleHeight =
            f(sampleX);


        const x =
            toCanvasX(left, settings);

        const xRight =
            toCanvasX(right, settings);

        const y =
            toCanvasY(rectangleHeight, settings);

        const baseY =
            toCanvasY(0, settings);


        const width =
            xRight - x;

        const height =
            baseY - y;


        ctx.fillRect(
            x,
            y,
            width,
            height
        );

        ctx.strokeRect(
            x,
            y,
            width,
            height
        );
    }

    ctx.restore();
}


// ---------- Calculate Riemann Sum ----------

function calculateRiemannSum() {

    const n =
        Number(rectangleSlider.value);

    const method =
        methodSelect.value;

    const dx =
        (xMax - xMin) / n;

    let sum = 0;


    for (let i = 0; i < n; i++) {

        const left =
            xMin + i * dx;

        const right =
            left + dx;

        let sampleX;


        if (method === "left") {

            sampleX = left;

        } else if (method === "right") {

            sampleX = right;

        } else {

            sampleX =
                (left + right) / 2;
        }


        sum +=
            f(sampleX) * dx;
    }


    return sum;
}


// ---------- Update Numbers ----------

function updateResults() {

    const sum =
        calculateRiemannSum();

    const error =
        Math.abs(exactValue - sum);


    rectangleValue.textContent =
        rectangleSlider.value;


    approxArea.textContent =
        sum.toFixed(4);


    exactIntegral.textContent =
        exactValue.toFixed(4);


    errorValue.textContent =
        error.toFixed(4);
}


// ---------- Update Simulation ----------

function updateSimulation() {

    updateResults();

    drawGraph();
}


// ---------- Slider Event ----------

rectangleSlider.addEventListener(
    "input",
    updateSimulation
);


// ---------- Method Event ----------

methodSelect.addEventListener(
    "change",
    updateSimulation
);


// ---------- Aha! Moment ----------

let ahaRunning = false;

ahaButton.addEventListener(
    "click",
    startAhaMoment
);


function startAhaMoment() {

    if (ahaRunning) {
        return;
    }

    ahaRunning = true;

    ahaMessage.style.display = "block";

    ahaButton.textContent =
        "✨ Watch the rectangles become thinner...";


    const originalValue =
        Number(rectangleSlider.value);

    const originalMethod =
        methodSelect.value;


    methodSelect.value =
        "midpoint";


    let current = 5;


    const animation = setInterval(
        function () {

            rectangleSlider.value =
                current;

            updateSimulation();


            if (current >= 100) {

                clearInterval(animation);

                setTimeout(
                    function () {

                        rectangleSlider.value =
                            originalValue;

                        methodSelect.value =
                            originalMethod;

                        updateSimulation();

                        ahaButton.textContent =
                            "⭐ Show Aha! Moment";

                        ahaRunning = false;

                    },
                    2000
                );

                return;
            }


            current += 5;

        },
        100
    );
}


// ---------- Keyboard Accessibility ----------

rectangleSlider.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowLeft" ||
            event.key === "ArrowRight") {

            setTimeout(
                updateSimulation,
                0
            );
        }
    }
);


// ---------- Window Resize ----------

window.addEventListener(
    "resize",
    resizeCanvas
);


// ---------- Start Simulation ----------

resizeCanvas();

updateResults();