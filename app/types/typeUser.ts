export interface TUser {
    id: number;
    email: string;
    name: string;
    phone: string;
    password: string;
    avatar: string;
    role: string;
    gender: boolean;
    birthday: string;
}

export interface TUserLogin {
    user: TUser;
    token:string;
}