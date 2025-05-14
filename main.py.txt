from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/matches")
def get_matches():
    return [
        {"id": 1, "home": "Patronato", "away": "San Martin", "time": "81:00", "score": "3-0"},
        {"id": 2, "home": "Boca Juniors", "away": "River Plate", "time": "Start Soon", "score": "0-0"},
    ]

@app.get("/api/odds/{match_id}")
def get_odds(match_id: int):
    odds_data = {
        1: {"home_win": 2.1, "draw": 3.2, "away_win": 3.6},
        2: {"home_win": 2.5, "draw": 3.0, "away_win": 2.8},
    }
    return odds_data.get(match_id, {})

@app.websocket("/ws/odds-updates")
async def websocket_odds(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await asyncio.sleep(5)
            await websocket.send_json({
                "match_id": 1,
                "home_win": 2.0 + round(asyncio.get_event_loop().time() % 0.2, 2),
                "draw": 3.1,
                "away_win": 3.5
            })
    except Exception as e:
        print("WebSocket closed:", e)
