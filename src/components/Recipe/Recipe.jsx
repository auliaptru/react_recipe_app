import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './recipe.scss';

const Recipe = ({ closeRecipe, state }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMealsById = useCallback(async () => {
        try {
            const resp = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${state.mealId}`
            );

            if (!resp.ok) {
                throw new Error('Network');
            }
            const data = await resp.json();
            setData(data.meals);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [state.mealId]);

    useEffect(() => {
        setLoading(true);
        fetchMealsById();
    }, [fetchMealsById]);

    return (
        <div className='recipe'>
            {data?.map((meal, i) => {
                console.log(meal);
                const {
                    strMeal,
                    strCategory,
                    strMealThumb,
                    strInstructions,
                    strSource,
                    strTags,
                    strYoutube,
                } = meal;

                let count = 1;
                let ingredients = [];
                for (let i in meal) {
                    let ingredient = '';
                    let measure = '';

                    if (i.startsWith('strIngredient') && meal[i]) {
                        ingredient = meal[i];
                        measure = meal[`strMeasure` + count];
                        count++;
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }

                return (
                    <div className='recipe__container' key={i}>
                        {loading ? (
                            <img
                                src='https://media1.giphy.com/media/Cuk3J8bROj6CldKabD/giphy.gif?cid=ecf05e47wkntxazuio20rit3rs1t7az1j2dy4zlrv5lj51k9&ep=v1_stickers_search&rid=giphy.gif&ct=s'
                                alt=''
                            />
                        ) : (
                            <>
                                <div className='recipe__title'>
                                    <h1>{strMeal}</h1>
                                    <button onClick={closeRecipe}>Back</button>
                                </div>
                                <div className='recipe__details'>
                                    <div className='meal__thumb'>
                                        <img src={strMealThumb} alt='' />
                                    </div>
                                    <div className='meal__ingredients'>
                                        {strTags && (
                                            <p>
                                                <span>Tags</span>: {strTags}
                                            </p>
                                        )}

                                        <p className='meal__cate'>
                                            <span>Category</span>: {strCategory}
                                        </p>
                                        <div className='meal__ingredient-lists'>
                                            <h4>Ingredients:</h4>
                                            <ul>
                                                {ingredients.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='meal__instructions'>
                                    <h3>Instructions:</h3>
                                    <p> {strInstructions}</p>
                                </div>
                                <div className='meal__youtube'>
                                    {strYoutube && (
                                        <p>
                                            See tutorial how to make {strMeal}{' '}
                                            on {''}
                                            <a
                                                href={strYoutube}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                Youtube
                                            </a>
                                        </p>
                                    )}
                                    {strSource && (
                                        <p>
                                            See the full recipe explanation on
                                            the{' '}
                                            <a
                                                href={strSource}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                Blog
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

Recipe.propTypes = {
    state: PropTypes.shape({
        mealId: PropTypes.string,
    }).isRequired,
    closeRecipe: PropTypes.func,
};

export default Recipe;
