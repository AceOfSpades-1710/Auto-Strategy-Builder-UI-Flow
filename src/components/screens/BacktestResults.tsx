import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Activity, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { mockBacktestResults } from '../../utils/mockData';

interface BacktestResultsProps {
  onNext: () => void;
}

export function BacktestResults({ onNext }: BacktestResultsProps) {
  const results = mockBacktestResults;

  const monthlyReturns = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString('en', { month: 'short' }),
    return: (Math.random() - 0.5) * 10
  }));

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Backtest Results</h2>
          <p className="text-muted-foreground">
            Your strategy performance over historical data
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Paper Trade
          </Button>
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            Refine Strategy
          </Button>
          <Button onClick={onNext}>
            <Rocket className="w-4 h-4 mr-2" />
            Deploy Live
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {results.totalReturn > 0 ? '+' : ''}{results.totalReturn}%
                </div>
                <div className="text-sm text-muted-foreground">Total Return</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-2xl font-bold">{results.winRate}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold">{results.profitFactor}</div>
                <div className="text-sm text-muted-foreground">Profit Factor</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {results.maxDrawdown}%
                </div>
                <div className="text-sm text-muted-foreground">Max Drawdown</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Curve */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
            <CardDescription>
              Portfolio value over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.equityCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Sharpe Ratio</span>
                <span className="font-medium">{results.sharpeRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Trades</span>
                <span className="font-medium">{results.totalTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Trade</span>
                <span className="font-medium">{results.avgTrade}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Best Trade</span>
                <span className="font-medium text-green-400">+8.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Worst Trade</span>
                <span className="font-medium text-red-400">-4.2%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Win Rate</span>
                    <span>{results.winRate}%</span>
                  </div>
                  <Progress value={results.winRate} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Risk-Adjusted Return</span>
                    <span>Excellent</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drawdown Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Drawdown Analysis</CardTitle>
            <CardDescription>
              Portfolio drawdowns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.drawdownCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="drawdown" 
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Returns */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Bar 
                    dataKey="return" 
                    fill={(entry: any) => entry.return >= 0 ? 'hsl(var(--chart-1))' : 'hsl(var(--destructive))'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Strategy Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="mb-3">Strategy Strengths</h4>
              <div className="space-y-2">
                <Badge variant="default" className="w-full justify-start">
                  High Win Rate (68.2%)
                </Badge>
                <Badge variant="default" className="w-full justify-start">
                  Strong Risk Management
                </Badge>
                <Badge variant="default" className="w-full justify-start">
                  Consistent Returns
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="mb-3">Risk Factors</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-start">
                  Market Volatility Sensitivity
                </Badge>
                <Badge variant="outline" className="w-full justify-start">
                  Single Asset Focus
                </Badge>
                <Badge variant="outline" className="w-full justify-start">
                  Limited Backtesting Period
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="mb-3">Recommendations</h4>
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-start">
                  Start with Paper Trading
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  Monitor Performance Daily
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  Consider Position Sizing
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}