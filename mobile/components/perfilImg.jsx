import { useContext } from "react"
import { Image, Pressable, StyleSheet, View } from "react-native"
import { UserContext } from "../scripts/userContext"
import { useRouter } from "expo-router"

export const PerfilImg = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const route = useRouter()

    return (
            <Pressable onPress={() => route.push('/perfil')}>
                <Image
                    style={styles.foto}
                    source={userInfo.foto}
                />
            </Pressable>
    )
}

const styles = StyleSheet.create({
    foto: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
})
