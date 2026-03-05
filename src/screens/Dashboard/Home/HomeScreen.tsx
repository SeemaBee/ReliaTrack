import React, { useState } from 'react';
import { FlatList, Switch, View } from 'react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import CustomText from 'common/components/text';
import getStyles from './HomeScreen.styles';
import { useTheme } from 'common/helperFunctions';
import Tabs from 'common/components/tab';
import { useTranslation } from 'react-i18next';
import JobCard from 'common/components/jobCard';

type Props = {
  navigation: AppNavigationProp<'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const styles = getStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{t('home.title1')}</CustomText>
      <Switch
        trackColor={{ false: theme.grey3, true: theme.primary }}
        thumbColor={theme.white}
        ios_backgroundColor={theme.primary}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <CustomText style={styles.title2}>{t('home.title2')}</CustomText>
      <View style={styles.row}>
        <Tabs
          selected={selectedTab === 0}
          handleClick={() => setSelectedTab(0)}
          text={t('home.tab1')}
        />
        <Tabs
          selected={selectedTab === 1}
          handleClick={() => setSelectedTab(1)}
          text={t('home.tab2')}
        />
        <Tabs
          selected={selectedTab === 2}
          handleClick={() => setSelectedTab(2)}
          text={t('home.tab3')}
        />
      </View>
      <FlatList
        data={['1', '2']}
        style={styles.flx}
        contentContainerStyle={styles.contentStyle}
        renderItem={item => <JobCard />}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
