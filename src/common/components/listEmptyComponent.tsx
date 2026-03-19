import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from './text'
import { useTheme } from 'common/helperFunctions';
import { LightTheme } from 'theme/colors';

interface Props {
    title: string;
}

const ListEmptyComponent: React.FC<Props> = ({ title }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.emptyContainer}>
            <CustomText style={styles.text}>{title}</CustomText>
        </View>
    )
}

export default ListEmptyComponent

const createStyles = (theme: typeof LightTheme) => {
    return StyleSheet.create({
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            color: theme.black17
        }
    })
}