/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { options, GEO_API_URL } from './../api';


const search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null)
    const handleInputChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1&namePrefix=${inputValue}`, options)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}`
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }
    return (
        <AsyncPaginate
            placeholder="Search for a city..."
            debounceTimeout={600}
            value={search}
            onChange={handleInputChange}
            loadOptions={loadOptions}
        />
    )
}

export default search