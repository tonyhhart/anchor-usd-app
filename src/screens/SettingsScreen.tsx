import * as React from 'react';
import { StyleSheet, ListRenderItemInfo, SectionList, SectionListData, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ListItem from 'components/ListItem';
import ListSubheader from 'components/ListSubheader';
import Metrics from 'constants/Metrics';
import { logout, selecUser } from 'store';
import { SettingsSectionData, SettingsItem, SettingsSection } from 'types';

export default function ExploreScreen() {
  const dispatch = useDispatch();
  const user = useSelector(selecUser);

  const DATA: SettingsSectionData = [
    {
      title: 'Friends',
      data: [
        {
          title: 'Invite Friends',
          description: 'Share via email, text, or social media',
          icon: 'account-plus',
        },
        {
          title: 'Move',
          description: 'Let friends find you by phone or email',
          icon: 'account-multiple',
        },
      ],
    },
    {
      title: 'Earn',
      data: [
        {
          title: 'Interest',
          description: 'Earn interest on USD and crypto',
          icon: 'chart-donut',
        },
        {
          title: 'Auto invest',
          description: 'Schedule automatic purchases or deposits',
          icon: 'update',
        },
      ],
    },
    {
      title: 'Verification',
      data: [
        {
          title: 'Verification Levels',
          description: 'Get verified for deposits and withdrawals',
          icon: 'checkbox-marked-outline',
        },
      ],
    },
    {
      title: 'Security and Alerts',
      data: [
        {
          title: 'Two Factor Authentication',
          description: 'Scan the following QR Code',
          icon: 'fullscreen',
        },
        {
          title: 'Security Lock',
          description: 'Require PIN or Face ID for Transactions',
          icon: 'lock-outline',
        },
        {
          title: 'Notifications',
          description: 'Configure notifications and alerts',
          icon: 'bell',
        },
      ],
    },
    {
      title: 'Payment Methods',
      data: [
        {
          title: 'Linked Bank Accounts',
          description: 'For deposits and withdrawals',
          icon: 'bank-outline',
        },
        {
          title: 'Credit / Debit Cards',
          description: 'Best for small purchases',
          icon: 'credit-card-outline',
        },
        {
          title: 'Notifications',
          description: 'Configure notifications and alerts',
          icon: 'bell',
        },
      ],
    },
    {
      title: 'Support',
      data: [
        {
          title: 'Contact Support',
          description: 'Get help, or share feedback',
          icon: 'message-outline',
        },
      ],
    },
  ];

  function renderItem({ item }: ListRenderItemInfo<SettingsItem>) {
    return <ListItem {...item} />;
  }

  function renderListHeaderComponent() {
    return <ListItem size="large" title={user.email} description="Verification Level 1" />;
  }

  function renderSectionHeader(data: { section: SectionListData<SettingsItem, SettingsSection> }) {
    return <ListSubheader>{data.section.title}</ListSubheader>;
  }

  function renderListFooterComponent() {
    return (
      <View style={styles.logout}>
        <ListItem destructive title="Log out" onPress={() => dispatch(logout())} />
      </View>
    );
  }

  function keyExtractor(_: SettingsItem, index: number) {
    return index.toString();
  }

  return (
    <SectionList
      contentContainerStyle={styles.list}
      sections={DATA}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={renderListHeaderComponent}
      ListFooterComponent={renderListFooterComponent}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: Metrics.base * 2,
  },
  logout: {
    marginTop: Metrics.base * 2,
  },
});
