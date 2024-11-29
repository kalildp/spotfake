import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { PerfilImg } from "../../components/perfilImg";
import { TopBar } from "../../components/bar";

const MusicCard = ({ music, onPress }) => (
    <TouchableOpacity onPress={() => onPress(music)}>
        <View style={styles.playlistItem}>
            <Image source={{ uri: music.cover }} style={styles.playlistImage} />
            <Text style={styles.playlistTitle}>{music.title}</Text>
        </View>
    </TouchableOpacity>
);

const Home = () => {
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const albuns = [
        { id: '1', title: 'Appetite For Destruction', artist: "Guns N' Roses", cover: 'https://cdn-images.dzcdn.net/images/cover/75c0f08e23dca1c8e25b298ee67a41d1/0x1900-000000-80-0-0.jpg' },
        { id: '2', title: 'Back In Black', artist: "AC/DC", cover: 'https://i.scdn.co/image/ab67616d0000b2730b51f8d91f3a21e8426361ae' },
        { id: '3', title: 'Use Your Illusion I', artist: "Guns N' Roses", cover: 'https://upload.wikimedia.org/wikipedia/pt/9/9e/UYI1.jpeg' },
        { id: '4', title: 'Chinese Democracy', artist: "Guns N' Roses", cover: 'https://upload.wikimedia.org/wikipedia/pt/2/23/Guns_N%27_Roses_-_Chinese_Democracy.jpg' },
        { id: '5', title: 'Now Or never', artist: "Bon Jovi", cover: 'https://m.media-amazon.com/images/I/412xKHLu59L._UXNaN_FMjpg_QL85_.jpg' },
    ];

    const recentlyPlayed = [
        { id: '6', title: 'Heaven', artist: 'Bryan Adams', cover: 'https://i.scdn.co/image/ab67616d0000b273cf1fee2a55e98e22bf358512' },
        { id: '7', title: 'Eye Of The Storm', artist: 'Watt White', cover: 'https://cdn-images.dzcdn.net/images/cover/c91fdafe59599d58294595938fa2b445/1900x1900-000000-80-0-0.jpg' },
        { id: '8', title: 'Beautiful Things', artist: 'Benson Boone', cover: 'https://i.scdn.co/image/ab67616d0000b273bef221ea02a821e7feeda9cf' },
        { id: '9', title: "Sweet Child O' Mine", artist: "Guns N' Roses", cover: 'https://cdn-images.dzcdn.net/images/cover/75c0f08e23dca1c8e25b298ee67a41d1/0x1900-000000-80-0-0.jpg' },
        { id: '10', title: 'Heroes Tonight', artist: 'Janji,Johnning', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDK539tztExqfiFu4HDUwCSkQ_ftSYA2uDw&s' },
    ];

    const recomendados = [
        { id: '1', title: 'Bomb', artist: '¥$,Kanye West,Ty Dolla Sign', cover: 'https://i.scdn.co/image/ab67616d0000b273fb9cedd86a3d08dc053a550d', duration: '4:30' },
        { id: '2', title: 'Grippy', artist: 'Cash Cobain,J. Cole', cover: 'https://i.scdn.co/image/ab67616d0000b273a99863ac99923f4a5f101e14', duration: '3:19' },
        { id: '3', title: 'Numb', artist: 'Link Park', cover: 'https://i.scdn.co/image/ab67616d0000b27310b4bd659193bc34476e066f', duration: '3:00' },
        { id: '4', title: "Highway To Hell", artist: "AC/DC", cover: 'https://m.media-amazon.com/images/I/91NuHgWC6cL._AC_UF1000,1000_QL80_.jpg', duration: '5:56' },
        { id: '5', title: 'Master Of Puppets', artist: 'Metallica', cover: 'https://m.media-amazon.com/images/I/81hryXAVZjL.jpg', duration: '3:28' },
    ];

    const openMusicCard = (music) => {
        setSelectedMusic(music);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedMusic(null);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.absolute}
                colors={['black', '#373737']}
            />
            <TopBar icon1={<PerfilImg />} />
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.quickPlayContainer}>
                    {albuns.slice(0, 4).map((item) => (
                        <View key={item.id} style={styles.quickPlayItem}>
                            <Image source={{ uri: item.cover }} style={styles.quickPlayImage} />
                            <Text style={styles.quickPlayTitle}>{item.title}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Tocadas Recentemente</Text>
                <FlatList
                    data={recentlyPlayed}
                    renderItem={({ item }) => <MusicCard music={item} onPress={openMusicCard} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />

                <Text style={styles.sectionTitle}>Albuns Populares</Text>
                <ScrollView>
                    <FlatList
                        data={albuns}
                        renderItem={({ item }) => <MusicCard music={item} onPress={openMusicCard} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    />
                </ScrollView>
                <Text style={styles.sectionTitle}>Recomendados</Text>
                <FlatList
                    data={recomendados}
                    renderItem={({ item }) => <MusicCard music={item} onPress={openMusicCard} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />
            </ScrollView>
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

            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.card}>
                        {selectedMusic && (
                            <>
                                <Image source={{ uri: selectedMusic.cover }} style={styles.cardImage} />
                                <Text style={styles.cardTitle}>{selectedMusic.title}</Text>
                                <Text style={styles.cardArtist}>{selectedMusic.artist}</Text>
                                <View style={styles.controls}>
                                    <Ionicons name="play-back" size={28} color="#fff" />
                                    <Ionicons name="play" size={36} color="green" />
                                    <Ionicons name="play-forward" size={28} color="#fff" />
                                </View>
                                <Text style={styles.duration}>{selectedMusic.duration}</Text>
                            </>
                        )}
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
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
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#000',
    },
    absolute: {
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
    contentContainer: {
        paddingBottom: 20,
        flexGrow: 1,
        paddingTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginHorizontal: 16,
        marginBottom: 10,
    },
    horizontalList: {
        paddingHorizontal: 16,
    },
    playlistItem: {
        marginRight: 16,
        alignItems: 'center',
        borderRadius: 8,
    },
    playlistImage: {
        width: 130,
        height: 130,
        borderRadius: 8,
    },
    playlistTitle: {
        color: '#fff',
        fontSize: 14,
        marginTop: 8,
        width: 140,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    card: {
        backgroundColor: '#1e1e1e',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    cardImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    cardArtist: {
        color: '#aaa',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginBottom: 20,
    },
    duration: {
        color: '#aaa',
        fontSize: 14,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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

export default Home;
