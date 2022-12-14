export interface IAppUser {
  born: string,
  gender: number,
  accountType: string,
  appRoleId: string,
  personDiets: null,
  orders: null,
  dishInOrders: null,
  personAllergens: null,
  consumedFoodItems: null,
  personSupplements: null,
  consumedNutrients: null,
  personRecommendedDietaryIntakes: null,
  personHealthSpecifications: null,
  stocks: null,
  personFavoriteRecipes: null,
  tags: null,
  companyName: null,
  restaurants: null,
  dishInMenus: null,
  ingredients: null,
  menus: null,
  recipes: null,
  recipeTags: null,
  id: string,
  userName: string,
  normalizedUserName: string,
  email: string,
  normalizedEmail: string,
  emailConfirmed: boolean,
  passwordHash: string,
  securityStamp: string,
  concurrencyStamp: string,
  phoneNumber: string,
  phoneNumberConfirmed: boolean,
  twoFactorEnabled: boolean,
  lockoutEnd: null,
  lockoutEnabled: boolean,
  accessFailedCount: number
}