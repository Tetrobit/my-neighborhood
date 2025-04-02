import { View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatName, setChatName] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Здесь в реальном приложении мы бы загрузили данные чата с сервера
    // Сейчас используем моковые данные
    const mockChats: Record<string, string> = {
      '1': 'Администрация района',
      '2': 'Служба поддержки',
      '3': 'Новости района'
    };
    const chatId = Array.isArray(id) ? id[0] : id;
    setChatName(mockChats[chatId] || 'Чат');

    // Анимация появления экрана
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Загрузка истории сообщений
    const mockMessages: Message[] = [
      {
        id: 1,
        text: 'Здравствуйте! Чем могу помочь?',
        isUser: false,
        timestamp: '10:30',
      },
      {
        id: 2,
        text: 'Добрый день! У меня вопрос по поводу субботника',
        isUser: true,
        timestamp: '10:31',
      },
      {
        id: 3,
        text: 'Конечно, я готов ответить на ваши вопросы',
        isUser: false,
        timestamp: '10:32',
      },
    ];
    setMessages(mockMessages);
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Автоматический ответ
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: 'Спасибо за ваше сообщение. Мы рассмотрим его в ближайшее время.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Animated.View 
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.otherMessage,
        { opacity: fadeAnim }
      ]}
    >
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.otherBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>{chatName}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Введите сообщение..."
          placeholderTextColor="#94a3b8"
          multiline
        />
        <Pressable 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Send size={24} color={message.trim() ? "#0891b2" : "#94a3b8"} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#0891b2',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#64748b',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
}); 