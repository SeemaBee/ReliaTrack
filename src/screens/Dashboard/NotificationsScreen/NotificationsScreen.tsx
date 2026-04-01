import { View } from 'react-native'
import React from 'react'
import CustomText from 'common/components/text'
import { AppNavigationProp } from 'common/types/navigationTypes';
import useStyles from './NotificationsScreen.styles';
import Header from 'common/components/header';
import { useTranslation } from 'react-i18next';

type Props = {
    navigation: AppNavigationProp<'Home'>;
};

const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Header
                title={t('notification.title')}
                onBackPress={() => navigation.goBack()}
                style={styles.headerStyle}
            />
            <View style={styles.centeredView}>
                <CustomText>Notifications not found</CustomText>
            </View>
        </View>
    )
}

export default NotificationsScreen