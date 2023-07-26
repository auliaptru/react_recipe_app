import React from 'react';
import PropTypes from 'prop-types';

import Recipe from '../Recipe/Recipe';
import './galleries.scss';

const Galleries = ({ fetchMeals, openRecipe, closeRecipe, state }) => {
    const { loading, isClick } = state;
    
    return (
        <div className='galleries'>
            {loading ? (
                <img
                    src='https://media1.giphy.com/media/Cuk3J8bROj6CldKabD/giphy.gif?cid=ecf05e47wkntxazuio20rit3rs1t7az1j2dy4zlrv5lj51k9&ep=v1_stickers_search&rid=giphy.gif&ct=s'
                    alt=''
                />
            ) : !isClick ? (
                <div className='galleries__meals'>
                    {fetchMeals?.map((item) => (
                        <div
                            className='gallery'
                            key={item.idMeal}
                            onClick={() => openRecipe(item.idMeal)}
                        >
                            <img src={item.strMealThumb} alt={item.strMeal} />
                            <div className='gallery__wrapper'>
                                <h3>{item.strMeal}</h3>
                                <p>See the recipe</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <Recipe closeRecipe={closeRecipe} state={state} />
                </div>
            )}
        </div>
    );
};

Galleries.propTypes = {
    fetchMeals: PropTypes.array,
    openRecipe: PropTypes.func,
    closeRecipe: PropTypes.func,
    state: PropTypes.shape({
        mealId: PropTypes.string,
        isClick: PropTypes.bool,
        loading: PropTypes.bool,
    }),
    setState: PropTypes.func.isRequired,
};

export default Galleries;
