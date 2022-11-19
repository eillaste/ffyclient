export interface IRecipe {
	id?: string;
	appUserId: string;
  description: string;
  instructions: string;
  servings: number;
  prepTime?: any;
  restaurantRecipe: boolean;
  image: string;
}

// {
//   "id": "e077b9e5-ae28-4ef0-0e8e-08d922c22c14",
//   "appUserId": "c1622982-16d0-4325-b31c-08d91b80f682",
//   "description": "test recipe",
//   "instructions": "daa",
//   "servings": 1,
//   "prepTime": {
//       "ticks": 0,
//       "days": 0,
//       "hours": 0,
//       "milliseconds": 0,
//       "minutes": 0,
//       "seconds": 0,
//       "totalDays": 0,
//       "totalHours": 0,
//       "totalMilliseconds": 0,
//       "totalMinutes": 0,
//       "totalSeconds": 0
//   },
//   "restaurantRecipe": true,
//   "image": "http.lol"
// }