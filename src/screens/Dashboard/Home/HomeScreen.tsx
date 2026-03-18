import React, { useEffect, useState } from 'react';
import { FlatList, Switch, View } from 'react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import CustomText from 'common/components/text';
import { useTheme } from 'common/helperFunctions';
import Tabs from 'common/components/tab';
import { useTranslation } from 'react-i18next';
import JobCard from 'common/components/jobCard';
import useStyles from './HomeScreen.styles';
import ChecklistModal from 'common/components/checklistModal';
import Toast from 'react-native-simple-toast';
import Loader from 'common/components/loader';
import { safetyChecklistAPI } from 'api/dashboard/dashboardAPI';
import { SafetyChecklistProps } from 'utils/constant';

type Props = {
  navigation: AppNavigationProp<'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const toggleSwitch = () => {
    if (!isEnabled) {
      setShowChecklist(true);
    }
    setIsEnabled(previousState => !previousState);
  };

  useEffect(() => {
    getJobRequests();
  }, []);
  const handleChecklist = async (checklistData: SafetyChecklistProps) => {
    try {
      const data = {
        ...checklistData,
        latitude: 0,
        longitude: 0
      }
      console.log(data)
      // return
      const response = await safetyChecklistAPI(data);
      console.log(response)
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    } finally {
      setLoader(false);
    }
  }

  const getJobRequests = async () => {
    try {
      
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    } finally {
      setLoader(false);
    }
  }
  return (
    <View style={styles.container}>
      {loader && <Loader show={loader} />}
      <CustomText style={styles.title}>{t('home.title1')}</CustomText>
      <Switch
        trackColor={{ false: theme.grey3, true: theme.primary }}
        thumbColor={theme.white}
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
      {selectedTab === 0 ?
        <FlatList
          data={['1', '2']}
          style={styles.flx}
          contentContainerStyle={styles.contentStyle}
          renderItem={item => (
            <JobCard
              data={item}
              onPress={() => navigation.navigate('RequestScreen')}
            />
          )}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
        />
        :
        selectedTab === 1 ?
          <View style={styles.centeredContainer}>
            <CustomText>Active Requests</CustomText>
          </View>
          :
          <View style={styles.centeredContainer}>
            <CustomText>Completed Requests</CustomText>
          </View>
      }
      {showChecklist && (
        <ChecklistModal
          show={showChecklist}
          onClose={() => {
            setIsEnabled(false);
            setShowChecklist(false);
          }}
          onSuccess={(data) => handleChecklist(data)}
        />
      )}
    </View>
  );
};

export default HomeScreen;
