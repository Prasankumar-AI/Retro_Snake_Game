# 🚀 Python's World: One-Shot Project Creation Prompt (v2)

Copy and paste the prompt below into any advanced AI coding assistant to recreate this entire project from scratch in one go.

---

## 🎭 The Prompt (Copy from here)

"Create a full-stack, retro-themed web application called **'Python's World'** using HTML5, CSS3, Vanilla JavaScript, and a Python Flask backend. The project must have a professional 1980s arcade aesthetic with CRT monitor flicker, scanline overlays, and neon colors.

### Phase 1: Frontend & UI
1. **Landing Page**: 
    - Dark background with neon green accents and 'Press Start 2P' Google Font.
    - Animation: Pixelated snakes falling/crawling randomly across the background.
    - A central button: 'ENTER PYTHON'S WORLD'.
2. **Profile Setup**:
    - A form with 'First Name', 'Last Name', and 'Age'.
    - A 'START NEW GAME' button that transitions to the game.
3. **Footer**:
    - Text: 'DEVELOPED BY PRASAN KUMAR'.
    - Social Icons: LinkedIn, GitHub, and Instagram with neon-pink glowing hover effects (use Font Awesome).

### Phase 2: Snake Game Logic
1. **Mechanics**: 
    - 20x20 grid on an HTML5 Canvas.
    - Arrow key controls.
    - Snake grows by eating red food blocks; +100 points per block.
    - Collision detection for walls and self-collision.
2. **Game Over**:
    - A retro overlay showing final score and best score.
    - Buttons for 'TRY AGAIN' and 'LEADERBOARD'.

### Phase 3: Backend & Database
1. **Flask API**:
    - `POST /save_user`: To register player details.
    - `POST /submit_score`: To update the highest score for a user.
    - `GET /leaderboard`: To fetch the top 10 players.
2. **Database**: Use SQLAlchemy with a `User` model (id, first_name, last_name, age, high_score). Use a local SQLite database by default but allow for a `DATABASE_URL` environment variable for PostgreSQL.

### Phase 4: Cloud Readiness & Deployment
1. **Dockerfile**: Create a production-ready Dockerfile using Python 3.9-slim and Gunicorn.
2. **requirements.txt**: Include `flask`, `flask-sqlalchemy`, `flask-cors`, `psycopg2-binary`, and `gunicorn`.
3. **Git Integration**: Provide a `.gitignore` to exclude local databases and cache files.

**Important**: Ensure all files (`index.html`, `style.css`, `script.js`, `app.py`, `Dockerfile`) are fully implemented, connected, and follow best practices for modern web design while maintaining the retro feeling."

---

## 📦 Project Artifacts Included:
- **Full Source Code**: Consolidated in `full_project_summary.md`.
- **Kid-Friendly Guide**: Provided in `documentation_10yo.md`.
- **Live Links**: Cloud Run and GitHub confirmed.

**To generate your PDF v2:**
1. Open this file: [**one_shot_project_prompt.md**](file:///C:/Users/PrasannaNariboina/OneDrive%20-%20IBM/Prasan_Devops/PromptWar/Retro_Snake_Game/one_shot_project_prompt.md)
2. Select **"Print to PDF"** in your browser or editor.
