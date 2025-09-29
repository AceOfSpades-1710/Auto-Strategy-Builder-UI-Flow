import { Screen } from '../types/trading';
import { ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const screens = [
  { id: 'select' as Screen, title: 'Select Trades', number: 1 },
  { id: 'replay' as Screen, title: 'Replay & Analyze', number: 2 },
  { id: 'builder' as Screen, title: 'Build Strategy', number: 3 },
  { id: 'results' as Screen, title: 'Backtest Results', number: 4 },
  { id: 'monitoring' as Screen, title: 'Monitor & Refine', number: 5 }
];

export function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const currentIndex = screens.findIndex(screen => screen.id === currentScreen);

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4">Auto Strategy Builder</h1>
        
        <nav className="flex items-center space-x-2 overflow-x-auto">
          {screens.map((screen, index) => (
            <div key={screen.id} className="flex items-center">
              <button
                onClick={() => onScreenChange(screen.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  index <= currentIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
                disabled={index > currentIndex + 1}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  index < currentIndex 
                    ? 'bg-primary-foreground text-primary'
                    : index === currentIndex
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-muted-foreground text-muted'
                }`}>
                  {screen.number}
                </span>
                <span>{screen.title}</span>
              </button>
              
              {index < screens.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}