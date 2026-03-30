import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Switch, TouchableOpacity, View } from 'react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import CustomText from 'common/components/text';
import { useTheme } from 'common/helperFunctions';
import Tabs from 'common/components/tab';
import { useTranslation } from 'react-i18next';
import JobCard from 'common/components/jobCard';
import useStyles, { optionsStyles } from './HomeScreen.styles';
import ChecklistModal from 'common/components/checklistModal';
import Toast from 'react-native-simple-toast';
import Loader from 'common/components/loader';
import { activeRequestAPI, completedRequestAPI, newRequestsAPI, safetyChecklistAPI } from 'api/dashboard/dashboardAPI';
import { SafetyChecklistProps } from 'utils/constant';
import ListEmptyComponent from 'common/components/listEmptyComponent';
import { Notification, User } from 'assets/svg';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useLogout } from 'utils/useLogout';
import { RequestData } from 'redux/features/dashboardSlice';

type Props = {
  navigation: AppNavigationProp<'Home'>;
};
const PER_PAGE = 15;
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyles();
  const { confirmLogout } = useLogout();
  const { t } = useTranslation();
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [activeRequests, setActiveRequests] = useState<RequestData[]>([]);
  const [completedRequests, setCompletedRequests] = useState<RequestData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [completedPage, setCompletedPage] = useState(1);
  const [completedLoadingMore, setCompletedLoadingMore] = useState(false);
  const [completedHasMore, setCompletedHasMore] = useState(true);
  const completedMomentum = useRef(true);
  const onEndReachedCalledDuringMomentum = useRef(true);

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
      const response = await newRequestsAPI(pageNum, PER_PAGE);
      // console.log(response, '====>jobs');
      if (response?.success) {
        const newData = response?.data?.deliveries || [];
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

  useEffect(() => {
    getActiveJobRequests();
    getCompletedJobRequests(1);
  }, []);

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum.current && !loadingMore && hasMore && !loader) {
      onEndReachedCalledDuringMomentum.current = true;
      const nextPage = page + 1;
      setPage(nextPage);
      getJobRequests(nextPage);
    }
  }

  const getActiveJobRequests = async () => {
    try {
      const response = await activeRequestAPI();
      // console.log(response, "======>active");
      if (response?.success) {
        setActiveRequests(response?.data || []);
      }
    } catch (error: any) {
      console.log("Error:-", error);
    }
  }

  const getCompletedJobRequests = async (pageNum: number) => {
    try {
      if (pageNum > 1) setCompletedLoadingMore(true);
      const response = await completedRequestAPI(pageNum, 20);
      // console.log(response, "======>completed");
      if (response?.success) {
        const newData = response?.data?.deliveries || [];
        setCompletedRequests(prev => pageNum === 1 ? newData : [...prev, ...newData]);
        setCompletedHasMore(newData.length === 20);
      }
    } catch (error: any) {
      console.log("Error:-", error);
    } finally {
      setCompletedLoadingMore(false);
    }
  }

  const handleCompletedLoadMore = () => {
    if (!completedMomentum.current && !completedLoadingMore && completedHasMore) {
      completedMomentum.current = true;
      const nextPage = completedPage + 1;
      setCompletedPage(nextPage);
      getCompletedJobRequests(nextPage);
    }
  }

  return (
    <View style={styles.container}>
      {loader && <Loader isLoading={loader} />}
      <View style={styles.headerContainer}>
        <View style={styles.jobStatusView}>
          <CustomText style={styles.title}>{t('home.title1')}</CustomText>
          <Switch
            trackColor={{ false: theme.grey3, true: theme.primary }}
            thumbColor={theme.white}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity activeOpacity={0.9} style={styles.iconContainer}>
            <Notification />
          </TouchableOpacity>
          <View style={styles.verticalLine} />
          <Menu>
            <MenuTrigger style={styles.iconContainer}>
              <User />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles(theme)}>
              <MenuOption onSelect={() => navigation.navigate("EditProfile")} style={styles.menuOption}>
                <CustomText>{t("user_profile.edit_profile")}</CustomText>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate("ChangePassword")} style={styles.menuOption}>
                <CustomText>{t("auth.change_password")}</CustomText>
              </MenuOption>
              <MenuOption onSelect={confirmLogout} style={styles.menuOption}>
                <CustomText>{t("auth.logout")}</CustomText>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <CustomText style={styles.title2}>{t('home.title2')}</CustomText>
      <View style={styles.rowBox}>
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
          renderItem={({ item, index: i }) => (
            <JobCard
              item={item}
              index={i}
              onPress={() => navigation.navigate('RequestScreen', { id: item?.id })}
            />
          )}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />}
          onEndReached={handleLoadMore}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size={'small'} color={theme.primary} /> : <View style={styles.bottomSpace} />}
          keyExtractor={(_, index) => index?.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            !loader && <ListEmptyComponent title='No new requests found' />
          )
          }
        />
        :
        selectedTab === 1 ?
          <FlatList
            data={activeRequests}
            style={styles.flx}
            contentContainerStyle={styles.contentStyle}
            renderItem={({ item, index: i }) => (
              <JobCard
                item={item}
                index={i}
                onPress={() => navigation.navigate('RequestScreen', { id: item?.id })}
              />
            )}
            keyExtractor={(_, index) => index?.toString()}
            ListEmptyComponent={<ListEmptyComponent title='No active requests found' />}
          />
          :
          <FlatList
            data={completedRequests}
            style={styles.flx}
            contentContainerStyle={styles.contentStyle}
            renderItem={({ item, index: i }) => (
              <JobCard
                item={item}
                index={i}
                onPress={() => navigation.navigate('RequestScreen', { id: item?.id })}
              />
            )}
            keyExtractor={(_, index) => index?.toString()}
            onEndReached={handleCompletedLoadMore}
            onMomentumScrollBegin={() => {
              completedMomentum.current = false;
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              completedLoadingMore
                ? <ActivityIndicator size="small" color={theme.primary} />
                : <View style={styles.bottomSpace} />
            }
            ListEmptyComponent={<ListEmptyComponent title='No history found' />}
          />
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
