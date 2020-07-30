export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    imageURL: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Payload {
    createdAt: Date,
    email: string, 
    id: number,
    imageURL: string,
    name: string,
    token: string, 
    updatedAt: Date
}

export interface imageURL {
    imageURL: string
}