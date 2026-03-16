import type { DisplayField } from "../../utils/core/CoreVisualizer.utils";

const ToolTips = ({ field }: { field: DisplayField }) => {
  return (
    <div
      className="pointer-events-none absolute left-[calc(100%+15px)] top-1/2 -translate-y-1/2 
                z-[9999] w-56 rounded-xl bg-zinc-950/98 backdrop-blur-md 
                border border-zinc-700/50 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
                opacity-0 group-hover:opacity-100 transition-all duration-300 
                scale-90 group-hover:scale-100 origin-left ease-out"
    >
      <div className="absolute -left-5 top-0 h-full w-5 bg-transparent" />

      <div
        className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 
                  bg-zinc-950 border-l border-b border-zinc-700/50 
                  rotate-45 rounded-sm"
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Field Metadata
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-500 font-medium">NULLABLE</p>
            <p
              className={`text-xs font-mono ${field.isNullable ? "text-emerald-400" : "text-rose-500"}`}
            >
              {field.isNullable ? "YES" : "NO"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-500 font-medium">UNIQUE</p>
            <p
              className={`text-xs font-mono ${field.isUnique ? "text-blue-400" : "text-zinc-400"}`}
            >
              {field.isUnique ? "TRUE" : "FALSE"}
            </p>
          </div>
        </div>

        {/* Description / Notes */}
        {field.description && (
          <div className="mt-4 pt-3 border-t border-zinc-800/50">
            <p className="text-[10px] text-zinc-500 font-medium mb-1">
              DESCRIPTION
            </p>
            <p className="text-[11px] text-zinc-300 leading-relaxed italic">
              {field.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolTips;
