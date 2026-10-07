import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Compass, Maximize2, Info } from 'lucide-react';

export default function FloorPlanCanvas({ floorPlan, facingDirection = 'East' }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!floorPlan || !floorPlan.rooms) {
    return (
      <div className="h-96 flex items-center justify-center bg-slate-100 rounded-2xl text-slate-500">
        No floor plan layout available.
      </div>
    );
  }

  const { plotDimensions, rooms, legend } = floorPlan;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.7, prev - 0.1));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setSelectedRoom(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
      {/* Top Controls Toolbar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-brand-700 rounded-lg">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">
              Interactive 2D Architectural Layout
            </h4>
            <p className="text-xs text-slate-500">
              Plot: {plotDimensions?.length || 40}' × {plotDimensions?.width || 30}' | Facing: <span className="font-medium text-brand-600">{facingDirection}</span>
            </p>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded-xl shadow-xs">
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-md transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-medium text-slate-600 px-1">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-md transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset View"
            className="p-1 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-md transition ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative p-4 sm:p-6 bg-slate-900/5 flex items-center justify-center min-h-[460px] overflow-hidden">
        {/* Facing Indicator Overlay */}
        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          North ↑ | Entrance: {facingDirection}
        </div>

        <div
          className="transition-transform duration-200 ease-out w-full max-w-2xl"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 100 105"
            className="w-full h-auto drop-shadow-md select-none rounded-xl"
            style={{ backgroundColor: '#F8FAFC' }}
          >
            {/* Outer boundary wall */}
            <rect
              x="2"
              y="2"
              width="96"
              height="100"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.2"
              rx="2"
            />

            {/* Dimension Lines */}
            <line x1="2" y1="0.8" x2="98" y2="0.8" stroke="#64748B" strokeWidth="0.5" strokeDasharray="1 1" />
            <text x="50" y="1.8" textAnchor="middle" fontSize="2.2" fill="#475569" fontWeight="600">
              Width: {plotDimensions?.width || 30} FT
            </text>

            <line x1="0.8" y1="2" x2="0.8" y2="102" stroke="#64748B" strokeWidth="0.5" strokeDasharray="1 1" />
            <text x="1.8" y="52" textAnchor="middle" fontSize="2.2" fill="#475569" fontWeight="600" transform="rotate(-90 1.8 52)">
              Length: {plotDimensions?.length || 40} FT
            </text>

            {/* Room Boxes */}
            {rooms.map((room) => {
              const isSelected = selectedRoom?.id === room.id;
              return (
                <g
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className="cursor-pointer transition-all"
                >
                  {/* Room base */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    fill={room.color}
                    fillOpacity={isSelected ? 0.95 : 0.45}
                    stroke={isSelected ? '#1D4ED8' : '#334155'}
                    strokeWidth={isSelected ? '1' : '0.6'}
                    strokeDasharray={room.type === 'Garden' ? '1 0.5' : undefined}
                    rx="0.8"
                  />

                  {/* Room Name & Dimensions */}
                  <text
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2 - 1.2}
                    textAnchor="middle"
                    fontSize="2.4"
                    fontWeight="700"
                    fill="#0F172A"
                    className="pointer-events-none"
                  >
                    {room.name}
                  </text>

                  <text
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2 + 2.2}
                    textAnchor="middle"
                    fontSize="1.8"
                    fontWeight="500"
                    fill="#475569"
                    className="pointer-events-none"
                  >
                    {Math.round(room.w * (plotDimensions?.width || 30) / 100)}' × {Math.round(room.h * (plotDimensions?.length || 40) / 100)}'
                  </text>

                  {/* Vastu zone tag */}
                  {room.vastu_zone && (
                    <text
                      x={room.x + room.w / 2}
                      y={room.y + room.h - 1.5}
                      textAnchor="middle"
                      fontSize="1.5"
                      fill="#2563EB"
                      fontWeight="600"
                      className="pointer-events-none"
                    >
                      {room.vastu_zone}
                    </text>
                  )}

                  {/* Door representation arcs/markers */}
                  {room.doors && room.doors.map((door, dIdx) => {
                    let dx = room.x;
                    let dy = room.y;
                    if (door.wall === 'bottom') {
                      dx = room.x + room.w * door.pos;
                      dy = room.y + room.h;
                    } else if (door.wall === 'top') {
                      dx = room.x + room.w * door.pos;
                      dy = room.y;
                    } else if (door.wall === 'left') {
                      dx = room.x;
                      dy = room.y + room.h * door.pos;
                    } else if (door.wall === 'right') {
                      dx = room.x + room.w;
                      dy = room.y + room.h * door.pos;
                    }

                    return (
                      <g key={dIdx}>
                        <circle cx={dx} cy={dy} r="0.9" fill="#2563EB" />
                        <path
                          d={`M ${dx - 1.2} ${dy} A 1.2 1.2 0 0 1 ${dx + 1.2} ${dy}`}
                          stroke="#2563EB"
                          strokeWidth="0.4"
                          fill="none"
                        />
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Room Details Bar */}
      {selectedRoom && (
        <div className="p-4 bg-brand-50/70 border-t border-brand-200/60 flex items-center justify-between text-xs sm:text-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: selectedRoom.color }}></div>
            <div>
              <span className="font-bold text-slate-900">{selectedRoom.name}</span>
              <span className="text-slate-500 mx-2">|</span>
              <span className="text-slate-600">Type: <strong>{selectedRoom.type}</strong></span>
              {selectedRoom.vastu_zone && (
                <>
                  <span className="text-slate-500 mx-2">|</span>
                  <span className="text-brand-700 font-medium">Vastu Zone: {selectedRoom.vastu_zone}</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => setSelectedRoom(null)}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium"
          >
            Deselect
          </button>
        </div>
      )}

      {/* Legend & Help Footer */}
      <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-slate-700">Legend:</span>
          {legend && legend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm border border-slate-300"
                style={{ backgroundColor: item.color }}
              ></span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Info className="w-3.5 h-3.5" />
          <span>Click any room to inspect dimensions and Vastu orientation</span>
        </div>
      </div>
    </div>
  );
}
