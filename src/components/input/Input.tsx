import React from 'react';
export interface Props {
  inputName: string;
  inputType: React.InputHTMLAttributes<HTMLInputElement>['type'];
  label?: string;
  placeholder?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<Props> = ({ inputName, label, inputType, placeholder, onChangeHandler }) => {
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
      />
    </div>
  );
};

export default Input;
