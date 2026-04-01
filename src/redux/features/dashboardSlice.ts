import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RequestData {
  id: number;
  delivery_number: string;
  status: string;
  priority: string;
  pickup: {
    name: string;
    address: string;
    city: string;
    phone: string;
    scheduled_time: string;
    actual_time: string | null;
    location: {
      latitude: string;
      longitude: string;
    };
  };
  delivery: {
    name: string;
    address: string;
    city: string;
    phone: string;
    scheduled_time: string;
    actual_time: string | null;
    location: {
      latitude: string;
      longitude: string;
    };
  };
  driver: {
    id: number;
    name: string;
    phone: string;
  };
  temperature_requirement: string | null;
  vehicle_requirements: string | null;
  container_count: number;
  items: ItemsData[];
  items_count: number;
  distance_km: string;
  estimated_duration_minutes: number;
  special_instructions: string | null;
  created_at: string;
}
export interface ItemsData {
  id: number;
  item_type: string;
  specimen_type: string;
  barcode: string;
  quantity: number;
  temperature_requirement: string;
  requires_special_handling: boolean;
  handling_instructions: null;
  status: string;
}

const initialState = {
  request: <RequestData>{},
};

const dashboardSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setRequestData: (state, action: PayloadAction<RequestData>) => {
      state.request = action.payload;
    },
  },
});

export const { setRequestData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
