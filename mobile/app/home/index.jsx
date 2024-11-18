import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PerfilImg } from "../../components/perfilImg";
import { TopBar } from "../../components/bar";

const Home = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.absolute}
                colors={['black', '#373737']} />
                <TopBar icon1={<PerfilImg />}/>
            <Text style={styles.title}>Bem-vindo!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#000',
        },
    absolute: {
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    title: {
        marginTop:100,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
});

export default Home;
