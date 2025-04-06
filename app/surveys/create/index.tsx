'use client';

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react-native';
import { SURVEY_CATEGORIES } from '../../data/surveys';
import { SurveyType } from '../../types/survey';

interface SurveyOption {
    id: string;
    text: string;
}

export default function CreateSurveyScreen() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<SurveyType>('user');
    const [options, setOptions] = useState<SurveyOption[]>([
        { id: '1', text: '' },
        { id: '2', text: '' }
    ]);

    const handleAddOption = () => {
        setOptions([...options, { id: String(options.length + 1), text: '' }]);
    };

    const handleRemoveOption = (id: string) => {
        if (options.length <= 2) return;
        setOptions(options.filter(option => option.id !== id));
    };

    const handleOptionChange = (id: string, text: string) => {
        setOptions(options.map(option =>
            option.id === id ? { ...option, text } : option
        ));
    };

    const handleSubmit = () => {
        // В реальном приложении здесь будет API-запрос
        console.log({
            title,
            description,
            category,
            type,
            options
        });
        router.back();
    };

    const isValid = title.trim() && description.trim() && category && 
        options.length >= 2 && options.every(option => option.text.trim());

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color="#0f172a" />
                </Pressable>
                <Text style={styles.headerTitle}>Создать опрос</Text>
                <Pressable 
                    style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                >
                    <Text style={[styles.submitButtonText, !isValid && styles.submitButtonTextDisabled]}>
                        Создать
                    </Text>
                </Pressable>
            </View>

            <ScrollView style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Название опроса"
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor="#94a3b8"
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Описание опроса"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    placeholderTextColor="#94a3b8"
                />

                <Text style={styles.sectionTitle}>Категория</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                >
                    {SURVEY_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                        <Pressable
                            key={c.id}
                            style={[
                                styles.categoryButton,
                                category === c.id && styles.categoryButtonActive
                            ]}
                            onPress={() => setCategory(c.id)}
                        >
                            <Text style={[
                                styles.categoryText,
                                category === c.id && styles.categoryTextActive
                            ]}>
                                {c.name}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Тип опроса</Text>
                <View style={styles.typeButtons}>
                    <Pressable
                        style={[
                            styles.typeButton,
                            type === 'user' && styles.typeButtonActive,
                            { marginRight: 8 }
                        ]}
                        onPress={() => setType('user')}
                    >
                        <Text style={[
                            styles.typeText,
                            type === 'user' && styles.typeTextActive
                        ]}>
                            От жителя
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.typeButton,
                            type === 'government' && styles.typeButtonActive
                        ]}
                        onPress={() => setType('government')}
                    >
                        <Text style={[
                            styles.typeText,
                            type === 'government' && styles.typeTextActive
                        ]}>
                            От организации
                        </Text>
                    </Pressable>
                </View>

                <Text style={styles.sectionTitle}>Варианты ответов</Text>
                {options.map((option, index) => (
                    <View key={option.id} style={styles.optionContainer}>
                        <TextInput
                            style={[styles.input, styles.optionInput]}
                            placeholder={`Вариант ${index + 1}`}
                            value={option.text}
                            onChangeText={(text) => handleOptionChange(option.id, text)}
                            placeholderTextColor="#94a3b8"
                        />
                        {options.length > 2 && (
                            <Pressable
                                style={styles.removeButton}
                                onPress={() => handleRemoveOption(option.id)}
                            >
                                <Trash2 size={20} color="#ef4444" />
                            </Pressable>
                        )}
                    </View>
                ))}

                <Pressable
                    style={styles.addButton}
                    onPress={handleAddOption}
                >
                    <Plus size={20} color="#0891b2" />
                    <Text style={styles.addButtonText}>Добавить вариант</Text>
                </Pressable>
            </ScrollView>
        </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0f172a',
    },
    submitButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#0891b2',
        borderRadius: 8,
    },
    submitButtonDisabled: {
        backgroundColor: '#e2e8f0',
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    submitButtonTextDisabled: {
        color: '#94a3b8',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#0f172a',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 12,
    },
    categoryScroll: {
        marginBottom: 24,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: '#f1f5f9',
    },
    categoryButtonActive: {
        backgroundColor: '#0891b2',
    },
    categoryText: {
        fontSize: 14,
        color: '#64748b',
    },
    categoryTextActive: {
        color: '#ffffff',
    },
    typeButtons: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        alignItems: 'center',
    },
    typeButtonActive: {
        backgroundColor: '#0891b2',
    },
    typeText: {
        fontSize: 14,
        color: '#64748b',
    },
    typeTextActive: {
        color: '#ffffff',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    optionInput: {
        flex: 1,
        marginBottom: 8,
    },
    removeButton: {
        padding: 8,
        marginLeft: 8,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#f0f9ff',
        borderRadius: 8,
        marginBottom: 24,
    },
    addButtonText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#0891b2',
        fontWeight: '600',
    },
}); 