import { Image, Pressable, StyleSheet, Text, View } from "react-native"

export const TopBar = ({icon1, title, icon2}) => {

    return (
        <View style={styles.bar}>
            <Pressable>
                {icon1 || null}
            </Pressable>
            <Text>
                {title || null}
            </Text>
            <Pressable>
                {icon2 || null}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        backgroundColor: 'transparent',
        top: 0,
        left: 0,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        padding: 10,
        paddingTop: 20
    },
})
