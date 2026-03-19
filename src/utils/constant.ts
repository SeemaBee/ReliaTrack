export type LoginFormValues = {
  email: string;
  password: string;
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
