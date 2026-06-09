"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Nov", revenue: 1800 },
  { month: "Dec", revenue: 2200 },
  { month: "Jan", revenue: 1600 },
  { month: "Feb", revenue: 2400 },
  { month: "Mar", revenue: 2800 },
  { month: "Apr", revenue: 2100 },
  { month: "May", revenue: 3200 },
];

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900 p-5">
      <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>
      <p className="text-xs text-white/50">Monthly revenue in GBP</p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="pinkRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              dataKey="month"
              stroke="#a1a1aa"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#a1a1aa"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `\u00A3${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1a1a",
                border: "1px solid #262626",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "13px",
              }}
              formatter={(value) => [`\u00A3${value}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#EC4899"
              strokeWidth={2}
              fill="url(#pinkRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
