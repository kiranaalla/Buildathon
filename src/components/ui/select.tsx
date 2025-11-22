import { useState, useRef, useEffect, ReactNode, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react";

interface SelectContextType {
  value?: string;
  selectedLabel?: string;
  onValueChange?: (value: string) => void;
  setSelectedLabel?: (label: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

interface SelectProps {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Select({ children, value, onValueChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <SelectContext.Provider value={{ value, selectedLabel, onValueChange, setSelectedLabel, open, setOpen }}>
      <div ref={selectRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}

export function SelectTrigger({ children, className = "" }: SelectTriggerProps) {
  const context = useContext(SelectContext);
  if (!context) return null;

  const { open, setOpen } = context;

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between ${className}`}
    >
      <span>{children}</span>
      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

interface SelectContentProps {
  children: ReactNode;
}

export function SelectContent({ children }: SelectContentProps) {
  const context = useContext(SelectContext);
  if (!context) return null;

  const { open } = context;

  if (!open) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
      {children}
    </div>
  );
}

interface SelectItemProps {
  children: ReactNode;
  value: string;
}

export function SelectItem({ children, value }: SelectItemProps) {
  const context = useContext(SelectContext);
  if (!context) return null;

  const { onValueChange, setSelectedLabel, setOpen } = context;

  const handleSelect = () => {
    onValueChange?.(value);
    setSelectedLabel?.(typeof children === 'string' ? children : String(children));
    setOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
    >
      {children}
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
  children?: ReactNode;
}

export function SelectValue({ placeholder, children }: SelectValueProps) {
  const context = useContext(SelectContext);
  const displayValue = context?.selectedLabel || (context?.value ? children : null);

  return <span className={displayValue ? "" : "text-gray-500"}>{displayValue || placeholder}</span>;
}
