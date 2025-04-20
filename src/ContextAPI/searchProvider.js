import React, { useState } from 'react';

const SearchProvider = ({ childrens }) => {

    const [searchterm, setSearchterm] = useState('sport game');

    return (
        <SearchProvider.provider value={{ searchterm, setSearchterm }}>
            {childrens}
        </SearchProvider.provider>
    )
}

export default SearchProvider;