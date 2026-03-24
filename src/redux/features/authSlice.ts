import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  profile_photo: string;
  address: string;
  dob: string;
  status: string;
  driver_profile: {
    id: number;
    license_number: string;
    vehicle_type: string;
    vehicle_plate_number: string;
    date_of_birth: string;
    address: string;
    availability_status: string;
    current_location: {
      latitude: string;
      longitude: string;
    };
  };
}

const initialState = {
  user: <User>{},
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    logout: state => {
      state.user = <User>{};
      state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
