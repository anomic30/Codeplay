import React from 'react'
import Select from "react-select";
import { languageOptions } from '../../utils/languages';
import { customStyles } from '../../utils/dropdownStyles';

const LanguageDropdown = ({handleLanguageChange}) => {
    return (
        <Select
            placeholder="Select a language"
            options={languageOptions}
            defaultValue={languageOptions[0]}
            styles={customStyles}
            onChange={(selectedOption) => handleLanguageChange(selectedOption)}
        />
    )
}

export default LanguageDropdown