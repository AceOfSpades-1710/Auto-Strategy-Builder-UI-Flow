import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { SelectReplayWindow } from './components/screens/SelectReplayWindow';
import { ReplayView } from './components/screens/ReplayView';
import { StrategyBuilder } from './components/screens/StrategyBuilder';
import { BacktestResults } from './components/screens/BacktestResults';
import { MonitoringRefinement } from './components/screens/MonitoringRefinement';
import { Screen, Trade } from './types/trading';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('select');
  const [selectedTrades, setSelectedTrades] = useState<Trade[]>([]);

  const handleNext = () => {
    const screens: Screen[] = ['select', 'replay', 'builder', 'results', 'monitoring'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1]);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'select':
        return (
          <SelectReplayWindow
            onNext={handleNext}
            selectedTrades={selectedTrades}
            setSelectedTrades={setSelectedTrades}
          />
        );
      case 'replay':
        return (
          <ReplayView
            selectedTrades={selectedTrades}
            onNext={handleNext}
          />
        );
      case 'builder':
        return (
          <StrategyBuilder
            onNext={handleNext}
          />
        );
      case 'results':
        return (
          <BacktestResults
            onNext={handleNext}
          />
        );
      case 'monitoring':
        return <MonitoringRefinement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Navigation 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen} 
      />
      <div className="pb-6">
        {renderScreen()}
      </div>
    </div>
  );
}