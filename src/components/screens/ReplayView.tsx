import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { CandlestickChart } from '../charts/CandlestickChart';
import { generateCandlestickData, mockDecisionNodes } from '../../utils/mockData';
import { Trade } from '../../types/trading';

interface ReplayViewProps {
  selectedTrades: Trade[];
  onNext: () => void;
}

export function ReplayView({ selectedTrades, onNext }: ReplayViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [currentTime, setCurrentTime] = useState([0]);
  const [candlestickData] = useState(() => generateCandlestickData(30));
  
  const maxTime = 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev[0] + speed[0];
          if (newTime >= maxTime) {
            setIsPlaying(false);
            return [maxTime];
          }
          return [newTime];
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const visibleTrades = selectedTrades.filter((_, index) => 
    index < (currentTime[0] / maxTime) * selectedTrades.length
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Trade Replay & Analysis</h2>
          <p className="text-muted-foreground">
            Watch your trades unfold and see AI-detected patterns
          </p>
        </div>
        
        <Button onClick={onNext} className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Generate Strategy</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Price Chart with Trade Markers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 mb-4">
              <CandlestickChart 
                data={candlestickData}
                trades={visibleTrades}
                height={384}
              />
            </div>
            
            {/* Timeline Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentTime([Math.min(maxTime, currentTime[0] + 10)])}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Progress: {Math.round(currentTime[0])}%
                </div>
              </div>
              
              <Slider
                value={currentTime}
                onValueChange={setCurrentTime}
                max={maxTime}
                step={1}
                className="w-full"
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Speed:</span>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={0.5}
                    max={3}
                    step={0.5}
                    className="w-24"
                  />
                  <span className="text-sm font-medium w-8">{speed[0]}x</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inferred Decisions Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Patterns detected from your trades:
            </div>
            
            {mockDecisionNodes.slice(0, 3).map((node, index) => (
              <div 
                key={node.id}
                className={`p-3 rounded-lg border transition-all duration-500 ${
                  currentTime[0] > (index + 1) * 25 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-muted/30'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <Badge variant={currentTime[0] > (index + 1) * 25 ? 'default' : 'secondary'}>
                    {node.type}
                  </Badge>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{node.title}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {node.description}
                    </p>
                    {currentTime[0] > (index + 1) * 25 && (
                      <div className="mt-2 text-xs">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          Detected
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span>Trades Analyzed:</span>
                <span className="font-medium">{visibleTrades.length}/{selectedTrades.length}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Patterns Found:</span>
                <span className="font-medium text-green-400">
                  {Math.floor(currentTime[0] / 25)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trade Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Trade Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {selectedTrades.map((trade, index) => {
              const isVisible = index < (currentTime[0] / maxTime) * selectedTrades.length;
              return (
                <div
                  key={trade.id}
                  className={`flex-shrink-0 p-3 rounded-lg border min-w-[200px] transition-all duration-300 ${
                    isVisible 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-muted/30 opacity-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{trade.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {trade.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant={trade.type === 'buy' ? 'default' : 'destructive'}>
                      {trade.type}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <div>${trade.price.toFixed(2)} × {trade.quantity}</div>
                    {trade.pnl && (
                      <div className={`font-medium ${
                        trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}