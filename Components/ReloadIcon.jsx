import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils';

export default function ReloadIcon({load}) {
    const reloadIconName = Platform.OS !== 'ios' ? 'md-refresh' : 'ios-refresh'
    return (
        <View style={styles.reloadIcon}>
            <Ionicons name={reloadIconName} onPress={load} size={24} color="black" color={colors.PRIMARY_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon:{
        position:'absolute',
        top: 40,
        right:-110,
    }
})