export interface IIngredient{
  id?: string;
  appUserId: string;
  foodItemId: string;
  foodItemTitle?:string;
  recipeId: string;
  recipeDescription?: string;
  quantity: number;
}




  //   {
  //     "id": "d525f494-8d55-45de-fcde-08d91c794892",
  //     "appUserId": "c1622982-16d0-4325-b31c-08d91b80f682",
  //     "foodItemId": "8a137c6c-fb89-42b4-c64a-08d9149ace76",
  //     "recipeId": "0abfe651-dede-4d14-1b36-08d91c72ec16",
  //     "quantity": 1
  // },