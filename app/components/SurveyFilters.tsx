import React from 'react';
import { ScrollView, StyleSheet, Pressable, Text, View } from 'react-native';
import { SURVEY_CATEGORIES } from '../data/surveys';
import { SurveyType } from '../types/survey';

interface SurveyFiltersProps {
    selectedCategory: string;
    selectedType: SurveyType | 'all';
    onCategoryChange: (category: string) => void;
    onTypeChange: (type: SurveyType | 'all') => void;
}

export const SurveyFilters: React.FC<SurveyFiltersProps> = ({
    selectedCategory,
    selectedType,
    onCategoryChange,
    onTypeChange,
}) => {
    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.categoryScroll}
                contentContainerStyle={styles.categoryContent}
            >
                {SURVEY_CATEGORIES.map((category) => (
                    <Pressable
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.id && styles.categoryButtonActive,
                        ]}
                        onPress={() => onCategoryChange(category.id)}
                    >
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category.id && styles.categoryTextActive,
                        ]}>
                            {category.name}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={styles.typeFilters}>
                <Pressable
                    style={[
                        styles.typeButton,
                        selectedType === 'all' && styles.typeButtonActive,
                    ]}
                    onPress={() => onTypeChange('all')}
                >
                    <Text style={[
                        styles.typeText,
                        selectedType === 'all' && styles.typeTextActive,
                    ]}>
                        Все опросы
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.typeButton,
                        selectedType === 'government' && styles.typeButtonActive,
                    ]}
                    onPress={() => onTypeChange('government')}
                >
                    <Text style={[
                        styles.typeText,
                        selectedType === 'government' && styles.typeTextActive,
                    ]}>
                        Государственные
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.typeButton,
                        selectedType === 'user' && styles.typeButtonActive,
                    ]}
                    onPress={() => onTypeChange('user')}
                >
                    <Text style={[
                        styles.typeText,
                        selectedType === 'user' && styles.typeTextActive,
                    ]}>
                        От жителей
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingVertical: 12,
    },
    categoryScroll: {
        marginBottom: 12,
    },
    categoryContent: {
        paddingHorizontal: 16,
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
    typeFilters: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 8,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
    },
    typeButtonActive: {
        backgroundColor: '#0891b2',
    },
    typeText: {
        fontSize: 12,
        color: '#64748b',
    },
    typeTextActive: {
        color: '#ffffff',
    },
}); 