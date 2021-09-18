const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const single_MealEl = document.getElementById('single-meal');
const alert = document.getElementById('alert');


// Search meal
function searchMeal(e) {
  e.preventDefault();
  const term = search.value;
  // 判斷 term 刪除空白後是否有值
  if(term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        resultHeading.innerHTML =  `<h2>You are search for the '${term}':</h2>`;
        if(data.meals === null) {
          resultHeading.innerHTML = `<h2>There is not found for the '${term}':</h2>`;
        } else {
          mealsEl.innerHTML = data.meals.map(item => 
            `
            <div class="meal">
              <img src="${item.strMealThumb}" alt="${item.strMeal}" class="meal-img">
              <div class="meal-info" data-mealId="${item.idMeal}">
                <h3>${item.strMeal}</h3>
              </div>
            </div>
            `
          ).join('');
          
          single_MealEl.innerHTML = '';
        }
      });
      
  } else {
    
  }
  search.value = '';
}

// Get single meal data with Id
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(res => res.json())
  .then(data => {
    addSingleMeal(data.meals[0]);
  });
}

//Add the single meal DOM
function addSingleMeal(meal) {
  let ingredient = [];
  for(let i = 1;i <= 20;i++) {
    if(meal[`strIngredient${i}`]) {
      ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      break;
    }
  }
  single_MealEl.innerHTML = `
    <div class="single-meal">
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        <h4>${meal.strCategory}</h4>
        <p>${meal.strInstructions}</p>
        <h4>Ingredient</h4>
        <ul>
          ${ingredient.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
  `
}

// Get a random  Meal
function getRandomMeal() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(data => {
    resultHeading.innerHTML = '';
    mealsEl.innerHTML = '';
    addSingleMeal(data.meals[0]);
  });

}

// Event listeners
submit.addEventListener('submit', searchMeal);

// 點擊後如果有classList有值 ，回傳第一個classList有包含 'meal-info' 的item
mealsEl.addEventListener('click', e => {
  
    const mealInfo = e.path.find(item => {
      if(item.classList) {
        return item.classList.contains('meal-info');
      } else {
        return false;
      }
    });

    if(mealInfo) {
      const mealId = mealInfo.getAttribute('data-mealId');
      getMealById(mealId);
    } else {
      return false;
    }
})

random.addEventListener('click', getRandomMeal);


getRandomMeal();
