# 🧱 Brick Breaker Game (JavaScript)
![Uploading image.png…]()

A classic **Brick Breaker** browser game built with **vanilla JavaScript**, using `requestAnimationFrame` for smooth gameplay, responsive resizing, and a real-time timer with pause support.

---

## 🎮 Features

* Paddle movement with keyboard controls
* Ball physics with collision detection
* Breakable bricks with score tracking
* Lives system with heart icons
* Win & lose screens with star ratings ⭐
* Real-time timer (pauses when the game pauses)
* Fully responsive game board (handles window resize)
* Restart system without page reload

---

## 📂 Project Structure

```text
├── controle.js      # Game loop, paddle & ball logic, timer
├── responsi.js      # Responsive resize handling
├── variables.js     # Game state, DOM references, setup logic
├── images/
│   ├── heart.png
│   ├── star.png
│   ├── starlos.png
│   └── refresh-action.png
├── index.html
└── style.css
```

---

## 🧠 File Overview

### `variables.js`

Contains all shared game data and setup logic:

* `gameStat` – game state (score, lives, pause, win/lose)
* `position` – paddle & ball positions
* `demention` – board and object sizes
* `setapBriks` – brick creation & layout
* `restartGame` – win/lose UI and retry logic
* `timerInfo` – timer tracking

---

### `controle.js`

Main game logic:

* Paddle movement
* Ball physics & collisions
* Brick destruction
* Score & lives handling
* Win/Lose detection
* Game loop using `requestAnimationFrame`
* Accurate real-time timer with pause support

Exported function:

```js
loop(time)
```

---

### `responsi.js`

Handles responsive behavior:

* Recalculates board, paddle, ball, and brick sizes
* Keeps ball and paddle positions proportional on resize
* Reflows remaining bricks correctly

Exported function:

```js
handleResize()
```

---

## ⌨️ Controls

* **Left Arrow** → Move paddle left
* **Right Arrow** → Move paddle right
* **Space / Start key** → Launch the ball (depending on your key handler)

---

## 🕒 Timer Logic

* Starts when the game begins
* Pauses automatically when the ball is not launched
* Resumes accurately without losing elapsed time
* Display format:

  * `MM:SS`
  * `H:MM:SS` (if longer than 1 hour)

---

## 🏆 Win Conditions

* Destroy all bricks
* Star rating depends on completion time:

  * ⭐⭐⭐ Fast
  * ⭐⭐ Medium
  * ⭐ Slow

---

## 💥 Lose Conditions

* Lose all lives
* Ball falls below the paddle 3 times

---

## 🔁 Restart System

* No page reload
* Resets:

  * Score
  * Lives
  * Timer
  * Bricks
  * Ball & paddle positions

---

## 🚀 How to Run

1. Open `index.html` in a browser
2. Make sure JavaScript modules are supported
3. Enjoy the game 🎉

> Tip: Use a local server for best results (e.g. Live Server in VS Code)

---


## 📌 Notes

* No external libraries
* Easy to extend (power-ups, levels, sounds)
* Clean modular architecture

---

**Have fun breaking bricks! 🧱🔥**
