import { useState } from "react";

export default function FootballOddsApp() {
  const matches = [
    { id: 1, league: "阿甲", home: "帕特羅納托", away: "聖馬丁", time: "81'", score: "3-0" },
    { id: 2, league: "英超", home: "曼城", away: "阿森納", time: "即將開始", score: "0-0" },
  ];

  const fakeApiResponse = {
    1: [
      { company: "易勝博", win: 2.17, draw: 3.0, lose: 3.2, returnRate: "90.36%" },
      { company: "威廉希爾", win: 2.25, draw: 3.25, lose: 3.2, returnRate: "91.53%" },
    ],
    2: [
      { company: "立博", win: 1.95, draw: 3.10, lose: 3.80, returnRate: "89.40%" },
      { company: "澳門", win: 2.05, draw: 3.00, lose: 3.60, returnRate: "90.50%" },
    ],
  };

  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [returnRateRange, setReturnRateRange] = useState("");
  const [initialOddsRange, setInitialOddsRange] = useState("");

  const handleSelectMatch = (matchId) => {
    setSelectedId(matchId);
    setData([]);
  };

  const toggleCompany = (company) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const handleQuery = () => {
    if (selectedId) {
      let result = fakeApiResponse[selectedId] || [];

      if (selectedCompanies.length > 0) {
        result = result.filter((row) => selectedCompanies.includes(row.company));
      }

      setData(result);
    }
  };

  return (
    <div className="grid grid-cols-5 h-screen p-4 gap-2 bg-gray-100">
      <div className="col-span-1 bg-white rounded-xl p-2 overflow-y-auto shadow">
        <h2 className="text-lg font-bold mb-2">比賽列表</h2>
        <div className="space-y-2">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => handleSelectMatch(match.id)}
              className={`w-full p-2 border rounded text-left hover:bg-gray-100 ${
                selectedId === match.id ? "bg-blue-100" : ""
              }`}
            >
              {match.league} - {match.home} vs {match.away} {match.time}
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-4 grid grid-rows-[auto_1fr_auto] gap-2">
        <div className="bg-white rounded-xl p-4 shadow flex flex-wrap gap-4 items-center">
          <span className="font-semibold">博彩公司：</span>
          {['易勝博', '威廉希爾', '立博', '澳門'].map((company) => (
            <label key={company} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company)}
                onChange={() => toggleCompany(company)}
              />
              {company}
            </label>
          ))}

          <span className="font-semibold">返還率範圍：</span>
          <input
            type="text"
            value={returnRateRange}
            onChange={(e) => setReturnRateRange(e.target.value)}
            placeholder="例如：0.85 - 0.95"
            className="border rounded p-1"
          />

          <span className="font-semibold">初盤範圍：</span>
          <input
            type="text"
            value={initialOddsRange}
            onChange={(e) => setInitialOddsRange(e.target.value)}
            placeholder="例如：1.0 - 2.0"
            className="border rounded p-1"
          />

          <button
            onClick={handleQuery}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            查詢
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 shadow overflow-auto">
          <h2 className="text-lg font-bold mb-2">數據分析</h2>
          {data.length > 0 ? (
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-1">公司</th>
                  <th className="border p-1">勝</th>
                  <th className="border p-1">平</th>
                  <th className="border p-1">負</th>
                  <th className="border p-1">返還率</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-1">{row.company}</td>
                    <td className="border p-1">{row.win}</td>
                    <td className="border p-1">{row.draw}</td>
                    <td className="border p-1">{row.lose}</td>
                    <td className="border p-1">{row.returnRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>請先選擇比賽並點擊查詢</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-bold mb-2">分析結果</h2>
          <div>易勝博 + 立博: 主勝</div>
          <div>威廉希爾 + 澳門: 平局</div>
        </div>
      </div>
    </div>
  );
}