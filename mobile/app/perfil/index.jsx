import React, { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet, Pressable, Modal, TextInput } from "react-native";
import { UserContext } from "../../scripts/userContext";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { TopBar } from "../../components/bar";
import { useRouter } from "expo-router";

const Perfil = () => {
    const { userInfo, setUserInfo, handleDisconnect } = useContext(UserContext);
    const route = useRouter();
    const [visibilidadeModal, setVisibilidadeModal] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [corfirmarSenha, setCorfirmarSenha] = useState('');

    const pegarImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.mediaTypes,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setUserInfo({ ...userInfo, foto: result.assets[0].uri })
            salvarCloudinary(result.assets[0].uri);
        }
    };

    const salvarCloudinary = async (url) => {
        try {
            const data = {
                "file": url,
                "upload_preset": 'ml_default',
            };
            const res = await fetch('https://api.cloudinary.com/v1_1/duo8nbu2l/upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            setUserInfo({ ...userInfo, foto: result.url });
            salvarImagemNoBackEnd(result.url)
        } catch (error) {
            console.err(error);
        }
    };

    const salvarImagemNoBackEnd = async(url) => {
        try {
            const response = await fetch(`http://localhost:8000/usuarios/${userInfo.email}/salvar_foto`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({foto: url})
            });
           
        } catch (erro) {
            console.log(erro);
            return;
        }
    }

    const fecharModal = () => {
        setNovaSenha('')
        setCorfirmarSenha('')
        setVisibilidadeModal(false);
    }

    const lidarComNovaSenha = async () => {
        if(novaSenha.length < 3) {
            alert('A senha deve ter no minimo 3 caracteres')
            return
        }
        if (novaSenha !== corfirmarSenha) {
            alert('As senhas não coincidem')
            return
        }
        try {
            const resposta = await fetch(`http://localhost:8000/usuarios/${userInfo.email}/nova_senha`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({senha: novaSenha})
            });
            fecharModal()
        } catch (erro) {
            alert('ERRO:',erro);
            return;
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.absolute}
                colors={['black', '#373737']} />
            <TopBar icon1={<Pressable onPress={() => route.back()}>
                <Ionicons name="chevron-back" size={28} color="white" />
            </Pressable>} />
            <Pressable onPress={pegarImagem}>
                <Image
                    source={userInfo.foto}
                    style={styles.image}
                />
            </Pressable>
            <Text style={styles.name}> {userInfo.nome} </Text>
            <Text style={styles.email}> {userInfo.email} </Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => setVisibilidadeModal(true)}>
                <Text style={styles.buttonText}>Mudar Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleDisconnect}>
                <Text style={styles.buttonText}>Sair da Conta</Text>
            </TouchableOpacity>
            <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="green" />
            <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Ionicons name="search" size={24} color="#fff" />
            <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Ionicons name="library" size={24} color="#fff" />
            <Text style={styles.navText}>Biblioteca</Text>
        </TouchableOpacity>
    </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={visibilidadeModal}
                onRequestClose={() => setVisibilidadeModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Mudar Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nova Senha"
                            secureTextEntry
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Nova Senha"
                            secureTextEntry
                            value={corfirmarSenha}
                            onChangeText={setCorfirmarSenha}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={lidarComNovaSenha}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <Pressable style={styles.modalButtonCancel} onPress={fecharModal}>
                            <Text style={styles.modalCancel}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 20,
    },
    absolute: {
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 80,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "green",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: "white",
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 12
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalContent: {
        width: '90%',
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
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
   
    modalButton: {
        backgroundColor: "green",
        paddingVertical: 12,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 8
    },
    modalButtonCancel: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
    },
    modalButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalCancel: {
        color: "green",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#1e1e1e',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#373737',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
});

export default Perfil;