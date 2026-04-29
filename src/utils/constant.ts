export type LoginFormValues = {
  email: string;
  password: string;
};
export type Location = {
  latitude: number;
  longitude: number;
};
export type ImageFile = {
  uri: string;
  name: string;
  type: string;
};
export type SafetyChecklistProps = {
  checklist_type: string;
  lights_functional: boolean;
  tire_pressure_checked: boolean;
  windshield_cleaned: boolean;
  vehicle_locked: boolean;
  secure_phi_containers: boolean;
  id_badge_visible: boolean;
  biohazard_bags_available: boolean;
  secure_transport_containers: boolean;
  gloves_available: boolean;
  extra_leakproof_bags: boolean;
};

export type ChangePasswordProps = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type ResetPasswordProps = {
  password: string;
  confirmPassword: string;
};

export type EditProfileProps = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
};

export interface ProofItems {
  item_id: number;
  barcode?: string;
  recipient_name?: string;
  signature_image?: string;
  photo_proof?: string;
  notes?: string;
  scanned_at?: string;
}
export type PickupProps = {
  latitude: number | undefined;
  longitude: number | undefined;
  items: ProofItems[];
};

export interface ItemErrors {
  image?: string;
  barcode?: string;
  signature?: string;
}

export interface ItemProof {
  sealImage: ImageFile | null;
  barcodeValue: string;
  signatureValue: string;
  note: string;
  errors: ItemErrors;
}

export type DeliveryValues = {
  temperature_reading: string;
  note: string;
};

export type StartDeliveryProps = {
  temperature_reading: string;
  notes: string;
  latitude: number | undefined;
  longitude: number | undefined;
};

export type NotDeliveryProps = {
  type: string;
  item_id: number;
  notes: string;
};
