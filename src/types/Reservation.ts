export interface Reservation {
    id: number;
    startTime: Date;
    endTime: Date;
    cost: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    bikeId: number;
}