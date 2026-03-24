import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { logoutAPI } from 'api/userProfile/userProfile';
import { logout } from 'redux/features/authSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import { LocalDB } from 'services/database';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AppNavigationProp<'OnboardingNavigation'>>();

  const handleLogout = async () => {
    try {
      const response = await logoutAPI();
      if (response?.success) {
        await LocalDB.clear();
        dispatch(logout());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'OnboardingNavigation' }],
          }),
        );
        Toast.showWithGravity(
          response?.message || 'Logged out successfully',
          Toast.LONG,
          Toast.BOTTOM,
        );
      }
    } catch (error: any) {
      Toast.showWithGravity(
        error?.message || 'Something went wrong',
        Toast.LONG,
        Toast.BOTTOM,
      );
      console.log('Error:-', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: handleLogout,
      },
    ]);
  };

  return {
    logout: handleLogout,
    confirmLogout,
  };
};
