import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { CardSection } from './common';

const ChurchItem = (item) => (
    <CardSection>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
      <View style={{ paddingLeft: 10 }}>
        <Text h4>{item.churchName}</Text>
        <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5, justifyContent: 'flex-start' }}>
          <Text style={{ fontWeight: '700' }}>Mass Time:</Text>
          <FlatList
          data={item.massTimes}
          renderItem={(val) => (
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5, flexDirection: 'row',
             justifyContent: 'space-between' }}>
              <Text>{val}</Text><Icon name='clear' size={16} />
            </View>
          )}
          />
        </View>
      </View>
    </View>
    </CardSection>
  );

export default ChurchItem;
