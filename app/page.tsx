import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard de Avaliação Física",
  description:
    "Sistema de Avaliação Física, Fisioterapia e Análise de Desempenho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// app/page.tsx
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return <Dashboard />;
}

// types/dashboard.ts
export interface UserStats {
  assessment: {
    number: number;
    date: string;
  };
  age: {
    years: number;
    birthDate: string;
  };
  weight: {
    value: number;
    change: number;
  };
  height: {
    value: number;
    change: number;
  };
}

export interface ResultData {
  leanMass: { value: number; change: number };
  fatMass: { value: number; change: number };
  bodyFat: { value: number; change: number };
  bmi: { value: number; change: number };
}

export interface HistoricalData {
  month: string;
  value: number;
}

// components/Dashboard.tsx
("use client");

import { Card } from "@/components/ui/card";
import { StatsCard } from "./StatsCard";
import { ResultsGrid } from "./ResultsGrid";
import { HistoryChart } from "./HistoryChart";
import { User } from "lucide-react";
import type { UserStats, ResultData, HistoricalData } from "@/types/dashboard";

const userStats: UserStats = {
  assessment: { number: 1, date: "16/10/2024" },
  age: { years: 17, birthDate: "29/06/1994" },
  weight: { value: 58.8, change: 0 },
  height: { value: 1.63, change: 0 },
};

const results: ResultData = {
  leanMass: { value: 15, change: 18 },
  fatMass: { value: 15, change: 18 },
  bodyFat: { value: 15, change: 18 },
  bmi: { value: 15, change: 18 },
};

const historicalData: HistoricalData[] = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 60 },
  { month: "Apr", value: 85 },
  { month: "May", value: 100 },
  { month: "Jun", value: 120 },
  { month: "Jul", value: 140 },
  { month: "Aug", value: 155 },
  { month: "Sep", value: 180 },
  { month: "Oct", value: 210 },
  { month: "Nov", value: 235 },
  { month: "Dec", value: 240 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bem vinda, Anna Mendes</h1>
          <p className="text-gray-400">
            Esse é seu relatório de Avaliação Física, Fisioterapia e Análise de
            Desempenho
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Avaliação"
          value={`${userStats.assessment.number}ª Avaliação`}
          subtitle={userStats.assessment.date}
        />
        <StatsCard
          title="Idade"
          value={`${userStats.age.years} anos`}
          subtitle={userStats.age.birthDate}
        />
        <StatsCard
          title="Peso"
          value={`${userStats.weight.value}kg`}
          change={userStats.weight.change}
        />
        <StatsCard
          title="Altura"
          value={`${userStats.height.value}cm`}
          change={userStats.height.change}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="bg-neutral-800 p-6">
            <h2 className="text-xl font-bold mb-4">Histórico</h2>
            <HistoryChart data={historicalData} />
          </Card>
        </div>
        <ResultsGrid results={results} />
      </div>
    </div>
  );
}

// components/StatsCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
}

export function StatsCard({ title, value, subtitle, change }: StatsCardProps) {
  return (
    <Card className="bg-neutral-800">
      <CardContent className="p-4">
        <h3 className="text-gray-400 mb-2">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg">{value}</span>
          {change !== undefined && (
            <span
              className={`text-sm ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          )}
          {subtitle && (
            <span className="text-sm text-gray-400">{subtitle}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// components/ResultsGrid.tsx
import { Card } from "@/components/ui/card";
import type { ResultData } from "@/types/dashboard";

interface ResultsGridProps {
  results: ResultData;
}

export function ResultsGrid({ results }: ResultsGridProps) {
  return (
    <Card className="bg-neutral-800 p-6">
      <h2 className="text-xl font-bold mb-4">Resultados Atuais</h2>
      <div className="grid grid-cols-2 gap-4">
        <ResultCard
          title="PESO MAGRO"
          value={results.leanMass.value}
          change={results.leanMass.change}
        />
        <ResultCard
          title="PESO GORDO"
          value={results.fatMass.value}
          change={results.fatMass.change}
        />
        <ResultCard
          title="% GORDURA"
          value={results.bodyFat.value}
          change={results.bodyFat.change}
        />
        <ResultCard
          title="IMC"
          value={results.bmi.value}
          change={results.bmi.change}
        />
      </div>
    </Card>
  );
}

interface ResultCardProps {
  title: string;
  value: number;
  change: number;
}

function ResultCard({ title, value, change }: ResultCardProps) {
  return (
    <div className="bg-neutral-700 p-4 rounded-lg">
      <h3 className="text-gray-400 mb-2">{title}</h3>
      <div className="text-xl font-bold">{value}%</div>
      <div className="text-red-500">+{change}%</div>
    </div>
  );
}

// components/HistoryChart.tsx
("use client");

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import type { HistoricalData } from "@/types/dashboard";

interface HistoryChartProps {
  data: HistoricalData[];
}

export function HistoryChart({ data }: HistoryChartProps) {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis dataKey="month" stroke="#888" />
      <YAxis stroke="#888" />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        dot={{ r: 4 }}
        strokeWidth={2}
      />
    </LineChart>
  );
}
