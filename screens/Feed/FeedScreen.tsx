import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Colors } from '../../theme/colors';
import FilterIcon from '../../assets/icons/FilterIcon';
import GridIcon from '../../assets/icons/GridIcon';
import ListIcon from '../../assets/icons/ListIcon';
import ReelItem from '../../components/ReelItem';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { useSnatchs } from '../../context/SnatchContext';
import { useUser } from '../../context/UserContext';


type FeedScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MainTabs'>;

const tabs = ['Pour Moi', 'Du Jour', 'Suivis', 'Flashback'];
const GAP = 8; // espacement uniforme
const { width } = Dimensions.get('window');

const GRID_ITEM_WIDTH = (width - GAP * 3) / 2; // 2 colonnes + 3 gaps
const GRID_ITEM_HEIGHT = (GRID_ITEM_WIDTH * 16) / 9;



// Placeholder data
/*const monReel = require('../../assets/videos/laconfig_reel.mp4');

const placeholderReels = Array.from({ length: 10 }, (_, i) => `Reel ${i + 1}`);*/



export default function FeedScreen() {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { snatchs } = useSnatchs();
  const { currentUser } = useUser();
  
  const [activeTab, setActiveTab] = useState('Pour Moi');
  const [isGridView, setIsGridView] = useState(false);

  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  // -------------------------
  // VERIFICATION DU PROFIL
  // -------------------------
  if (!currentUser) {
    return <Text style={{ color: '#fff', padding: 20 }}>Chargement...</Text>;
  }

  console.log('FeedScreen render, isGridView =', isGridView);

  // -------------------------
  // FEED NORMAL
  // -------------------------
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER TABS */}
      <View style={styles.header}>
        {/* Grid toggle */}
        <TouchableOpacity
          style={styles.grid}
          onPress={() => setIsGridView(!isGridView)}
        >
          {isGridView ? (
            <ListIcon width={22} height={22} color={Colors.text} />
          ) : (
            <GridIcon width={22} height={22} color={Colors.text} />
          )}
        </TouchableOpacity>

        {/* Center: Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Filter */}
        <TouchableOpacity style={styles.filter}>
          <FilterIcon width={22} height={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* FEED */}
      {isGridView ? (
        <FlatList
          key="grid"
          data={snatchs}
          keyExtractor={(item, index) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: GAP }}
          renderItem={({ item, index }) => {
            const isLeft = index % 2 === 0;
            return (
              <View
                style={[
                  styles.gridItem,
                  {
                    width: GRID_ITEM_WIDTH,
                    marginLeft: isLeft ? GAP : GAP / 2,
                    marginRight: isLeft ? GAP / 2 : GAP,
                    marginBottom: GAP,
                  },
                ]}
              >
                <ReelItem
                  source={item}
                  itemWidth={GRID_ITEM_WIDTH}
                  itemHeight={GRID_ITEM_HEIGHT}
                  isGridView={isGridView}
                  user={currentUser}
                  navigation={navigation}
                  currentVideoId={currentVideoId}       
                  setCurrentVideoId={setCurrentVideoId} 
                  onPress={() => {
                    console.log('Switching to list', item.id);
                    setCurrentVideoId(item.id);  // sélectionne la vidéo
                    setIsGridView(false);        // passe en mode list
                  }}
                />

              </View>
            );
          }}
        />
      ) : (
        <FlatList
          key="list"
          data={snatchs}
          keyExtractor={(item) => item.id}
          pagingEnabled                     // scroll page par page
          decelerationRate="fast"
          snapToInterval={Dimensions.get('window').height} // snap à la hauteur écran
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.y / Dimensions.get('window').height);
            setCurrentVideoId(snatchs[index]?.id);
          }}
          renderItem={({ item }) => (
            <View style={{ width, height: Dimensions.get('window').height }}>
              <ReelItem
                source={item}
                itemWidth={width}
                itemHeight={Dimensions.get('window').height}
                isGridView={isGridView}
                user={currentUser}
                navigation={navigation}
                currentVideoId={currentVideoId}       
                setCurrentVideoId={setCurrentVideoId} 
                onPress={() => {
                  console.log('Switching to list', item.id);
                  setCurrentVideoId(item.id);  // sélectionne la vidéo
                  setIsGridView(false);        // passe en mode list
                }}
              />
            </View>
          )}
        />

      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    position: 'relative',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 48,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.5,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  tabIndicator: {
    marginTop: 4,        // petit écart sous le texte
    height: 2,           // épaisseur de la barre
    width: 20,       // même largeur que le texte
    backgroundColor: '#fff', // couleur de la barre
    borderRadius: 1,     // bords légèrement arrondis
  },
  grid: {
    position: 'absolute',
    left: 16,
    padding: 4,
  },
  filter: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  reelContainer: {
    flex: 1,
  },
  gridItem: {
    aspectRatio: 9 / 16,
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },
  listItem: {
    marginBottom: 16,
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
});
