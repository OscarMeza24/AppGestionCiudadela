import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const stats: StatCard[] = [
    { title: 'Visitantes Hoy', value: '12', icon: 'person.fill', color: '#4ECDC4' },
    { title: 'Alertas', value: '2', icon: 'exclamationmark.circle.fill', color: '#FF6B6B' },
    { title: 'Residentes', value: '487', icon: 'house.fill', color: '#95E1D3' },
    { title: 'Eventos', value: '8', icon: 'calendar', color: '#F38181' },
  ];

  const recentActivities = [
    { time: '14:30', event: 'Visitante registrado - Puerta A', icon: 'person.badge.plus', type: 'visitor' },
    { time: '13:15', event: 'Alerta de seguridad - Cámara 3', icon: 'camera.badge.ellipsis', type: 'alert' },
    { time: '12:45', event: 'Paquete entregado - Recepción', icon: 'shippingbox.fill', type: 'delivery' },
    { time: '11:20', event: 'Acceso al área común', icon: 'figure.walk', type: 'activity' },
  ];

  const StatCard = ({ stat }: { stat: StatCard }) => (
    <Pressable
      style={({ pressed }) => [
        styles.statCard,
        { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
        pressed && styles.statCardPressed,
      ]}>
      <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
        <IconSymbol size={24} name={stat.icon as any} color={stat.color} />
      </View>
      <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
      <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <ThemedText style={styles.greeting}>Buenos días</ThemedText>
            <ThemedText type="title" style={styles.headerTitle}>
              Control de Ciudadela
            </ThemedText>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <ThemedText style={styles.statusText}>En línea</ThemedText>
          </View>
        </View>

        {/* Alert Banner */}
        <Pressable
          style={({ pressed }) => [
            styles.alertBanner,
            pressed && styles.alertBannerPressed,
          ]}>
          <IconSymbol size={24} name="exclamationmark.triangle.fill" color="#FF6B6B" />
          <View style={styles.alertContent}>
            <ThemedText style={styles.alertTitle}>2 alertas pendientes</ThemedText>
            <ThemedText style={styles.alertSubtitle}>Revisa los reportes de seguridad</ThemedText>
          </View>
          <IconSymbol size={20} name="chevron.right" color="#999" />
        </Pressable>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </View>

        {/* Recent Activity Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>📊 Actividad Reciente</ThemedText>

          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.timelineIndicator}>
                <View
                  style={[
                    styles.timelineIcon,
                    {
                      backgroundColor:
                        activity.type === 'alert'
                          ? '#FF6B6B20'
                          : activity.type === 'delivery'
                          ? '#4ECDC420'
                          : activity.type === 'visitor'
                          ? '#95E1D320'
                          : '#F3818120',
                    },
                  ]}>
                  <IconSymbol
                    size={16}
                    name={activity.icon as any}
                    color={
                      activity.type === 'alert'
                        ? '#FF6B6B'
                        : activity.type === 'delivery'
                        ? '#4ECDC4'
                        : activity.type === 'visitor'
                        ? '#95E1D3'
                        : '#F38181'
                    }
                  />
                </View>
                {index < recentActivities.length - 1 && <View style={styles.timelineLine} />}
              </View>

              <View style={styles.activityContent}>
                <ThemedText style={styles.activityEvent}>{activity.event}</ThemedText>
                <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>⚡ Acciones Rápidas</ThemedText>

          <View style={styles.quickActionsGrid}>
            <Pressable
              style={({ pressed }) => [
                styles.quickAction,
                { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                pressed && styles.quickActionPressed,
              ]}>
              <IconSymbol size={28} name="bell.fill" color="#FF6B6B" />
              <ThemedText style={styles.quickActionText}>Reportar</ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.quickAction,
                { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                pressed && styles.quickActionPressed,
              ]}>
              <IconSymbol size={28} name="phone.fill" color="#4ECDC4" />
              <ThemedText style={styles.quickActionText}>Emergencia</ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.quickAction,
                { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                pressed && styles.quickActionPressed,
              ]}>
              <IconSymbol size={28} name="message.fill" color="#95E1D3" />
              <ThemedText style={styles.quickActionText}>Mensaje</ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.quickAction,
                { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                pressed && styles.quickActionPressed,
              ]}>
              <IconSymbol size={28} name="gearshape.fill" color="#F38181" />
              <ThemedText style={styles.quickActionText}>Configurar</ThemedText>
            </Pressable>
          </View>
        </View>
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
  greeting: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#4ECDC420',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FF6B6B20',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    marginBottom: 20,
  },
  alertBannerPressed: {
    backgroundColor: '#FF6B6B30',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: '600',
    marginBottom: 2,
    color: '#FF6B6B',
  },
  alertSubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardPressed: {
    opacity: 0.7,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  timelineIndicator: {
    alignItems: 'center',
  },
  timelineIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    height: 32,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    marginTop: 4,
  },
  activityContent: {
    flex: 1,
    paddingTop: 4,
  },
  activityEvent: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    opacity: 0.5,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickAction: {
    width: '48%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quickActionPressed: {
    opacity: 0.7,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
