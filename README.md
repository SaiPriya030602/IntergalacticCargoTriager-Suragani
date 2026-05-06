# IntergalacticCargoTriager-Suragani

## How to Run Locally

### Backend (FastAPI)
1. Install dependencies:
   pip install fastapi uvicorn python-multipart

2. Run the parser first:
   python parser.py

3. Start the API server:
   python -m uvicorn api:app --reload

4. API runs at: http://127.0.0.1:8000/api/cargo

### Frontend (React)
1. Navigate to frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start React app:
   npm start

4. Frontend runs at: http://localhost:3000