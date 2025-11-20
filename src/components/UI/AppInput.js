import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, radius, spacing, shadow } from '../../theme';

const AppInput = ({ style, ...props }) => {
  return (
    <View style={[styles.wrap, style]}>
      <TextInput placeholderTextColor={colors.textMuted} style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    ...shadow.light,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
});

export default AppInput;


