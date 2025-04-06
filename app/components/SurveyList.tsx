import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Survey } from '../types/survey';
import { SurveyCard } from './SurveyCard';

interface SurveyListProps {
    surveys: Survey[];
    onVote: (surveyId: string, optionId: string) => void;
}

export const SurveyList: React.FC<SurveyListProps> = ({ surveys, onVote }) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {surveys.map((survey) => (
                    <SurveyCard
                        key={survey.id}
                        survey={survey}
                        onVote={onVote}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
}); 