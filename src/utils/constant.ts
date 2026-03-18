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
  vehicle_exterior_check: boolean;
  // vehicle_interior_clean: boolean;
  // fuel_level_adequate: boolean;
  tire_pressure_checked: boolean;
  lights_functional: boolean;
  // brakes_functional: boolean;
  emergency_kit_present: boolean;
  // fire_extinguisher_present: boolean;
  // uniform_proper: boolean;
  id_badge_visible: boolean;
  // personal_hygiene: boolean;
  // professional_appearance: boolean;
  // hipaa_trained: boolean;
  // patient_privacy_understood: boolean;
  secure_transport_containers: boolean;
  // phone_lock_enabled: boolean;
  // no_unauthorized_access: boolean;
  // cooler_temperature_checked: boolean;
  biohazard_bags_available: boolean;
  // specimen_containers_secure: boolean;
  // ppe_equipment_available: boolean;
  hand_sanitizer_available: boolean;
  gloves_available: boolean;
  latitude: number;
  longitude: number;
};
