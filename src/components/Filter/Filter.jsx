import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import './filter.scss';

const Filter = ({ state, setState }) => {
    const [categories, setCategories] = useState(null);

    const fetchFilterByCategories = useCallback(async () => {
        try {
            const resp = await fetch(
                'https://www.themealdb.com/api/json/v1/1/categories.php'
            );

            if (!resp.ok) {
                throw new Error('Network');
            }
            const data = await resp.json();
            setCategories(data.categories.map((item) => item.strCategory));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchFilterByCategories();
    }, [fetchFilterByCategories]);

    const handleChange = (selectedOption) => {
        setState({
            ...state,
            isClick: false,
            selectedOption: selectedOption,
        });
    };

    const all = { key: 13, label: 'All', value: 'all' };

    return (
        <div className='filter'>
            <div className='filter__wrapper'>
                <button onClick={() => handleChange(all)}>All Meals</button>

                <Select
                    options={categories?.map((cate, i) => ({
                        key: i,
                        label: cate,
                        value: cate.toLowerCase(),
                    }))}
                    value={state.selectedOption}
                    onChange={handleChange}
                    className='filter__select'
                />
            </div>
        </div>
    );
};

Filter.propTypes = {
    state: PropTypes.shape({
        selectedOption: PropTypes.object,
    }).isRequired,
    setState: PropTypes.func.isRequired,
};

export default Filter;
