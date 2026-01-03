export type Login = {
    email: string,
    password: string
}

export type LoginResponse = 
  | { status: 200; message: string; data: any }
  | { status: number; error: string };

export type Register = {
    username: string,
    email: string,
    password: string
}