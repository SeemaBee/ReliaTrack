import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Switch, View } from 'react-native';
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
import { jobRequestsAPI, safetyChecklistAPI } from 'api/dashboard/dashboardAPI';
import { SafetyChecklistProps } from 'utils/constant';
import ListEmptyComponent from 'common/components/listEmptyComponent';

type Props = {
  navigation: AppNavigationProp<'Home'>;
};
const PER_PAGE = 15;
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const toggleSwitch = () => {
    if (!isEnabled) {
      setShowChecklist(true);
    }
    setIsEnabled(previousState => !previousState);
  };

  const handleChecklist = async (checklistData: SafetyChecklistProps) => {
    try {
      const data = {
        ...checklistData,
        latitude: 0,
        longitude: 0
      }
      const response = await safetyChecklistAPI(data);
      // console.log(response);
      if (response?.success) {
        Toast.showWithGravity(response?.message || "Safety checklist updated successfully", Toast.LONG, Toast.BOTTOM);
        setShowChecklist(false);
      }
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    }
  }

  const getJobRequests = useCallback(async (pageNum: number, isRefreshingCall = false) => {
    try {
      if (pageNum > 1) setLoadingMore(true);
      else if (!isRefreshingCall) setLoader(true);
      const response = await jobRequestsAPI(pageNum, PER_PAGE);
      console.log(response, '====>jobs');
      if (response?.success) {
        const newData = response?.data?.requests || [];
        setRequests(prev => (pageNum === 1 ? newData : [...prev, ...newData]));
        setHasMore(newData.length === PER_PAGE);
      }
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    } finally {
      setLoader(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    getJobRequests(1, true);
  }, [getJobRequests]);

  useEffect(() => {
    getJobRequests(1);
  }, [getJobRequests]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !loader) {
      const nextPage = page + 1;
      setPage(nextPage);
      getJobRequests(nextPage);
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
          data={requests}
          style={styles.flx}
          contentContainerStyle={styles.contentStyle}
          renderItem={item => (
            <JobCard
              data={item}
              onPress={() => navigation.navigate('RequestScreen')}
            />
          )}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loader show={true} /> : <View style={styles.bottomSpace} />}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            !loader && <ListEmptyComponent title='No new requests found' />
          )
          }
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
