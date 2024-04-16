export interface User {
  userId: string,
  username: string;
  email: string,
  avatar?: string;
  password: string;
  birthdate?: Date;
  registeredAt?: Date;
}
export interface Tour {
  userId: string,
  username: string;
  email: string,
  avatar?: string;
  password: string;
  birthdate?: Date;
  registeredAt?: Date;
}
// interface Employee extends User{
//     employeeId?: number,
// }

// interface User {
// name: string,
// age: number,
// }
// const employee: Employee = {
// name: 'Jane Doe',
// age: 28,
// employeeId: 12345
// };