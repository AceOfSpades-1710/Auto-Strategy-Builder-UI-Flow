import { Trade, CandlestickData, DecisionNode, BacktestResults } from '../types/trading';

export const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'buy',
    price: 150.25,
    quantity: 100,
    timestamp: new Date('2024-01-15T09:30:00'),
    pnl: 250.50,
    selected: true
  },
  {
    id: '2',
    symbol: 'AAPL',
    type: 'sell',
    price: 152.75,
    quantity: 100,
    timestamp: new Date('2024-01-15T11:45:00'),
    pnl: 250.50,
    selected: true
  },
  {
    id: '3',
    symbol: 'TSLA',
    type: 'buy',
    price: 245.80,
    quantity: 50,
    timestamp: new Date('2024-01-16T10:15:00'),
    pnl: -125.25,
    selected: false
  },
  {
    id: '4',
    symbol: 'TSLA',
    type: 'sell',
    price: 243.30,
    quantity: 50,
    timestamp: new Date('2024-01-16T14:20:00'),
    pnl: -125.25,
    selected: false
  },
  {
    id: '5',
    symbol: 'NVDA',
    type: 'buy',
    price: 520.15,
    quantity: 25,
    timestamp: new Date('2024-01-17T09:45:00'),
    pnl: 875.00,
    selected: true
  },
  {
    id: '6',
    symbol: 'NVDA',
    type: 'sell',
    price: 555.15,
    quantity: 25,
    timestamp: new Date('2024-01-17T15:30:00'),
    pnl: 875.00,
    selected: true
  }
];

export const generateCandlestickData = (days: number = 30): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let price = 150;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    const open = price + (Math.random() - 0.5) * 2;
    const close = open + (Math.random() - 0.5) * 4;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    const volume = Math.floor(Math.random() * 1000000) + 500000;
    
    data.push({
      timestamp: date,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume
    });
    
    price = close;
  }
  
  return data;
};

export const mockDecisionNodes: DecisionNode[] = [
  {
    id: '1',
    type: 'condition',
    title: 'Price Above MA(20)',
    description: 'Buy when price crosses above 20-period moving average',
    parameters: { period: 20, offset: 0.5 }
  },
  {
    id: '2',
    type: 'condition',
    title: 'RSI < 30',
    description: 'Oversold condition detected',
    parameters: { threshold: 30, period: 14 }
  },
  {
    id: '3',
    type: 'action',
    title: 'Market Buy',
    description: 'Execute buy order at market price',
    parameters: { quantity: 100, orderType: 'market' }
  },
  {
    id: '4',
    type: 'condition',
    title: 'Stop Loss',
    description: 'Exit position if loss exceeds threshold',
    parameters: { percentage: 2.5 }
  }
];

export const mockBacktestResults: BacktestResults = {
  totalReturn: 24.5,
  winRate: 68.2,
  profitFactor: 1.85,
  maxDrawdown: -8.3,
  sharpeRatio: 1.42,
  totalTrades: 47,
  avgTrade: 1.2,
  equityCurve: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    value: 10000 + (i * 100) + (Math.random() - 0.5) * 500
  })),
  drawdownCurve: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    drawdown: Math.min(0, -Math.random() * 8)
  }))
};