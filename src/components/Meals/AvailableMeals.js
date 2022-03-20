import { useState, useCallback, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-learning-a77f0-default-rtdb.firebaseio.com/meals.json",
        {}
      );

      if (!response.ok) {
        throw new Error("Invalid Response");
      }
      const data = await response.json();
      const transformedmeals = [];

      for (const taskKey in data) {
        transformedmeals.push({
          id: taskKey,
          name: data[taskKey].name,
          description: data[taskKey].description,
          price: data[taskKey].price,
        });
      }
      setMeals(transformedmeals);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !error && <ul>{mealsList}</ul>}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error in fetching data</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
