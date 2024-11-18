import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../scripts/userContext";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { pegarUsuario } = useContext(UserContext)


    const realizarLogin = async () => {
        if (!email || !senha) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/autenticacao/login/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });
            if (!response.ok) {
                alert('Erro ao logar');
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            if (response.ok) {
                pegarUsuario(email)
                router.push('/home');
            }
        } catch (erro) {
            console.log(erro);
            return;
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.absolute}
                colors={['black', '#373737']} />
            <View style={styles.body}>
                <Link href={'/home'}>
                    <Image
                        style={styles.img}
                        source={require('../assets/images/spotfake.png')}
                    />
                </Link>
                <Text style={styles.title}>spotfake</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={'gray'}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={realizarLogin} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <Link href={'/cadastro'} style={styles.link}>
                    <Text>Não tem uma conta? Cadastre-se</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    body: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    img: {
        width: 140,
        height: 140
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'green',
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: 'gray',
        height: 46,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        textAlign: 'center',
        color: 'green',
    },
});

export default Login;