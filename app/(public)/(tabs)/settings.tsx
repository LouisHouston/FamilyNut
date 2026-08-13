import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useEffect, useState } from 'react';
import { api } from '@/providers/api';
import { AppModal } from '@/components/AppModal';
import { FontAwesome6 } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [familyData, setFamilyData] = useState<{ id: number; name: string }[]>([]);
  const [memberData, setMemberData] = useState<{ id: number; name: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [mc, setMC] = useState(0);

  
  useEffect( () => {
      getFamilies();
      getMembers();
  },[]);

  const getFamilies = async()  => {
    const data = await api("/api/families/", "GET");
    setFamilyData(data);
  }

  const getMembers = async()  => {
    const data = await api("/api/members/?family_id=5", "GET");
    setMemberData(data);
  }

  const handleMemberPress = () => {
    setModalVisible(true);
  }


  const modalContent = ( 
    <ThemedText>
      Lord Farquad:
      {memberData[0]?.calories}
    </ThemedText>
  );

  return (
     <ThemedView style={styles.container}>
          <AppModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            {modalContent}
          </AppModal>
          <ThemedText type="title">Meals</ThemedText>
          {familyData.map((family) => (
                      <ThemedText key={family.id}> Family: {family.name}  </ThemedText> 
                    ))}
          <ThemedText type="subtitle"> Members: </ThemedText>
          {memberData.map((member) => (
                        <Pressable  key={member.id} onPress ={handleMemberPress}> 
                      <ThemedText type="memberCard" key={member.id}> {member.name} <FontAwesome6 name="chevron-right" size={14} /> </ThemedText> 
                       
                      </Pressable>
                    ))}
          
        </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 5,
    borderRadius: 3,
    paddingVertical: 5,
    backgroundColor: '#ff0000',
  },
});
