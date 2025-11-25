export interface BookingRequest {
  id: number;
  studentName: string;
  subject: string;
  amount: number;
  date: string;
  startTime: string;
  endTime: string;
  isRescheduled: boolean;
}
