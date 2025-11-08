import Chat from "@/components/chat";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    console.log('Message sent:', message);
    // TODO: Implement actual message sending logic here
    setMessage(''); // Clear the input after sending
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Chat/>
      <View style={styles.bottomContainer}>
        <TextInput
          onChangeText={setMessage} // Update the state as the user types
          value={message} // The current value of the text input
          placeholder="Send a message" // Placeholder text when the input is empty
          keyboardType="default" // Specifies the type of keyboard to open (e.g., "numeric", "email-address")
          style={styles .textBox} // Apply styles to the TextInput
          onSubmitEditing={sendMessage} // Handle the press event
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonLabel}>Send</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    height: 70,
  },
  textBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    marginHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 3,
    backgroundColor: 'pink',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: 'black',
    fontSize: 16,
  },
})
