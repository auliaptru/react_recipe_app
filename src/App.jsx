import React, { useEffect, useState } from 'react';
import Filter from './components/Filter/Filter';

import Galleries from './components/Galleries/Galleries';
import './App.css';

const App = () => {
    const [state, setState] = useState({
        data: [],
        selectedOption: {},
        mealId: '',
        loading: false,
        isClick: false,
        error: false,
    });

    // fetch data for all meals
    const fetchAllMeals = async () => {
        try {
            const resp = await fetch(
                'https://www.themealdb.com/api/json/v1/1/search.php?s='
            );

            if (!resp.ok) {
                throw new Error('Network');
            }
            const data = await resp.json();
            setState({
                ...state,
                data: data.meals,
                loading: false,
                error: false,
            });
        } catch (error) {
            console.log(error);
            setState({
                ...state,
                error: true,
                loading: false,
            });
        }
    };

    // fatch data for meals by categories
    const fetchMealsByCates = async () => {
        try {
            const resp = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedOption.label}`
            );

            if (!resp.ok) {
                throw new Error('Network');
            }
            const data = await resp.json();
            setState({
                ...state,
                data: data.meals,
                loading: false,
                error: false,
            });
        } catch (error) {
            console.log(error);
            setState({
                ...state,
                error: true,
                loading: false,
            });
        }
    };

    useEffect(() => {
        if (state.selectedOption) {
            setState({ ...state, loading: true });
            if (state.selectedOption.value === 'all') {
                fetchAllMeals();
            } else {
                fetchMealsByCates(state.selectedOption.label);
            }
        }
    }, [state.selectedOption]);

    const openRecipe = (id) => {
        setState({
            ...state,
            isClick: true,
            mealId: id,
        });
    };

    const closeRecipe = () => {
        setState({
            ...state,
            isClick: false,
        });
    };

    const { data, selectedOption, error } = state;

    return (
        <div className='app'>
            <h1>Recipe App</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, ut!
            </p>

            <div className='app__wrapper'>
                <Filter state={state} setState={setState} />
                <Galleries
                    fetchMeals={data}
                    openRecipe={openRecipe}
                    closeRecipe={closeRecipe}
                    state={state}
                />
            </div>
            {error && (
                <div className='error__message'>
                    <h2>Network Error</h2>
                    <p>Please check your internet connection and try again.</p>
                </div>
            )}
        </div>
    );
};

export default App;
