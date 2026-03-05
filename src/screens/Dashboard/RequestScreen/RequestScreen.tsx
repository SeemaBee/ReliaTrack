import { ScrollView, View } from 'react-native'
import React from 'react'
import CustomText from 'common/components/text'
import useStyles from './RequestScreen.styles'
import Header from 'common/components/header'
import { AppNavigationProp } from 'common/types/navigationTypes'
import JobCard from 'common/components/jobCard'
import ItemCard from 'common/components/itemCard'
import Button from 'common/components/button'

type Props = {
    navigation: AppNavigationProp<'RequestScreen'>;
};

const RequestScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    return (
        <View style={styles.container}>
            <Header title="Requests" onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <JobCard data={{}} />
                <CustomText style={styles.title2}>Delivery Items</CustomText>
                <ItemCard />
                <ItemCard />
                <CustomText style={styles.title2}>More Details</CustomText>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Urgency Level</CustomText>
                    <CustomText style={styles.detailsValue}>ASAP</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Temperature Requirement</CustomText>
                    <CustomText style={styles.detailsValue}>Ambient</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Vehicle Requirements</CustomText>
                    <CustomText style={styles.detailsValue}>Refrigerator</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Number of containers or bags </CustomText>
                    <CustomText style={styles.detailsValue}>4</CustomText>
                </View>

                <Button title='Accept' onPress={() => navigation.navigate("PickupConfirmation")} />
            </ScrollView>
        </View>
    )
}

export default RequestScreen