import { ScrollView, View } from 'react-native'
import React from 'react'
import CustomText from 'common/components/text'
import { AppNavigationProp } from 'common/types/navigationTypes';
import useStyles from './ItemDetailsScreen.styles';
import Header from 'common/components/header';
import JobCard from 'common/components/jobCard';
import ItemCard from 'common/components/itemCard';

type Props = {
    navigation: AppNavigationProp<'ItemDetailsScreen'>;
};

const ItemDetailsScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    return (
        <View style={styles.container}>
            <Header title="Item Detail" onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <JobCard data={{}} />
                <CustomText style={styles.title2}>Delivery Items</CustomText>
                <ItemCard />
                <ItemCard />
            </ScrollView>
        </View>
    )
}

export default ItemDetailsScreen