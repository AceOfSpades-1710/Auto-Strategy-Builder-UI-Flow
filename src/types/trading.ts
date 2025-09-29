export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  timestamp: Date;
  pnl?: number;
  selected?: boolean;
}

export interface CandlestickData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface DecisionNode {
  id: string;
  type: 'condition' | 'action';
  title: string;
  description: string;
  parameters?: Record<string, any>;
  connections?: string[];
}

export interface StrategyParameters {
  stopLoss: number;
  takeProfit: number;
  trailingStop: boolean;
  riskPerTrade: number;
  maxDrawdown: number;
}

export interface BacktestResults {
  totalReturn: number;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  totalTrades: number;
  avgTrade: number;
  equityCurve: Array<{ date: Date; value: number }>;
  drawdownCurve: Array<{ date: Date; drawdown: number }>;
}

export type Screen = 'select' | 'replay' | 'builder' | 'results' | 'monitoring';