import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from 'common/components/text'
import useStyles from './ProofOfPickup.styles';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Header from 'common/components/header';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import { Input } from 'common/components/input';
import Button from 'common/components/button';

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
      <TouchableOpacity activeOpacity={1} style={styles.itemDetailsView}>
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

      <Input
        label={'Add note'}
        onChangeText={(v) => setNote(v)}
        value={note}
        autoCapitalize="none"
        returnKeyType="done"
        multiline
        numberOfLines={5}
      />
      <Button title='Submit' onPress={() => navigation.navigate("RouteScreen")} />
    </View>
  )
}

export default ProofOfPickup