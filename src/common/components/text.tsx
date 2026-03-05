import { useTheme } from 'common/helperFunctions';
import React from 'react';
import { Text, TextProps } from 'react-native';
import { Metrics } from 'theme/metrics';
import { FontFamily } from 'theme/typography';

interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'title' | 'body' | 'caption';
  weight?: '400' | '500' | '600' | '700';
  color?: string;
}

export const CustomText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();

  const variantFontSize = {
    h1: Metrics._28,
    h2: Metrics._22,
    h3: Metrics._18,
    title: Metrics._16,
    body: Metrics._14,
    caption: Metrics._12,
  }[variant];

  return (
    <Text
      {...rest}
      style={[
        {
          color: color || theme.text,
          fontSize: variantFontSize,
          fontFamily: FontFamily.interTightRegular,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
