import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface Document {
  id: string;
  uri: string;
  name: string;
  type: 'incident' | 'visitor' | 'maintenance';
  timestamp: Date;
  description: string;
}

export default function GestionScreen() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<'incident' | 'visitor' | 'maintenance'>('incident');

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.status !== 'granted' || galleryPermission.status !== 'granted') {
      Alert.alert(
        'Permisos requeridos',
        'Se necesitan permisos de cámara y galería para esta funcionalidad',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const captureFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled) {
        const newDocument: Document = {
          id: `doc-${Date.now()}`,
          uri: result.assets[0].uri,
          name: `${getTypeLabel(selectedType)}-${new Date().toLocaleTimeString('es-ES')}`,
          type: selectedType,
          timestamp: new Date(),
          description: `Capturado con cámara - ${getTypeLabel(selectedType)}`,
        };
        setDocuments([newDocument, ...documents]);
        Alert.alert('✅ Éxito', `${getTypeLabel(selectedType)} capturado exitosamente`);
      }
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo capturar la imagen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled) {
        const newDocuments = result.assets.map((asset, index) => ({
          id: `doc-${Date.now()}-${index}`,
          uri: asset.uri,
          name: `${getTypeLabel(selectedType)}-${new Date().toLocaleTimeString('es-ES')}`,
          type: selectedType,
          timestamp: new Date(),
          description: `De galería - ${getTypeLabel(selectedType)}`,
        } as Document));
        setDocuments([...newDocuments, ...documents]);
        Alert.alert('✅ Éxito', `${newDocuments.length} ${getTypeLabel(selectedType).toLowerCase()}(s) agregado(s) exitosamente`);
      }
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo seleccionar la imagen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = (id: string) => {
    Alert.alert(
      '🗑️ Eliminar documento',
      '¿Estás seguro de que deseas eliminar este documento?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            setDocuments(documents.filter((doc) => doc.id !== id));
            Alert.alert('✅ Éxito', 'Documento eliminado');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'incident':
        return 'exclamationmark.triangle.fill';
      case 'visitor':
        return 'person.badge.plus.fill';
      case 'maintenance':
        return 'wrench.and.screwdriver.fill';
    }
  };

  const getTypeColor = (type: Document['type']) => {
    switch (type) {
      case 'incident':
        return '#FF6B6B';
      case 'visitor':
        return '#4ECDC4';
      case 'maintenance':
        return '#FFB84D';
    }
  };

  const getTypeLabel = (type: Document['type']) => {
    switch (type) {
      case 'incident':
        return 'Incidente';
      case 'visitor':
        return 'Visitante';
      case 'maintenance':
        return 'Mantenimiento';
    }
  };

  const DocumentItem = ({ item }: { item: Document }) => (
    <Pressable
      style={({ pressed }) => [
        styles.documentCard,
        pressed && styles.documentCardPressed,
      ]}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.uri }} style={styles.documentThumbnail} />
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
          <IconSymbol size={14} name={getTypeIcon(item.type) as any} color="#fff" />
        </View>
      </View>

      <View style={styles.documentInfo}>
        <ThemedText style={styles.documentName} numberOfLines={1}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.documentType}>
          {getTypeLabel(item.type)}
        </ThemedText>
        <ThemedText style={styles.documentDescription} numberOfLines={1}>
          {item.description}
        </ThemedText>
        <ThemedText style={styles.documentTime}>
          {item.timestamp.toLocaleString('es-ES')}
        </ThemedText>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteDocument(item.id)}>
        <View style={styles.deleteIconContainer}>
          <IconSymbol size={20} name="trash.fill" color="#FF6B6B" />
        </View>
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerIconContainer}>
            <IconSymbol size={40} name="doc.badge.gearshape.fill" color="#4ECDC4" />
          </View>
          <ThemedText type="title" style={styles.mainTitle}>
            Gestión de
          </ThemedText>
          <ThemedText type="title" style={[styles.mainTitle, styles.titleHighlight]}>
            Documentos
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Registra incidentes, visitantes y mantenimiento
          </ThemedText>
        </View>

        {/* Type Selection */}
        <View style={styles.typeSelector}>
          {(['incident', 'visitor', 'maintenance'] as const).map((type) => (
            <Pressable
              key={type}
              onPress={() => setSelectedType(type)}
              style={({ pressed }) => [
                styles.typeButton,
                selectedType === type && [
                  styles.typeButtonActive,
                  { backgroundColor: getTypeColor(type) },
                ],
                pressed && styles.typeButtonPressed,
              ]}>
              <IconSymbol
                size={18}
                name={getTypeIcon(type) as any}
                color={selectedType === type ? '#fff' : getTypeColor(type)}
              />
              <ThemedText
                style={[
                  styles.typeButtonText,
                  selectedType === type && styles.typeButtonTextActive,
                ]}>
                {getTypeLabel(type)}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            onPress={captureFromCamera}
            disabled={loading}
            style={({ pressed }) => [
              styles.actionButton,
              styles.cameraButton,
              pressed && styles.actionButtonPressed,
            ]}>
            {loading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <>
                <View style={styles.buttonIconContainer}>
                  <IconSymbol size={28} name="camera.fill" color="#fff" />
                </View>
                <View>
                  <ThemedText style={styles.buttonMainText}>Capturar Foto</ThemedText>
                  <ThemedText style={styles.buttonSubText}>Con cámara del dispositivo</ThemedText>
                </View>
              </>
            )}
          </Pressable>

          <Pressable
            onPress={selectFromGallery}
            disabled={loading}
            style={({ pressed }) => [
              styles.actionButton,
              styles.galleryButton,
              pressed && styles.actionButtonPressed,
            ]}>
            {loading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <>
                <View style={styles.buttonIconContainer}>
                  <IconSymbol size={28} name="photo.stack.fill" color="#fff" />
                </View>
                <View>
                  <ThemedText style={styles.buttonMainText}>Seleccionar</ThemedText>
                  <ThemedText style={styles.buttonSubText}>De la galería</ThemedText>
                </View>
              </>
            )}
          </Pressable>
        </View>

        {/* Documents List */}
        {documents.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconContainer}>
              <IconSymbol size={80} name="doc.on.doc" color="#4ECDC4" />
            </View>
            <ThemedText style={styles.emptyText}>Sin documentos</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Comienza capturando fotos de incidentes, visitantes o mantenimiento
            </ThemedText>
          </View>
        ) : (
          <View style={styles.documentsSection}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                📁 Documentos registrados ({documents.length})
              </ThemedText>
            </View>

            <View style={styles.listContent}>
              {documents.map((doc) => (
                <DocumentItem key={doc.id} item={doc} />
              ))}
            </View>

            {documents.length > 0 && (
              <Pressable
                onPress={() => {
                  Alert.alert(
                    '⚠️ Limpiar todo',
                    '¿Deseas eliminar todos los documentos?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Eliminar todo',
                        onPress: () => {
                          setDocuments([]);
                          Alert.alert('✅ Éxito', 'Todos los documentos fueron eliminados');
                        },
                        style: 'destructive',
                      },
                    ]
                  );
                }}
                style={({ pressed }) => [
                  styles.clearButton,
                  pressed && styles.clearButtonPressed,
                ]}>
                <IconSymbol size={20} name="trash.fill" color="#FF6B6B" />
                <ThemedText style={styles.clearButtonText}>Limpiar todo</ThemedText>
              </Pressable>
            )}
          </View>
        )}

        {/* Stats */}
        {documents.length > 0 && (
          <View style={styles.statsContainer}>
            <ThemedText style={styles.statsTitle}>📊 Estadísticas</ThemedText>
            <View style={styles.statsGrid}>
              {(['incident', 'visitor', 'maintenance'] as const).map((type) => {
                const count = documents.filter((d) => d.type === type).length;
                return (
                  <View key={type} style={styles.statItem}>
                    <IconSymbol size={24} name={getTypeIcon(type) as any} color={getTypeColor(type)} />
                    <ThemedText style={styles.statCount}>{count}</ThemedText>
                    <ThemedText style={styles.statLabel}>{getTypeLabel(type)}</ThemedText>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },

  // Header Styles
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  titleHighlight: {
    color: '#4ECDC4',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },

  // Type Selector
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 200, 0.2)',
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  typeButtonPressed: {
    opacity: 0.7,
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },

  // Action Buttons Styles
  actionContainer: {
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    minHeight: 90,
  },
  actionButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  cameraButton: {
    backgroundColor: '#FF6B6B',
  },
  galleryButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMainText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  buttonSubText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
  },

  // Documents Section
  documentsSection: {
    marginTop: 20,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    gap: 10,
  },

  // Document Card Styles
  documentCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
  },
  documentCardPressed: {
    backgroundColor: 'rgba(78, 205, 196, 0.05)',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  documentThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  typeBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  documentType: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 2,
  },
  documentDescription: {
    fontSize: 11,
    opacity: 0.5,
    marginBottom: 2,
  },
  documentTime: {
    fontSize: 10,
    opacity: 0.4,
  },
  deleteButton: {
    padding: 6,
  },
  deleteIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Empty State
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIconContainer: {
    marginBottom: 16,
    opacity: 0.3,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    opacity: 0.5,
    textAlign: 'center',
    maxWidth: '80%',
  },

  // Clear Button
  clearButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  clearButtonPressed: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
  },
  clearButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 13,
  },

  // Stats
  statsContainer: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 6,
  },
  statCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.6,
  },
});

