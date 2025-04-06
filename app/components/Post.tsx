import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { Heart, MessageCircle, Share2, Building2, User as UserIcon } from 'lucide-react-native';
import { Post as PostType, User } from '../data/posts';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useRouter } from 'expo-router';

interface PostProps {
  post: PostType;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, text: string) => void;
  onShare?: (postId: string) => void;
}

export default function Post({ post, onLike, onComment, onShare }: PostProps) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const router = useRouter();

  const handleLike = () => {
    onLike?.(post.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment?.(post.id, commentText);
      setCommentText('');
      setIsCommenting(false);
    }
  };

  const handleShare = () => {
    onShare?.(post.id);
  };

  const navigateToProfile = (userId: string) => {
    router.push({
      pathname: '/(tabs)/profile/[id]',
      params: { id: userId }
    });
  };

  const navigateToChat = (targetUser: User) => {
    router.push({
      pathname: '/messages',
      params: { 
        userId: targetUser.id,
        userName: targetUser.name,
        userAvatar: targetUser.avatar,
        userType: targetUser.type
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateToProfile(post.author.id)}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
        </Pressable>
        <View style={styles.authorInfo}>
          <Pressable onPress={() => navigateToProfile(post.author.id)} style={styles.authorNameContainer}>
            <Text style={styles.authorName}>{post.author.name}</Text>
            {post.author.type === 'organization' ? (
              <Building2 size={16} color="#0891b2" />
            ) : (
              <UserIcon size={16} color="#64748b" />
            )}
          </Pressable>
          <Text style={styles.time}>
            {formatDistanceToNow(new Date(post.createdAt), { locale: ru, addSuffix: true })}
          </Text>
        </View>
        {post.author.type !== 'organization' && (
          <Pressable 
            onPress={() => navigateToChat(post.author)}
            style={({ pressed }) => [
              styles.messageButton,
              pressed && styles.messageButtonPressed
            ]}
          >
            <MessageCircle size={20} color="#0891b2" />
          </Pressable>
        )}
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} />
      )}

      <View style={styles.actions}>
        <Pressable onPress={handleLike} style={styles.actionButton}>
          <Heart 
            size={20} 
            color={post.isLiked ? '#ef4444' : '#64748b'}
            fill={post.isLiked ? '#ef4444' : 'none'}
          />
          <Text style={styles.actionText}>{post.likes}</Text>
        </Pressable>

        <Pressable onPress={() => setIsCommenting(!isCommenting)} style={styles.actionButton}>
          <MessageCircle size={20} color="#64748b" />
          <Text style={styles.actionText}>{post.comments.length}</Text>
        </Pressable>

        <Pressable onPress={handleShare} style={styles.actionButton}>
          <Share2 size={20} color="#64748b" />
        </Pressable>
      </View>

      {post.comments.length > 0 && (
        <View style={styles.comments}>
          {post.comments.map(comment => (
            <View key={comment.id} style={styles.comment}>
              <Pressable onPress={() => navigateToProfile(comment.user.id)} style={styles.commentAvatarContainer}>
                <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
              </Pressable>
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Pressable onPress={() => navigateToProfile(comment.user.id)}>
                    <View style={styles.commentAuthorContainer}>
                      <Text style={styles.commentAuthor}>{comment.user.name}</Text>
                      {comment.user.type === 'organization' ? (
                        <Building2 size={14} color="#0891b2" />
                      ) : (
                        <UserIcon size={14} color="#64748b" />
                      )}
                    </View>
                  </Pressable>
                  {comment.user.type !== 'organization' && (
                    <Pressable 
                      onPress={() => navigateToChat(comment.user)}
                      style={({ pressed }) => [
                        styles.commentMessageButton,
                        pressed && styles.commentMessageButtonPressed
                      ]}
                    >
                      <MessageCircle size={16} color="#0891b2" />
                    </Pressable>
                  )}
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentTime}>
                  {formatDistanceToNow(new Date(comment.createdAt), { locale: ru, addSuffix: true })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {isCommenting && (
        <View style={styles.commentInput}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Написать комментарий..."
            style={styles.input}
            multiline
          />
          <Pressable 
            onPress={handleComment}
            style={[
              styles.sendButton,
              { opacity: commentText.trim() ? 1 : 0.5 }
            ]}
            disabled={!commentText.trim()}
          >
            <Text style={styles.sendButtonText}>Отправить</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  time: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  content: {
    fontSize: 14,
    color: '#0f172a',
    lineHeight: 20,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 12,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
  },
  comments: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 12,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatarContainer: {
    marginRight: 8,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#64748b',
  },
  commentInput: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 12,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#0f172a',
    minHeight: 40,
    maxHeight: 120,
    marginBottom: 8,
  },
  sendButton: {
    backgroundColor: '#0891b2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  messageButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  messageButtonPressed: {
    backgroundColor: '#e2e8f0',
  },
  commentMessageButton: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  commentMessageButtonPressed: {
    backgroundColor: '#e2e8f0',
  },
}); 