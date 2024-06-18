# Course Planner

Course Planner helps University of Waterloo students plan their courses and visualize their class schedules for the term. It is built with Next.js, Tailwind CSS, Django, and PostgreSQL.
![Screenshot 2024-06-18 at 10 56 44 AM](https://github.com/sparshmodi/planner/assets/96712734/391c472d-0f9f-4daf-bb26-6c596ff0ec9d)


## Features

- **Search for Courses:** Easily find courses by name.
- **Add Courses:** Add selected courses to your personal schedule.
   ![Screenshot 2024-06-18 at 10 57 25 AM](https://github.com/sparshmodi/planner/assets/96712734/c01a7ed7-b57f-40d4-8718-4b7255087024)

- **Visualize Schedule:** Get a visual representation of your class schedule.
  ![Screenshot 2024-06-18 at 10 57 59 AM](https://github.com/sparshmodi/planner/assets/96712734/033d8046-7da0-41ff-9eb9-3c638780bf6b)  ![Screenshot 2024-06-18 at 10 57 51 AM](https://github.com/sparshmodi/planner/assets/96712734/b286387a-3ee3-4a6c-9db0-b2db9bc62c3c)



## Running Locally

### Frontend Setup

1. **Environment Variables:**
   Create a `.env.local` file in the `frontend` directory with the following keys:
   ```
    GOOGLE_ID
    GOOGLE_SECRET
    NEXTAUTH_SECRET
    ```
2. **Install Dependencies and Run:**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```
3. **Access the Application:**

    Open http://localhost:3000 in your browser.

### Backend Setup

1. **Environment Variables:**
   Create a `.env` file in the `backend` directory with the following keys:
   ```
   UWATERLOO_API_ENDPOINT
   UWATERLOO_API_KEY
   UWATERLOO_TERM_CODE
   ```
2. **Initial Setup:**
    
    For the first run, you need to create a virtual environment, install dependencies, and populate the database with course data.
    ```bash
    cd backend
    python3 -m venv .venv
    source .venv/bin/activate
    pip3 install -r requirements.txt
    python3 manage.py fetch_courses
    python3 manage.py compute_class_schedules
    ```
3. **Running the Server:**

    For subsequent runs, simply start the server:

    ```bash
    source .venv/bin/activate
    python3 manage.py runserver
    ```
