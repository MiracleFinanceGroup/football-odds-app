import React from "react";

export default function FootballOddsApp() {
  return (
    <div className="grid grid-cols-5 h-screen p-4 gap-2 bg-gray-100">
      {/* 左側比賽列表 */}
      <div className="col-span-1 bg-white rounded-xl p-2 overflow-y-auto shadow">
        <h2 className="text-lg font-bold mb-2">比賽列表</h2>
        <div className="space-y-2">
          <button className="w-full p-2 border rounded hover:bg-gray-100 text-left">
            阿甲 - 帕特羅納托 vs 聖馬丁 81'
          </button>
          <button className="w-full p-2 border rounded hover:bg-gray-100 text-left">
            英超 - 曼城 vs 阿森納 即將開始
          </button>
        </div>
      </div>

      {/* 右側內容區 */}
      <div className="col-span-4 grid grid-rows-[auto_1fr_auto] gap-2">
        {/* 過濾器區 */}
        <div className="bg-white rounded-xl p-4 shadow flex flex-wrap gap-4 items-center">
          <span className="font-semibold">博彩公司：</span>
          <select className="border rounded p-1">
            <option>全部</option>
            <option>易勝博</option>
            <option>威廉希爾</option>
            <option>立博</option>
          </select>

          <span className="font-semibold">返還率範圍：</span>
          <input type="text" placeholder="例如：0.85 - 0.95" className="border rounded p-1" />

          <span className="font-semibold">初盤範圍：</span>
          <input type="text" placeholder="例如：1.0 - 2.0" className="border rounded p-1" />

          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">查詢</button>
        </div>

        {/* 數據分析表格區 */}
        <div className="bg-white rounded-xl p-4 shadow overflow-auto">
          <h2 className="text-lg font-bold mb-2">數據分析</h2>
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
              <tr>
                <td className="border p-1">易勝博</td>
                <td className="border p-1">2.17</td>
                <td className="border p-1">3.0</td>
                <td className="border p-1">3.2</td>
                <td className="border p-1">90.36%</td>
              </tr>
              <tr>
                <td className="border p-1">威廉希爾</td>
                <td className="border p-1">2.25</td>
                <td className="border p-1">3.25</td>
                <td className="border p-1">3.2</td>
                <td className="border p-1">91.53%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 分析結果區 */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-bold mb-2">分析結果</h2>
          <div>易勝博 + 立博: 主勝</div>
          <div>威廉希爾 + 澳門: 平局</div>
        </div>
      </div>
    </div>
  );
}
