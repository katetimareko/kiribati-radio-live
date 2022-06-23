import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from "react"


export default function Controls() {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AM Radio</Text>
            <Image resizeMode='stretch' source={{
                uri: 'https://www.worldatlas.com/webimage/flags/countrys/zzzflags/kilarge.gif',
                width: 200,
                height: 150,
            }}/>
            <View style={styles.controls}>
                <Ionicons style={{ paddingRight: 15}} name="play-skip-back-circle-outline" size={62} color="white" />
                {
                    !isPlaying ?
                    <Pressable onPress={() =>{}}>
                        <Ionicons name="play-circle-outline" size={82} color="white" />
                    </Pressable>
                    :
                    <Pressable onPress={() => {}}>
                        <Ionicons name="ios-pause-circle-outline" size={82} color="white" />
                    </Pressable>
                }
                <Ionicons style={{ paddingLeft: 15}} name="play-skip-forward-circle-outline" size={62} color="white" />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    controls: {
        paddingTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
        color: 'white'
    }
})