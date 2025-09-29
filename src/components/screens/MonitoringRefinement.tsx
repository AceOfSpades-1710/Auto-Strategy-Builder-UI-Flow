import { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart } from 'recharts';
import { AlertTriangle, CheckCircle, History, RefreshCw, Settings, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

export function MonitoringRefinement() {
  const [selectedVersion, setSelectedVersion] = useState('v1.2');

  const performanceData = Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expected: 100 + i * 2 + Math.random() * 5,
    actual: 100 + i * 1.8 + (Math.random() - 0.5) * 8,
    trades: Math.floor(Math.random() * 10) + 5
  }));

  const versions = [
    {
      id: 'v1.2',
      name: 'Current Active',
      date: '2024-01-20',
      performance: '+12.4%',
      status: 'active',
      winRate: 72.5,
      description: 'Optimized stop-loss parameters'
    },
    {
      id: 'v1.1',
      name: 'Previous Version',
      date: '2024-01-15',
      performance: '+8.7%',
      status: 'archived',
      winRate: 65.2,
      description: 'Initial automated strategy'
    },
    {
      id: 'v1.0',
      name: 'Original Manual',
      date: '2024-01-10',
      performance: '+6.2%',
      status: 'archived',
      winRate: 58.8,
      description: 'Replicated manual trades'
    }
  ];

  const suggestions = [
    {
      id: 1,
      type: 'warning',
      title: 'RSI Threshold Adjustment',
      description: 'Your manual overrides frequently ignore RSI signals below 25. Consider lowering the threshold from 30 to 25.',
      impact: 'Could improve entry timing by 15%',
      confidence: 85
    },
    {
      id: 2,
      type: 'info',
      title: 'Position Sizing Drift',
      description: 'Recent trades show larger position sizes during high volatility periods.',
      impact: 'Risk per trade increased by 0.3%',
      confidence: 92
    },
    {
      id: 3,
      type: 'success',
      title: 'Stop Loss Effectiveness',
      description: 'Your trailing stop adjustments are working well - no changes needed.',
      impact: 'Risk management optimal',
      confidence: 78
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Strategy Monitoring & Refinement</h2>
          <p className="text-muted-foreground">
            Track performance and refine your automated strategy
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Strategy Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Live Performance</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="versions">Version History</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Performance Comparison Chart */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Expected vs Actual Performance</CardTitle>
                <CardDescription>
                  Real-time comparison of strategy performance against expectations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `${value.toFixed(0)}%`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expected" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Expected"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="hsl(var(--chart-2))" 
                        strokeWidth={3}
                        name="Actual"
                      />
                      <Bar 
                        dataKey="trades" 
                        fill="hsl(var(--chart-3))"
                        opacity={0.3}
                        yAxisId="right"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Live Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Strategy Health</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Prediction Accuracy</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Risk Alignment</span>
                      <span className="text-yellow-400">Good</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Today's P&L</span>
                    <span className="font-medium text-green-400">+$247.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Trades Today</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Win Rate (7d)</span>
                    <span className="font-medium">74.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Trade</span>
                    <span className="font-medium">+1.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Trades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Strategy Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { symbol: 'AAPL', type: 'SELL', price: 152.45, time: '14:23', pnl: 24.50 },
                  { symbol: 'NVDA', type: 'BUY', price: 545.20, time: '13:45', pnl: null },
                  { symbol: 'TSLA', type: 'SELL', price: 243.10, time: '12:15', pnl: -12.30 },
                  { symbol: 'MSFT', type: 'BUY', price: 378.90, time: '11:30', pnl: null }
                ].map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-4">
                      <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                        {trade.type}
                      </Badge>
                      <div>
                        <div className="font-medium">{trade.symbol}</div>
                        <div className="text-sm text-muted-foreground">{trade.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>${trade.price}</div>
                      {trade.pnl && (
                        <div className={`text-sm ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {trade.pnl > 0 ? '+' : ''}${trade.pnl}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions">
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <Alert key={suggestion.id} className="p-6">
                <div className="flex items-start space-x-4">
                  {suggestion.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />}
                  {suggestion.type === 'info' && <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />}
                  {suggestion.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <Badge variant="outline">
                        {suggestion.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <AlertDescription className="text-sm mb-3">
                      {suggestion.description}
                    </AlertDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <strong>Impact:</strong> {suggestion.impact}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Dismiss
                        </Button>
                        <Button size="sm">
                          Apply Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="versions">
          <div className="space-y-4">
            {versions.map((version) => (
              <Card 
                key={version.id}
                className={`cursor-pointer transition-all ${
                  selectedVersion === version.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedVersion(version.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        version.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                      }`} />
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{version.name}</h4>
                          {version.status === 'active' && (
                            <Badge variant="default">Active</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {version.description}
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Deployed: {version.date}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-medium ${
                        version.performance.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {version.performance}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {version.winRate}% win rate
                      </div>
                    </div>
                  </div>
                  
                  {selectedVersion === version.id && version.status !== 'active' && (
                    <div className="mt-4 pt-4 border-t border-border flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <History className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">
                        Rollback to This Version
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}