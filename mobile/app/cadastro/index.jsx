import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";

const Cadastro = () => {
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const realizarRegistro = async () => {
        if (!nome || !sobrenome || !email || !dataNascimento || !senha) {
            alert('Preencha todos os campos');
            return;
        }

        
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/autenticacao/registro/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    dataNascimento: dataNascimento,
                    senha: senha
                })
            });
            if (!response.ok) {
                alert('Erro ao cadastrar');
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            if (response.ok) {
                router.push('/');
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
                <Text style={styles.title}>Cadastro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor={'gray'}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sobrenome"
                    placeholderTextColor={'gray'}
                    value={sobrenome}
                    onChangeText={setSobrenome}
                />
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
                    placeholder="Data de Nascimento"
                    placeholderTextColor={'gray'}
                    value={dataNascimento}
                    onChangeText={setDataNascimento}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={'gray'}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar senha"
                    placeholderTextColor={'gray'}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={realizarRegistro} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <Link href={'/'} style={styles.link}>
                    <Text>Já tem uma conta? Conecte-se</Text>
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
        width: '100%',
        paddingVertical: 12,
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

export default Cadastro;
