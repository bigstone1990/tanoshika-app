import {
  forwardRef,
  SelectHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

type Option = {
  label: string;
  value: string;
};

export default forwardRef(function SelectBox(
  {
    className = '',
    isFocused = false,
    options = [],
    ...props
  }: SelectHTMLAttributes<HTMLSelectElement> & {
    isFocused?: boolean;
    options: Option[];
  },
  ref,
) {
  const localRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
        localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <select
      {...props}
      className={
        'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
        className
      }
      ref={localRef}
    >
      <option value="">未選択</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});
