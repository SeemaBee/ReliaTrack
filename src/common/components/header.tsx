import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { LightTheme } from 'theme/colors';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import CustomText from './text';
import { ArrowLeft } from 'lucide-react-native';
import { FontFamily, FontSizes } from 'theme/typography';
import { Notification, User } from 'assets/svg';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { optionsStyles } from 'screens/Dashboard/Home/HomeScreen.styles';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  onBackPress: () => void;
  showProfile?: boolean;
  onNotification?: () => void;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onLogout?: () => void;
  style?: ViewStyle;
};

const Header = ({ title, onBackPress, style, showProfile, onNotification, onEditProfile, onChangePassword, onLogout }: Props) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onBackPress()}>
          <ArrowLeft />
        </TouchableOpacity>
        <CustomText style={styles.title}>{title}</CustomText>
      </View>
      {showProfile && <View style={styles.rightView}>
        <TouchableOpacity activeOpacity={0.9} style={styles.iconContainer} onPress={onNotification}>
          <Notification />
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <Menu>
          <MenuTrigger style={styles.iconContainer}>
            <User />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles(theme)}>
            <MenuOption onSelect={onEditProfile} style={styles.menuOption}>
              <CustomText>{t("user_profile.edit_profile")}</CustomText>
            </MenuOption>
            <MenuOption onSelect={onChangePassword} style={styles.menuOption}>
              <CustomText>{t("auth.change_password")}</CustomText>
            </MenuOption>
            <MenuOption onSelect={onLogout} style={styles.menuOption}>
              <CustomText>{t("auth.logout")}</CustomText>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>}
    </View>
  );
};

const getStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: Metrics._60,
      paddingHorizontal: Metrics._16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Metrics._8,
    },
    title: {
      fontSize: FontSizes._22,
      fontFamily: FontFamily.interTightMedium,
    },
    iconContainer: {
      height: Metrics._24,
      width: Metrics._24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verticalLine: {
      height: Metrics._24,
      width: Metrics._1,
      backgroundColor: theme.grey8,
      marginHorizontal: Metrics._10,
    },
    menuOption: {
      padding: Metrics._10,
    },
    rightView: {
      flexDirection: 'row'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Metrics._8,
    }
  });

export default Header;
