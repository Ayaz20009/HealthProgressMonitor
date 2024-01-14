
export const callFunction = async (user: Realm.User | null, name: string, payload?: any): Promise<any> => {
  console.log(`Entering: function ${name} is being called with payload`, payload);
  const response: any = await user?.callFunction(name, payload)
  console.log(`Exiting: function ${name} returned`, response);
  return response;
};