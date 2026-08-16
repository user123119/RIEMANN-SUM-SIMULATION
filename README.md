# Riemann Sums → Definite Integral

An interactive web simulation that helps Class 11 and 12 students understand how Riemann sums approximate a definite integral.

## 🧮 Mathematical Concept

The simulation uses the function:

**f(x) = x²**

over the interval:

**0 ≤ x ≤ 1**

The exact integral is:

**∫₀¹ x² dx = 1/3 ≈ 0.3333**

The simulation demonstrates how increasing the number of rectangles makes the Riemann-sum approximation closer to the exact integral.

## ✨ Features

- Interactive graph
- Adjustable number of rectangles
- Left Riemann Sum
- Midpoint Riemann Sum
- Right Riemann Sum
- Approximate area calculation
- Exact integral calculation
- Error calculation
- Real-time updates
- "Show Aha! Moment" animation
- Student-friendly explanation

## 🎯 Learning Objective

The goal of this simulation is to help Class 11 and 12 students understand the connection between Riemann sums and definite integrals.

Instead of only learning the integration formula, students can visually see how rectangles approximate the area under the curve.

## 💡 Aha! Moment

As the number of rectangles increases, the rectangles become thinner and fit the curve more closely.

For example:

**5 → 10 → 20 → 50 → 100 rectangles**

The Riemann-sum approximation gets closer to the exact integral:

**Riemann Sum → Definite Integral**

## 📐 Riemann Sum Methods

The simulation provides three methods:

- Left Riemann Sum
- Midpoint Riemann Sum
- Right Riemann Sum

Users can switch between these methods and observe how the rectangles and calculated area change.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- HTML5 Canvas
- GitHub Pages

## 🤖 AI Workflow & Disclosure

AI tools were used as coding assistants during development.

ChatGPT was used to:

- Plan the project structure
- Generate and explain HTML, CSS, and JavaScript code
- Explain the Riemann-sum calculations
- Help debug coding issues
- Improve the user interface
- Develop the Aha! Moment concept

The generated code was reviewed, modified, and tested manually in the browser.

## 🧪 Testing

The simulation was tested with different numbers of rectangles:

- 5
- 10
- 20
- 50
- 100

The Left, Midpoint, and Right Riemann-sum methods were also tested.

The slider, graph, calculations, and Aha! Moment animation were tested to make sure they update correctly.

## 🚀 How to Run

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using Live Server.
4. Adjust the number of rectangles using the slider.
5. Select Left, Midpoint, or Right Riemann Sum.
6. Observe the Approximate Area, Exact Integral, and Error.
7. Click **Show Aha! Moment** to see how increasing the number of rectangles improves the approximation.

## 📂 Project Structure

```text
RIEMANN-SUM-SIMULATION/
│
├── index.html
├── style.css
├── script.js
└── README.md