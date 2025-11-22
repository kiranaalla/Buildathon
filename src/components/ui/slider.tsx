import React from 'react';


interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number[]) => void;
  onChange?: (value: number) => void;
  label?: string;
  className?: string;
}


const Slider: React.FC<SliderProps> = ({ min = 0, max = 100, step = 1, value, defaultValue, onValueChange, onChange, label, className }) => {
  // Support for single value or range (array)
  const isRange = Array.isArray(value || defaultValue);
  const [internalValue, setInternalValue] = React.useState<number[]>(
    (value && Array.isArray(value)) ? value as number[] :
    (defaultValue && Array.isArray(defaultValue)) ? defaultValue as number[] :
    typeof value === 'number' ? [value] :
    typeof defaultValue === 'number' ? [defaultValue] : [min]
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const handleChange = (idx: number, val: number) => {
    const newValue = [...internalValue];
    newValue[idx] = val;
    setInternalValue(newValue);
    onValueChange?.(newValue);
    if (onChange) onChange(val);
  };

  return (
    <div className={`slider-component ${className || ""}`}>
      {label && <label className="slider-label">{label}</label>}
      {isRange ? (
        <div className="flex gap-2 items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue[0]}
            onChange={e => handleChange(0, Number(e.target.value))}
            className="slider-input"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue[1]}
            onChange={e => handleChange(1, Number(e.target.value))}
            className="slider-input"
          />
          <span className="slider-value">{internalValue[0]} - {internalValue[1]}</span>
        </div>
      ) : (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue[0]}
            onChange={e => handleChange(0, Number(e.target.value))}
            className="slider-input"
          />
          <span className="slider-value">{internalValue[0]}</span>
        </>
      )}
    </div>
  );
};

export default Slider;
