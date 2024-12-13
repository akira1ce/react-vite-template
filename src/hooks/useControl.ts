import { useEffect, useState } from 'react';

/**
 * 属性受控
 * @param _value 受控Val
 * @param _onChange 受控Val改变
 * @returns
 */
function useControl<T>(_value: T, _onChange: (val: T) => void) {
  const [value, setValue] = useState<T>(_value);

  const onChange = (val: T) => {
    if (_value !== undefined) {
      _onChange(val);
      return;
    }
    setValue(val);
  };

  useEffect(() => {
    setValue(_value);
  }, [_value]);

  return { value, onChange };
}

export default useControl;
