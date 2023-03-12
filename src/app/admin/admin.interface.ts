import { Room } from '../order/order.interface';

export interface WizardFormRecord {
  dayOfScreening: string;
  startTime: string;
  room: Room;
}
