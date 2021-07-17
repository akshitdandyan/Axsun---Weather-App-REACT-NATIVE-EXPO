import React from 'react';
import { View, StyleSheet,Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker';

export default function UnitsPicker({ setTempUnitSystem, tempUnitSystem }) {
    return (
        <View style={styles.unitsSystem}>
            <Picker selectedValue={tempUnitSystem} onValueChange={(item)=>setTempUnitSystem(item)} mode='dropdown' itemStyle={{fontSize:12}}>
                <Picker.Item label="°C" value='metric' />
                <Picker.Item label="°F" value='imperial' />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem:{
        ...Platform.select({
            ios:{
                top:-20,
                left:20
            },
            android:{
                top:40,
                left:-100
            }
        }),
        position:'absolute',
        height:50,
        width:100,
    }
})