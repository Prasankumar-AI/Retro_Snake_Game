# Python's World: A Retro Snake Adventure 🐍✨

Hello! Welcome to the behind-the-scenes tour of **Python's World**. We’ve built a cool, old-school video game that looks like it came straight out of the 1980s! 

Think of this like a LEGO set, but instead of plastic bricks, we used **code**. Let's see how each piece fits together.

---

## 🏗️ The Build: Four Main Parts

Our project has four "layers," just like a delicious cake:
1.  **The Look (HTML & CSS)**: What you see on the screen.
2.  **The Game (JavaScript)**: How the snake moves and eats.
3.  **The Brain (Python & Flask)**: Remembering your name and high score.
4.  **The Cloud (Google Cloud)**: Putting the game on the internet so your friends can play!

---

## 🎨 Layer 1: The Look (Making it Retro)
**Files Used**: `index.html` and `style.css`

Imagine you are looking at an old TV screen. It has those little blurry lines and a slight flicker. That's what we created!

-   **index.html**: This is the skeleton of our website. It tells the computer where to put the title ("PYTHON'S WORLD"), the game screen, and the buttons.
-   **style.css**: This is the "paint." We used **Neon Green** and **Dark Black** to make it look like an arcade game. 
    -   **The Scanline Effect**: We added a special layer that makes those cool lines move down the screen.
    -   **The Footer**: Look at the bottom! We added **"DEVELOPED BY PRASAN KUMAR"** with icons for LinkedIn, GitHub, and Instagram so people can say hi to the creator.

---

## 🕹️ Layer 2: The Game (Snake Logic)
**File Used**: `script.js`

This is where the magic happens. We told the computer exactly how a snake should act.

1.  **Moving Around**: We told the computer: "If I press the Up Arrow, move the snake's head up!"
2.  **Eating Snacks**: When the snake's head touches a **Red Dot** (Food), it grows longer, and you get **100 Points**!
3.  **The Rules**: 
    -   If the snake hits the wall... **GAME OVER!**
    -   If the snake bites its own tail... **GAME OVER!**
4.  **Special Animation**: On the home screen, we have "ghost snakes" falling down like snow. It makes the world feel alive!

---

## 🧠 Layer 3: The Brain (The Backend)
**File Used**: `app.py`

When the game ends, your "Best Score" needs to be saved somewhere so you don't lose it when you turn off the computer.

-   **The Notebook (Database)**: We used a "Notebook" called **PostgreSQL** to write down everyone's name, age, and best score.
-   **The Messenger (Flask)**: When you finish a game, the game (JavaScript) sends a message to the Brain (Python) saying: *"Hey! Prasan just scored 500 points! Save it!"* The Brain then writes it in the notebook.

---

## ☁️ Layer 4: The Home (Google Cloud)
**File Used**: `Dockerfile`

Instead of the game living only on *your* computer, we put it on a giant "Super Computer" in the cloud (Google Cloud Run).

-   **The Shipping Container (Docker)**: We packed the game, the brain, and all the tools into a special box called a **Docker Image**. This box can be opened anywhere on the internet and it will work perfectly!
-   **The Cloud URL**: Because we put it in the cloud, you can now play it anywhere at [this special link](https://retro-snake-game-315759889303.us-central1.run.app)!

---

## 🛠️ Step-by-Step: How to Run it Yourself!

If you want to play with the code on your own computer, follow these simple steps:

1.  **Open the Folder**: Go to the project folder.
2.  **Get the Tools**: Open your terminal and type:
    ```bash
    pip install -r requirements.txt
    ```
    *This is like buying all the ingredients before you start baking.*
3.  **Start the Engine**: Type:
    ```bash
    python app.py
    ```
4.  **Play!**: Open your browser and go to `http://localhost:8080`.

---

### 👨‍💻 Developed by Prasan Kumar
*Built with ❤️ for the next generation of coders!*
