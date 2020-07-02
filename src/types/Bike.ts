export interface Bike {
    id: number;
    name: string;
    latitude: number;
    longitutde: number;
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    locked: boolean;
}