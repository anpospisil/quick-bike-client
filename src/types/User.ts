export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    imageURL: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Token {
    jwt: string
}