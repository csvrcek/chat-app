import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [serverState, setServerState] = useState('Loading...');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  var ws = useRef(new WebSocket('ws://localhost:8080/ws')).current;

  useEffect(() => {
    const chatMessagesList: string[] = [];
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setServerState('Connected to server');
    }

    ws.onmessage = (event) => {
      chatMessagesList.push(event.data);
      setChatMessages([...chatMessagesList]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setServerState('Error connecting to server');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setServerState('Disconnected from server');
    };

    // Cleanup function to close the WebSocket when the component unmounts
    return () => {
      ws.close();
    };
  }, [])

  const sendMessage = () => {
    console.log('Message sent:', message);
    ws.send(message);
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
      <ScrollView>
            <Text>{serverState}</Text>
      </ScrollView>
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
