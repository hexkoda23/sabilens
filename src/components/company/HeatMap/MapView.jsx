import React from 'react';
import Card from '../../common/Card';
import Icon from '../../common/Icon';

const MapView = () => {
  // Simplified map representation (in production, use react-leaflet)
  return (
    <Card className="h-[600px] relative">
      <div className="absolute top-4 right-4 z-10 bg-white rounded-xl shadow-soft p-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Mock Map */}
      <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="relative w-3/4 h-3/4">
          {/* Nigeria Map Outline */}
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path
              d="M200,50 L300,150 L350,250 L300,350 L200,380 L100,350 L50,250 L100,150 L200,50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            
            {/* Lagos */}
            <circle cx="120" cy="280" r="15" className="fill-danger/20 stroke-danger" strokeWidth="2" />
            <circle cx="120" cy="280" r="8" className="fill-danger" />
            <text x="100" y="260" className="text-xs fill-gray-700">Lagos</text>
            
            {/* Kano */}
            <circle cx="280" cy="120" r="12" className="fill-warning/20 stroke-warning" strokeWidth="2" />
            <circle cx="280" cy="120" r="6" className="fill-warning" />
            <text x="260" y="100" className="text-xs fill-gray-700">Kano</text>
            
            {/* Abuja */}
            <circle cx="200" cy="200" r="10" className="fill-primary/20 stroke-primary" strokeWidth="2" />
            <circle cx="200" cy="200" r="5" className="fill-primary" />
            <text x="180" y="180" className="text-xs fill-gray-700">Abuja</text>
            
            {/* Port Harcourt */}
            <circle cx="150" cy="320" r="8" className="fill-success/20 stroke-success" strokeWidth="2" />
            <circle cx="150" cy="320" r="4" className="fill-success" />
            <text x="130" y="300" className="text-xs fill-gray-700">P.Harcourt</text>
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default MapView;