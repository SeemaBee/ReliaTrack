import { useTheme } from "common/helperFunctions";
import { forwardRef } from "react";
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { Metrics } from "theme/metrics";
import CustomText from "./text";
import { FontFamily, FontSizes } from "theme/typography";

type dobProps = {
    label?: string;
    value: string;
    rightIconName?: React.ElementType;
    placeholder?: string;
    onPress?: () => void;
    boxStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    error?: string;
}

const DateOfBirthInput = forwardRef<TextInput, dobProps>(
    (
        {
            label,
            value,
            rightIconName: RightIcon,
            placeholder = '',
            boxStyle,
            onPress,
            inputStyle,
            error = '',
        },
        ref,
    ) => {
        const theme = useTheme();
        const styles = getStyles();
        return (
            <View style={[styles.inputGroup, boxStyle && boxStyle]}>
                {label &&
                    <CustomText style={styles.label}>{label}</CustomText>
                }
                <TouchableOpacity activeOpacity={1} style={[styles.inputContainer, {
                    backgroundColor: theme.white,
                    borderColor: error ? theme.error : theme.border1,
                }, inputStyle && inputStyle]} onPress={onPress}>
                    <TextInput
                        ref={ref}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor={theme.textSecondary}
                        readOnly={true}
                        style={[
                            styles.input,
                            { color: theme.text },
                        ]}
                        textAlignVertical={'center'}
                    />
                    {RightIcon && (
                        <RightIcon
                            size={Metrics._20}
                            color={theme.textSecondary}
                            style={styles.inputRightIcon}
                        />
                    )}
                </TouchableOpacity>
                {!!error && <CustomText color={theme.error}>{error}</CustomText>}
            </View>
        )
    }
)

export default DateOfBirthInput

const getStyles = () =>
    StyleSheet.create({
        inputGroup: {
            marginBottom: Metrics._10,
            width: '100%',
        },
        label: {
            fontSize: FontSizes._14,
            marginBottom: Metrics._8,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: Metrics._8,
            paddingHorizontal: Metrics._12,
            height: Metrics._48,
        },
        input: {
            flex: 1,
            fontSize: FontSizes._12,
            fontFamily: FontFamily.interTightRegular,
        },
        inputRightIcon: {
            marginLeft: Metrics._10,
        },
    })