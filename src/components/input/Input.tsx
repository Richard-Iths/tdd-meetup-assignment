import React from 'react';
import './input.styles.scss';
export interface Props {
  inputName: string;
  inputType: React.InputHTMLAttributes<HTMLInputElement>['type'];
  label?: string;
  placeholder?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  value?: string | number;
}
const Input: React.FC<Props> = ({ inputName, label, inputType, placeholder, onChangeHandler, step, value }) => {
  return (
    <div className="form-input">
      {label && (
        <label className="form-input__label" htmlFor={inputName} data-test={`label-${inputName}`}>
          {label}
        </label>
      )}
      <input
        className="form-input__input"
        type={inputType}
        name={inputName}
        placeholder={placeholder}
        onChange={onChangeHandler}
        data-test={`input-${inputName}`}
        step={step}
        defaultValue={value ? value : ''}
      />
    </div>
  );
};

export default Input;
