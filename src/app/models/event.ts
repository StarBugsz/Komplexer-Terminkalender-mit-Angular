import { Time } from "@angular/common";

export interface Event {
    id: number;
    title: string;
    date: Date;
    startTime: Time;
    endTime: Time;
}
