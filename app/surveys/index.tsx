'use client';

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { SURVEYS } from '../data/surveys';
import { SurveyList } from '../components/SurveyList';
import { SurveyFilters } from '../components/SurveyFilters';
import { SurveyType } from '../types/survey';

export default function SurveysScreen() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState<SurveyType | 'all'>('all');

    const filteredSurveys = SURVEYS.filter(survey => {
        const matchesCategory = selectedCategory === 'all' || survey.category === selectedCategory;
        const matchesType = selectedType === 'all' || survey.type === selectedType;
        return matchesCategory && matchesType;
    });

    const handleVote = (surveyId: string, optionId: string) => {
        // В реальном приложении здесь будет API-запрос
        console.log('Vote:', { surveyId, optionId });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color="#0f172a" />
                </Pressable>
                <Text style={styles.headerTitle}>Опросы жителей</Text>
                <Pressable 
                    onPress={() => router.push('/surveys/create')}
                    style={styles.createButton}
                >
                    <Plus size={24} color="#0891b2" />
                </Pressable>
            </View>

            <SurveyFilters
                selectedCategory={selectedCategory}
                selectedType={selectedType}
                onCategoryChange={setSelectedCategory}
                onTypeChange={setSelectedType}
            />

            <SurveyList
                surveys={filteredSurveys}
                onVote={handleVote}
            />
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
    createButton: {
        padding: 8,
    },
}); 