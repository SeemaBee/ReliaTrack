import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from 'common/components/text'
import useStyles from './ProofOfPickup.styles';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Header from 'common/components/header';
import { Camera, ChevronRight, Scan } from 'lucide-react-native';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import Container from 'common/components/container';

type Props = {
  navigation: AppNavigationProp<'ProofOfPickup'>;
};

const ProofOfPickup: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const styles = useStyles();
  const [note, setNote] = useState('');
  return (
    <View style={styles.container}>
      <Header title="Required Proof of Pickup" onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
      <Container>
        <TouchableOpacity activeOpacity={1} style={styles.itemDetailsView} onPress={() => navigation.navigate("ItemDetailsScreen")}>
          <CustomText style={styles.innerLabel}>All Item Details</CustomText>
          <ChevronRight color={theme.black1} size={Metrics._20} />
        </TouchableOpacity>
        <CustomText style={styles.title2}>Delivery Items</CustomText>
        <CustomText style={styles.itemTxt}>Item 1</CustomText>
        <View style={styles.rowBox}>
          <CustomText style={styles.itemTitle}>Blood</CustomText>
          <TouchableOpacity activeOpacity={1} style={styles.detailBox}>
            <CustomText style={styles.detailText}>
              View More Detail{' '}
            </CustomText>
            <ChevronRight color={theme.black1} size={Metrics._16} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.proofAction}>
            <CustomText style={styles.actionLabel}>Photo of Seal</CustomText>
            <Camera color={theme.grey6} size={Metrics._20} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.proofAction}>
            <CustomText style={styles.actionLabel}>Barcode Scan</CustomText>
            <Scan color={theme.grey6} size={Metrics._20} />
          </TouchableOpacity>
        </View>
        <Input
          label={'Add note'}
          onChangeText={(v) => setNote(v)}
          value={note}
          autoCapitalize="none"
          returnKeyType="done"
          multiline
          numberOfLines={5}
        />
        <View style={styles.flx} />
        <Button title='Submit' onPress={() => navigation.navigate("RouteScreen")} />
      </Container>
    </View>
  )
}

export default ProofOfPickup