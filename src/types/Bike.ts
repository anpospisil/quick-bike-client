export interface Bike {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    locked: boolean;
}

export interface bikeId {
    id: number;
}