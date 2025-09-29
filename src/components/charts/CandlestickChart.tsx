import { ComposedChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, Line } from 'recharts';
import { CandlestickData, Trade } from '../../types/trading';

interface CandlestickChartProps {
  data: CandlestickData[];
  trades: Trade[];
  height?: number;
}

export function CandlestickChart({ data, trades, height = 400 }: CandlestickChartProps) {
  // Transform data for recharts
  const chartData = data.map((candle, index) => {
    const tradeAtTime = trades.find(trade => 
      Math.abs(trade.timestamp.getTime() - candle.timestamp.getTime()) < 24 * 60 * 60 * 1000
    );
    
    return {
      ...candle,
      date: candle.timestamp.toLocaleDateString(),
      time: candle.timestamp.getTime(),
      candleBody: candle.close - candle.open,
      candleTop: candle.high - Math.max(candle.open, candle.close),
      candleBottom: Math.min(candle.open, candle.close) - candle.low,
      trade: tradeAtTime,
      // Moving average (simple 20-period)
      ma20: index >= 19 ? 
        data.slice(index - 19, index + 1).reduce((sum, d) => sum + d.close, 0) / 20 
        : null
    };
  });

  const CustomCandlestick = (props: any) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const { open, close, high, low, trade } = payload;
    const isGreen = close > open;
    const color = isGreen ? '#22c55e' : '#ef4444';
    
    const bodyHeight = Math.abs(close - open) * height / (high - low);
    const bodyY = y + (high - Math.max(open, close)) * height / (high - low);
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={y}
          x2={x + width / 2}
          y2={y + height}
          stroke={color}
          strokeWidth={1}
        />
        
        {/* Body */}
        <rect
          x={x + width * 0.2}
          y={bodyY}
          width={width * 0.6}
          height={bodyHeight}
          fill={isGreen ? color : 'transparent'}
          stroke={color}
          strokeWidth={1}
        />
        
        {/* Trade marker */}
        {trade && (
          <circle
            cx={x + width / 2}
            cy={trade.type === 'buy' ? y + height + 10 : y - 10}
            r={4}
            fill={trade.type === 'buy' ? '#22c55e' : '#ef4444'}
            stroke="#ffffff"
            strokeWidth={2}
          />
        )}
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="date" 
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          domain={['dataMin - 2', 'dataMax + 2']}
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
        />
        
        {/* Moving Average */}
        <Line
          type="monotone"
          dataKey="ma20"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        
        {/* Candlesticks would be custom rendered here */}
        <Bar dataKey="close" shape={<CustomCandlestick />} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}