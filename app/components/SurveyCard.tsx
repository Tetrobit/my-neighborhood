import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Survey, SurveyOption } from '../types/survey';

interface SurveyCardProps {
    survey: Survey;
    onVote: (surveyId: string, optionId: string) => void;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onVote }) => {
    const getVotePercentage = (votes: number) => {
        return survey.totalVotes > 0 ? (votes / survey.totalVotes) * 100 : 0;
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{survey.title}</Text>
            <Text style={styles.type}>
                {survey.type === 'government' ? '🏛️ Государственный опрос' : '👤 Опрос жителя'}
            </Text>
            <Text style={styles.description}>{survey.description}</Text>
            
            {survey.options.map((option: SurveyOption) => (
                <View key={option.id} style={styles.optionContainer}>
                    <View style={styles.optionHeader}>
                        <Text style={styles.optionText}>{option.text}</Text>
                        <Text style={styles.percentage}>
                            {getVotePercentage(option.votes).toFixed(1)}%
                        </Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View 
                                style={[
                                    styles.progressFill,
                                    { width: `${getVotePercentage(option.votes)}%` }
                                ]} 
                            />
                        </View>
                        <Pressable 
                            style={styles.voteButton}
                            onPress={() => onVote(survey.id, option.id)}
                        >
                            <Text style={styles.voteButtonText}>Голосовать</Text>
                        </Pressable>
                    </View>
                </View>
            ))}
            
            <Text style={styles.totalVotes}>
                Всего голосов: {survey.totalVotes}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 8,
    },
    type: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 16,
    },
    optionContainer: {
        marginBottom: 12,
    },
    optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    optionText: {
        fontSize: 14,
        color: '#0f172a',
        flex: 1,
        marginRight: 8,
    },
    percentage: {
        fontSize: 14,
        color: '#64748b',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#0891b2',
        borderRadius: 2,
    },
    voteButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#0891b2',
    },
    voteButtonText: {
        fontSize: 12,
        color: '#0891b2',
        fontWeight: '500',
    },
    totalVotes: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 8,
    },
}); 