/**
 * @file activityTracker.js
 * @description A script to track and analyze weekly activities using higher-order functions.
 * @author Dante Killebrew
 */

// 1. Create Your Weekly Data
// An array of objects, where each object represents an activity for a day of the week.
const myWeek = [
  {
    day: 'Monday',
    activity: 'Morning Run',
    category: 'physical',
    hoursSpent: 1,
    enjoyment: 8,
    timeOfDay: 'morning',
  },
  {
    day: 'Tuesday',
    activity: 'Team Project Meeting',
    category: 'work',
    hoursSpent: 3,
    enjoyment: 6,
    timeOfDay: 'afternoon',
  },
  {
    day: 'Wednesday',
    activity: 'Painting Session',
    category: 'creative',
    hoursSpent: 2.5,
    enjoyment: 9,
    timeOfDay: 'evening',
  },
  {
    day: 'Thursday',
    activity: 'Grocery Shopping',
    category: 'chores',
    hoursSpent: 1.5,
    enjoyment: 4,
    timeOfDay: 'afternoon',
  },
  {
    day: 'Friday',
    activity: 'Dinner with Friends',
    category: 'social',
    hoursSpent: 3,
    enjoyment: 9,
    timeOfDay: 'evening',
  },
  {
    day: 'Saturday',
    activity: 'Hiking',
    category: 'physical',
    hoursSpent: 4,
    enjoyment: 10,
    timeOfDay: 'morning',
  },
  {
    day: 'Sunday',
    activity: 'Reading a Book',
    category: 'creative',
    hoursSpent: 2,
    enjoyment: 8,
    timeOfDay: 'afternoon',
  },
];

// 2. Make Predictions
/*
 * My Predictions:
 * 1. Which activity will have the highest enjoyment?
 * I predict that 'Dinner with Friends' or 'Hiking' will have the highest enjoyment.
 *
 * 2. What category will dominate your week?
 * I think the 'physical' or 'social' category will have the most hours spent.
 *
 * 3. What patterns might exist around time of day?
 * I suspect my enjoyment levels will be higher for activities in the evening or morning,
 * and lower for afternoon activities which are often work or chore-related.
 */

// 3. Write Analysis Functions

/**
 * Calculates the total hours spent on a specific category of activity.
 * @param {string} category - The category to filter by (e.g., 'physical', 'creative').
 * @returns {number} The total hours spent on that category.
 */
function totalHoursByCategory(category) {
  return myWeek
    .filter(activity => activity.category === category)
    .reduce((total, activity) => total + activity.hoursSpent, 0);
}

/**
 * Calculates the average enjoyment for activities occurring at a specific time of day.
 * @param {string} time - The time of day to filter by ('morning', 'afternoon', 'evening').
 * @returns {number} The average enjoyment level, or 0 if no activities match.
 */
function averageEnjoymentByTime(time) {
  const activitiesAtTime = myWeek.filter(activity => activity.timeOfDay === time);
  if (activitiesAtTime.length === 0) {
    return 0; // Avoid division by zero
  }
  const totalEnjoyment = activitiesAtTime.reduce((sum, activity) => sum + activity.enjoyment, 0);
  return totalEnjoyment / activitiesAtTime.length;
}

/**
 * Finds all activities that have high enjoyment (>= 8) but took a short amount of time (<= 2 hours).
 * @returns {string[]} A list of the names of these activities.
 */
function findLowEffortHighEnjoymentActivities() {
    return myWeek
        .filter(act => act.hoursSpent <= 2 && act.enjoyment >= 8)
        .map(act => act.activity);
}


// 4. Create a Custom Higher-Order Function

/**
 * A generic function that filters the myWeek array based on a provided test function.
 * @param {function} testFn - A function that takes an activity object and returns true or false.
 * @returns {object[]} An array of activity objects that passed the test.
 */
function filterByCondition(testFn) {
  return myWeek.filter(testFn);
}


// --- Example Usage & Output ---

console.log("Analyzing My Weekly Activities...");
console.log("==================================");

const totalPhysicalHours = totalHoursByCategory('physical');
console.log(`Total hours spent on physical activities: ${totalPhysicalHours}`);

const avgEveningEnjoyment = averageEnjoymentByTime('evening');
console.log(`Average enjoyment for evening activities: ${avgEveningEnjoyment.toFixed(1)}`);

const efficientActivities = findLowEffortHighEnjoymentActivities();
console.log(`Low-effort, high-enjoyment activities: ${efficientActivities.join(', ')}`);

// Using our custom higher-order function to find high-enjoyment morning activities
const highEnjoymentMorning = filterByCondition(act => act.timeOfDay === 'morning' && act.enjoyment > 8);
console.log("High-enjoyment morning activities found with custom filter:", highEnjoymentMorning.map(a => a.activity));
