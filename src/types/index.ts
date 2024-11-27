export interface UserDataProps {
  name: string;
  email: string;
  createdAt?: Date; 
  updatedAt?: Date; 
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface OrderDataProps {
    customer_name: string;
    customer_email: string;
    product: 'Product 1' | 'Product 2' | 'Product 3';
    quantity: number;
    order_value: number;
  }