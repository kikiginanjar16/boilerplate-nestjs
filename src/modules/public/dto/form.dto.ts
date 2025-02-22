export class CreateDto {
  name: string;
  avatar?: any;
  is_active?: number;
  phone: string;
  email: string;
  password: string;
  status?: 'verified' | 'unverfied';
  type?: 'user' | 'admin';
}

export class UpdateDto {
  name?: string;
  avatar?: any;
  is_active?: number;
  phone?: string;
  email?: string;
  password?: string;
  status?: 'verified' | 'unverfied';
  type?: 'user' | 'admin';
}