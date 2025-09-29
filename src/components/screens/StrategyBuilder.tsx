import { useState } from 'react';
import { Plus, Settings, Play, Save, Eye, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { mockDecisionNodes } from '../../utils/mockData';
import { DecisionNode, StrategyParameters } from '../../types/trading';

interface StrategyBuilderProps {
  onNext: () => void;
}

export function StrategyBuilder({ onNext }: StrategyBuilderProps) {
  const [nodes, setNodes] = useState<DecisionNode[]>(mockDecisionNodes);
  const [selectedNode, setSelectedNode] = useState<DecisionNode | null>(nodes[0]);
  const [parameters, setParameters] = useState<StrategyParameters>({
    stopLoss: 2.5,
    takeProfit: 5.0,
    trailingStop: true,
    riskPerTrade: 1.0,
    maxDrawdown: 10.0
  });

  const addNode = (type: 'condition' | 'action') => {
    const newNode: DecisionNode = {
      id: Date.now().toString(),
      type,
      title: type === 'condition' ? 'New Condition' : 'New Action',
      description: 'Configure this node',
      parameters: {}
    };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Strategy Logic Builder</h2>
          <p className="text-muted-foreground">
            Design your automated trading strategy using visual blocks
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Simulate
          </Button>
          <Button onClick={onNext}>
            <Play className="w-4 h-4 mr-2" />
            Backtest Strategy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logic Flow Diagram */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Strategy Flow</span>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => addNode('condition')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Condition
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => addNode('action')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Action
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Drag and connect blocks to build your trading logic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 min-h-[400px]">
              {/* Entry Conditions */}
              <div className="space-y-3">
                <h4 className="flex items-center space-x-2">
                  <span>Entry Conditions</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Conditions that must be met to enter a trade</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h4>
                
                {nodes.filter(node => node.type === 'condition').map((node, index) => (
                  <div
                    key={node.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedNode?.id === node.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-accent-foreground hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{node.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {node.description}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Condition</Badge>
                    </div>
                    
                    {index < nodes.filter(n => n.type === 'condition').length - 1 && (
                      <div className="flex justify-center mt-3">
                        <div className="w-px h-6 bg-border"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                  ↓
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h4>Entry Actions</h4>
                
                {nodes.filter(node => node.type === 'action').map((node, index) => (
                  <div
                    key={node.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedNode?.id === node.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-accent-foreground hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{node.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {node.description}
                          </div>
                        </div>
                      </div>
                      <Badge variant="default">Action</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parameters Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Strategy Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Management */}
            <div className="space-y-4">
              <h4>Risk Management</h4>
              
              <div className="space-y-2">
                <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                <div className="flex items-center space-x-3">
                  <Slider
                    value={[parameters.stopLoss]}
                    onValueChange={(value) => 
                      setParameters({...parameters, stopLoss: value[0]})
                    }
                    max={10}
                    min={0.5}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="w-12 text-sm">{parameters.stopLoss}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="take-profit">Take Profit (%)</Label>
                <div className="flex items-center space-x-3">
                  <Slider
                    value={[parameters.takeProfit]}
                    onValueChange={(value) => 
                      setParameters({...parameters, takeProfit: value[0]})
                    }
                    max={20}
                    min={1}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="w-12 text-sm">{parameters.takeProfit}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="trailing-stop">Trailing Stop</Label>
                <Switch
                  checked={parameters.trailingStop}
                  onCheckedChange={(checked) => 
                    setParameters({...parameters, trailingStop: checked})
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="risk-per-trade">Risk per Trade (%)</Label>
                <div className="flex items-center space-x-3">
                  <Slider
                    value={[parameters.riskPerTrade]}
                    onValueChange={(value) => 
                      setParameters({...parameters, riskPerTrade: value[0]})
                    }
                    max={5}
                    min={0.1}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="w-12 text-sm">{parameters.riskPerTrade}%</span>
                </div>
              </div>
            </div>

            {/* Selected Node Parameters */}
            {selectedNode && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h4>Node Settings: {selectedNode.title}</h4>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="node-title">Title</Label>
                    <Input
                      id="node-title"
                      value={selectedNode.title}
                      onChange={(e) => {
                        const updatedNodes = nodes.map(node =>
                          node.id === selectedNode.id 
                            ? {...node, title: e.target.value}
                            : node
                        );
                        setNodes(updatedNodes);
                        setSelectedNode({...selectedNode, title: e.target.value});
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="node-description">Description</Label>
                    <Input
                      id="node-description"
                      value={selectedNode.description}
                      onChange={(e) => {
                        const updatedNodes = nodes.map(node =>
                          node.id === selectedNode.id 
                            ? {...node, description: e.target.value}
                            : node
                        );
                        setNodes(updatedNodes);
                        setSelectedNode({...selectedNode, description: e.target.value});
                      }}
                    />
                  </div>

                  {selectedNode.type === 'condition' && (
                    <>
                      <div>
                        <Label>Threshold</Label>
                        <Input
                          type="number"
                          placeholder="Enter threshold value"
                          defaultValue={selectedNode.parameters?.threshold || ''}
                        />
                      </div>
                      <div>
                        <Label>Period</Label>
                        <Input
                          type="number"
                          placeholder="Enter period (e.g., 14)"
                          defaultValue={selectedNode.parameters?.period || ''}
                        />
                      </div>
                    </>
                  )}
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteNode(selectedNode.id)}
                  className="w-full"
                >
                  Delete Node
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}