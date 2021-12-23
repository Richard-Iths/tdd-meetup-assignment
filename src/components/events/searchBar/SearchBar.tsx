import React from 'react';
import Input, { Props as IInput } from '../../input/Input';
import './searchBar.styles.scss';

export interface Props {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchBar: React.FC<Props> = ({ onChangeHandler, placeholder }) => {
  const input: IInput = {
    inputName: 'searchBar',
    inputType: 'search',
    onChangeHandler,
    placeholder,
  };

  return (
    <article className="search-bar" data-test="search-bar">
      <div className="search-bar__icon">
        <i className="ri-search-2-fill icon"></i>
      </div>
      <Input {...input} />
    </article>
  );
};

export default SearchBar;
