import { FlatList, ScrollView, View } from 'react-native'
import React from 'react'
import CustomText from 'common/components/text'
import { AppNavigationProp } from 'common/types/navigationTypes';
import useStyles from './ItemDetailsScreen.styles';
import Header from 'common/components/header';
import JobCard from 'common/components/jobCard';
import ItemCard from 'common/components/itemCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type Props = {
    navigation: AppNavigationProp<'ItemDetailsScreen'>;
};

const ItemDetailsScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const requestDetails = useSelector((state: RootState) => state.home.request);
    return (
        <View style={styles.container}>
            <Header title={t("route.item_detail")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <JobCard item={requestDetails} />
                <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>
                <FlatList
                    data={requestDetails?.items}
                    renderItem={({ item, index: i }) => (
                        <ItemCard item={item} index={i} />
                    )}
                    scrollEnabled={false}
                    keyExtractor={(_, index) => index.toString()}
                />
            </ScrollView>
        </View>
    )
}

export default ItemDetailsScreen