export enum PayoutStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PAID = "PAID",
}

export interface PayoutRequest {
  id: number;
  tutor: any; // User type, can be refined if User interface is available
  amount: number;
  currency: string;
  status: PayoutStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayoutCreationDto {
  amount: number;
}
