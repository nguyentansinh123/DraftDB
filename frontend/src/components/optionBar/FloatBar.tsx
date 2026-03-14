import {
  Database,
  Table,
  View,
  Pencil,
  Save,
  Plus,
  Trash2,
  GitBranch,
  Share2,
  Settings,
  Undo2,
  Redo2,
  Copy,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const icons = [
  Database,
  Table,
  View,
  Pencil,
  Save,
  Plus,
  Trash2,
  GitBranch,
  Share2,
  Settings,
  Undo2,
  Redo2,
  Copy,
];

const FloatBar = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed top-28 z-50 left-1/2 -translate-x-1/2">
      <div
        className={`w-auto h-[44px] flex justify-evenly items-center gap-4 px-4 rounded-[10px] ${
          theme === "dark"
            ? "bg-[#22242b] text-neutral-400"
            : "bg-neutral-200 text-neutral-600"
        }`}
      >
        {icons.map((Icon, index) => (
          <div key={index} className="flex items-center gap-4">
            <button
              className={`cursor-pointer transition-colors ${
                theme === "dark" ? "hover:text-zinc-200" : "hover:text-black"
              }`}
            >
              <Icon size={20} />
            </button>
            {index < icons.length - 1 && (
              <div
                className={`w-[1px] h-6 ${
                  theme === "dark" ? "bg-gray-600" : "bg-neutral-400"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatBar;
