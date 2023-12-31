export type Token = { 
  id: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
};
  
export type Login = {
  username: string,
  password: string,
};