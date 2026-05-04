import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Alert {
  id: string;
  type: 'security' | 'maintenance' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  read: boolean;
}

export default function AlertsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'security',
      title: 'Acceso no autorizado detectado',
      description: 'Intento de acceso a puerta de servicio - Sector C',
      time: 'Hace 15 min',
      severity: 'critical',
      read: false,
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'Mantenimiento en ascensor 3',
      description: 'Programado para el 10 de mayo - 10:00 AM',
      time: 'Hace 2 horas',
      severity: 'medium',
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Aviso de corte de agua',
      description: 'Suspensión de servicio por 4 horas - Sector A y B',
      time: 'Hace 4 horas',
      severity: 'high',
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Reunión junta directiva',
      description: 'Próxima reunión el 15 de mayo a las 7:00 PM',
      time: 'Ayer',
      severity: 'low',
      read: true,
    },
  ]);

  const getTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'security':
        return '#FF6B6B';
      case 'maintenance':
        return '#4ECDC4';
      case 'warning':
        return '#FFB84D';
      case 'info':
        return '#95E1D3';
      default:
        return '#999';
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'security':
        return 'shield.trianglebadge.exclamationmark.fill';
      case 'maintenance':
        return 'wrench.and.screwdriver.fill';
      case 'warning':
        return 'exclamationmark.triangle.fill';
      case 'info':
        return 'info.circle.fill';
      default:
        return 'bell.fill';
    }
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  const AlertItem = ({ item }: { item: Alert }) => {
    const color = getTypeColor(item.type);
    return (
      <Pressable
        onPress={() => {
          setAlerts(
            alerts.map((a) => (a.id === item.id ? { ...a, read: true } : a))
          );
        }}
        style={({ pressed }) => [
          styles.alertItem,
          {
            backgroundColor: item.read
              ? isDark
                ? '#2A2A2A'
                : '#F8F8F8'
              : isDark
              ? '#1A3A3A'
              : '#E8F8F7',
            borderLeftColor: color,
          },
          pressed && styles.alertItemPressed,
        ]}>
        <View style={[styles.alertIconContainer, { backgroundColor: color + '20' }]}>
          <IconSymbol size={22} name={getTypeIcon(item.type) as any} color={color} />
        </View>

        <View style={styles.alertContent}>
          <View style={styles.alertHeader}>
            <ThemedText style={styles.alertTitle} numberOfLines={1}>
              {item.title}
            </ThemedText>
            {!item.read && <View style={[styles.unreadDot, { backgroundColor: color }]} />}
          </View>
          <ThemedText style={styles.alertDescription} numberOfLines={1}>
            {item.description}
          </ThemedText>
          <ThemedText style={styles.alertTime}>{item.time}</ThemedText>
        </View>

        <Pressable style={styles.alertAction}>
          <IconSymbol size={18} name="chevron.right" color="#999" />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <ThemedText type="title" style={styles.headerTitle}>
              Alertas
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {unreadCount} nuevas notificaciones
            </ThemedText>
          </View>
          <View style={styles.headerAction}>
            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                pressed && styles.iconButtonPressed,
              ]}>
              <IconSymbol size={24} name="checkmark" color="#4ECDC4" />
            </Pressable>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabsWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            scrollEventThrottle={16}
            style={styles.filterTabs}>
            {['Todas', 'Seguridad', 'Mantenimiento', 'Avisos'].map((filter, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.filterTab,
                  index === 0 && styles.filterTabActive,
                  pressed && styles.filterTabPressed,
                ]}>
                <ThemedText
                  style={[
                    styles.filterTabText,
                    index === 0 && styles.filterTabTextActive,
                  ]}>
                  {filter}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <IconSymbol size={20} name="exclamationmark.circle.fill" color="#FF6B6B" />
            <ThemedText style={styles.statValue}>3</ThemedText>
            <ThemedText style={styles.statLabel}>Críticas</ThemedText>
          </View>
          <View style={styles.statBox}>
            <IconSymbol size={20} name="exclamationmark.triangle.fill" color="#FFB84D" />
            <ThemedText style={styles.statValue}>8</ThemedText>
            <ThemedText style={styles.statLabel}>Altas</ThemedText>
          </View>
          <View style={styles.statBox}>
            <IconSymbol size={20} name="info.circle.fill" color="#4ECDC4" />
            <ThemedText style={styles.statValue}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Medias</ThemedText>
          </View>
        </View>

        {/* Alerts List */}
        <View style={styles.alertsContainer}>
          <FlatList
            data={alerts}
            renderItem={AlertItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* Bottom Action */}
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}>
          <IconSymbol size={20} name="archivebox.fill" color="#fff" />
          <ThemedText style={styles.actionButtonText}>Archivar todas</ThemedText>
        </Pressable>
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
    paddingTop: 16,
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },
  headerAction: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  filterTabs: {
    paddingHorizontal: 16,
  },
  filterTabsWrapper: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#4ECDC4',
  },
  filterTabPressed: {
    opacity: 0.7,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.6,
  },
  alertsContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  alertItemPressed: {
    opacity: 0.8,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 11,
    opacity: 0.4,
  },
  alertAction: {
    paddingLeft: 8,
  },
  separator: {
    height: 0,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#4ECDC4',
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
