import { Image } from 'expo-image';
import { useAuth } from '../../../providers/AuthProvider'
import { Platform, StyleSheet, Pressable, TextInput, Modal, View, Alert } from 'react-native';
import { router } from 'expo-router';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {api} from "../../../providers/api";
import { FontAwesome6 } from '@expo/vector-icons';
import {ScrollView} from "react-native"


export default function FamilyScreen() {
  const { user } = useAuth();
  const { signOut } = useAuth();
  const { loading } = useAuth();
  const [familyName, setFamilyName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  type Family = { id: number; name: string };
  const [families, setFamilies] = useState<Family[]>([]);
  const [modalType, setModalType] = useState("0");
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [memberAge, setMemberAge] = useState(0);
  const [memberWeight, setMemberWeight] = useState(0);
  const [memberHeight, setMemberHeight] = useState(0);
  const [memberInches, setMemberInches] = useState(0);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  }

  const handleCreateFamily = async () => {
    console.log("Creating family with name:", familyName);
  try {
    const data = await api("/api/families/", "POST", {
      name: familyName,
    });

    console.log("CREATED:", data);
    router.push('/family');
  } catch (err) {
    console.log("ERROR:", err);
  }
};

const handleCreateMembers = async () => {
  const heightConversion = Number((memberHeight * 12)) + Number(memberInches);
console.log("Creating MEMBER WITH stats:", memberName, memberWeight, heightConversion, memberAge);
  try {
    const data = await api("/api/members/", "POST", {
      name: memberName,
      age: memberAge,
      weight: memberWeight,
      height: heightConversion,
      family: selectedFamily.id,
    });

    console.log("CREATED:", data);
    router.push('/family');
  } catch (err) {
    console.log("ERROR:", err);
  }
};

const getFamilies = async () => {
  console.log("Fetching families...");
  try {
    const data = await api("/api/families/", "GET");
    console.log("FAMILIES:", data);
    setFamilies(data);
  } catch (err) {
    console.log("ERROR:", err);
  }
}

const familyManagerModal = (family) => {
  setModalVisible(true);
  setModalType("familyManager");
  setSelectedFamily(family)
}

const createFamilyModal = async () => {
  setModalVisible(true);
  setModalType("createFamily");
}

useEffect(() => {
  if (user) {
    getFamilies();
  }
}, [user]);


  if (loading) {
    return (
      <ThemedText>Loading...</ThemedText>)}
      else{
  return ( 
     user ? ( <ThemedView style={styles.container}>
      <ThemedText> Welcome {user.email} </ThemedText>
      <ThemedText type="title">Family</ThemedText>
      {families && (
        <View>
          {families.map((family) => (
            <Pressable style={styles.link} key={family.id} onPress ={() => {familyManagerModal(family)}}> 
            <ThemedText> {family.name}  </ThemedText> 
            </Pressable>
          ))}
        </View>
      )}
      {families.length === 0 && (
        <Pressable style={styles.link} onPress={createFamilyModal}> 
          <FontAwesome6 name="plus" size={22} color="black" /><ThemedText> Blarg Create Family </ThemedText>
        </Pressable>
      )}


 <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalType("");
            setModalVisible(!modalVisible);
          }}>

            <Pressable
    style={styles.centeredView}
    onPress={() => {
      setModalType("");
      setModalVisible(false);
    }}
  >
   
    <Pressable
      onPress={(e) => e.stopPropagation()} 
    >
          
          <View >

               {modalType === "familyManager" && (
                <View style={styles.modalView}>
              <ThemedText> Create a Member for: {selectedFamily?.name} </ThemedText>
              <TextInput placeholder='Name' value={memberName} onChangeText={setMemberName} style={{ borderColor: 'white',borderWidth:1, padding: 10, marginBottom: 10, color: 'white', borderRadius: 8 }} />
              <TextInput placeholder='Age' value={memberAge} onChangeText={setMemberAge} keyboardType='numeric' style={{ borderColor: 'white',borderWidth:1, padding: 10, marginBottom: 10, color: 'white', borderRadius: 8 }} />
              <TextInput placeholder='Weight' value={memberWeight} onChangeText={setMemberWeight} keyboardType='numeric' style={{ borderColor: 'white',borderWidth:1, padding: 10, marginBottom: 10, color: 'white', borderRadius: 8 }} />
              <View style={{ flexDirection:'row', alignItems:'center', gap:10 }}> 
                <ThemedText> Height: </ThemedText>
              <TextInput placeholder='0' value={memberHeight} maxLength={1} onChangeText={setMemberHeight} keyboardType='numeric' style={{ borderColor: 'white', borderWidth: 1, padding: 10, marginBottom: 10, color: 'white', borderRadius: 8 }} />
              <ThemedText> ft </ThemedText><TextInput placeholder='0' value={memberInches} onChangeText={setMemberInches} keyboardType='numeric' style={{ borderColor: 'white', borderWidth:1, padding: 10, marginBottom: 10, color: 'white' }} />
              <ThemedText> in </ThemedText></View>
              <Pressable onPress={handleCreateMembers} style={{borderColor: 'white',borderWidth:1, padding: 10}}>
                <ThemedText>Create Member</ThemedText>
              </Pressable>
              </View>)}

               {modalType === "createFamily" && (
                <View style={styles.modalView}>
                
              <TextInput placeholder='Family Name' value={familyName} onChangeText={setFamilyName} style={{ backgroundColor: 'black', padding: 10, marginBottom: 10, color: 'black' }} />
              <Pressable onPress={handleCreateFamily}>
                <ThemedText>Create Family</ThemedText>
              </Pressable>
              </View>)} 


          </View>
          
          </Pressable>
          </Pressable>
        </Modal>

      <Pressable style={styles.link} onPress={handleSignOut}>
        <ThemedText>Sign Out</ThemedText>
      </Pressable>
    </ThemedView>) : (
      <>
    <ThemedView style={styles.container}>
      <ThemedText type="title">Family</ThemedText>
      <ThemedText>This is the Family screen.</ThemedText>
      <Pressable style={styles.link} onPress={() => router.push('/(auth)/login')}>
        <ThemedText>Press me</ThemedText>
      </Pressable>
    </ThemedView>
    </>
    )
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  link: {
    marginTop: 15,
    paddingVertical: 15,
  },

  centeredView: {
    flex: 1,
    backgroundColor: "rgba(73, 73, 73, 0.67)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "rgb(23, 21, 21)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
