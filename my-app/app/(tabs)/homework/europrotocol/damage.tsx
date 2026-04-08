import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';

export default function DamageScreen() {
  const router = useRouter();
  const ref = useRef(null);
  
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleFinish = () => {
    Alert.alert("Успіх", "Європротокол успішно оформлено!", [
      { text: "ОК", onPress: () => router.dismissAll() }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView 
        style={styles.container} 
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText type="subtitle" style={styles.header}>Вид пошкодження</ThemedText>
        <TextInput 
          style={styles.input} 
          placeholder="Сторона пошкодження (напр. Лівий бампер)" 
        />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Короткий опис" 
          multiline={true} 
        />

        <ThemedText type="subtitle" style={styles.header}>Ескіз ДТП</ThemedText>
        
        <View style={styles.canvasContainer}>
          <SignatureScreen
            ref={ref}
            onOK={handleFinish}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            webStyle={`.m-signature-pad--footer { display: none; margin: 0; }`}
            descriptionText="Намалюйте ескіз ДТП тут"
          />
        </View>

        <TouchableOpacity 
          style={styles.mainFinishButton} 
          onPress={handleFinish}
        >
          <ThemedText style={styles.buttonText}>ЗАВЕРШИТИ ОФОРМЛЕННЯ</ThemedText>
        </TouchableOpacity>
        
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  header: { 
    marginBottom: 10, 
    color: '#000', 
    marginTop: 10,
    fontWeight: 'bold'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    fontSize: 16 
  },
  textArea: { 
    height: 100, 
    textAlignVertical: 'top' 
  },
  canvasContainer: { 
    height: 300, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    overflow: 'hidden', 
    marginBottom: 20 
  },
  mainFinishButton: { 
    backgroundColor: '#28a745', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});