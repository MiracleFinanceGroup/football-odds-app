import { useEffect, useState } from 'react';

function App() {
  const [matches, setMatches] = useState([]);
  const [odds, setOdds] = useState({});
  const [liveOdds, setLiveOdds] = useState(null);

  useEffect(() => {
    fetch('https://football-odds-app.onrender.com/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data));

    const ws = new WebSocket('wss://football-odds-app.onrender.com/ws/odds-updates');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLiveOdds(data);
    };

    return () => ws.close();
  }, []);

  const loadOdds = (matchId) => {
    fetch(`http://127.0.0.1:8000/api/odds/${matchId}`)
      .then(res => res.json())
      .then(data => setOdds(data));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>赛事列表</h1>
      {matches.length === 0 ? (
        <p>加载中...</p>
      ) : (
        <ul>
          {matches.map(match => (
            <li key={match.id} style={{ marginBottom: '10px' }}>
              {match.home} vs {match.away} | 时间: {match.time} | 比分: {match.score}
              <button onClick={() => loadOdds(match.id)} style={{ marginLeft: '10px' }}>
                查看赔率
              </button>
            </li>
          ))}
        </ul>
      )}

      {odds.home_win && (
        <div style={{ marginTop: '20px' }}>
          <h2>固定赔率</h2>
          <p>主胜: {odds.home_win}</p>
          <p>平局: {odds.draw}</p>
          <p>客胜: {odds.away_win}</p>
        </div>
      )}

      {liveOdds && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h2>实时赔率（每5秒更新）</h2>
          <p>主胜: {liveOdds.home_win}</p>
          <p>平局: {liveOdds.draw}</p>
          <p>客胜: {liveOdds.away_win}</p>
        </div>
      )}
    </div>
  );
}

export default App;
