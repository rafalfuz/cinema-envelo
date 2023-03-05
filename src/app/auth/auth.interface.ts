export type AuthType = 'none' | 'admin' | 'customer' | null;

export interface User {
  id: string | null;
  name: string | null;
  email: string;
  password: string;
  role: AuthType | string;
}
