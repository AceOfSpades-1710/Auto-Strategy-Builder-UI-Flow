import { useState } from 'react';
import { Calendar, Play, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { mockTrades } from '../../utils/mockData';
import { Trade } from '../../types/trading';

interface SelectReplayWindowProps {
  onNext: () => void;
  selectedTrades: Trade[];
  setSelectedTrades: (trades: Trade[]) => void;
}

export function SelectReplayWindow({ onNext, selectedTrades, setSelectedTrades }: SelectReplayWindowProps) {
  const [startDate, setStartDate] = useState('2024-01-15');
  const [endDate, setEndDate] = useState('2024-01-17');

  const handleTradeToggle = (tradeId: string, checked: boolean) => {
    const updatedTrades = mockTrades.map(trade =>
      trade.id === tradeId ? { ...trade, selected: checked } : trade
    );
    setSelectedTrades(updatedTrades.filter(trade => trade.selected));
  };

  const selectedCount = mockTrades.filter(trade => trade.selected).length;
  const totalPnL = mockTrades
    .filter(trade => trade.selected && trade.pnl)
    .reduce((sum, trade) => sum + (trade.pnl || 0), 0);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Select Trading History</h2>
          <p className="text-muted-foreground">
            Choose the trades you want to analyze and convert into an automated strategy
          </p>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Select profitable trades that represent your best trading decisions.
                The AI will analyze patterns to create your automated strategy.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Date Range Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Date Range</span>
            </CardTitle>
            <CardDescription>
              Select the time period for trade analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Trade Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
            <CardDescription>
              Select trades to include in strategy analysis ({selectedCount} selected)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center space-x-4 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    checked={trade.selected}
                    onCheckedChange={(checked) => 
                      handleTradeToggle(trade.id, checked as boolean)
                    }
                  />
                  
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="font-medium">{trade.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {trade.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <span className={`px-2 py-1 rounded text-sm ${
                        trade.type === 'buy' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trade.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div>${trade.price.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {trade.quantity} shares
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {trade.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    
                    <div className={`text-right font-medium ${
                      (trade.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.pnl ? 
                        `$${trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}` 
                        : 'Pending'
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedCount > 0 && (
              <div className="mt-4 p-4 bg-accent/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Selected Trades Summary:</span>
                  <div className="text-right">
                    <div>{selectedCount} trades</div>
                    <div className={`font-medium ${
                      totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      Total P&L: ${totalPnL > 0 ? '+' : ''}${totalPnL.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={selectedCount === 0}
          className="flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Start Replay ({selectedCount} trades)</span>
        </Button>
      </div>
    </div>
  );
}