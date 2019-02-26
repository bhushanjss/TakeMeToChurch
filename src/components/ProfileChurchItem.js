import React from 'react';
import { View, FlatList, Picker } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection } from './common';

const ChurchItem = ({item}) => (
  <CardSection>
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={{ paddingLeft: 10 }}>
          <Text h4>{item.churchName}</Text>
          <View style={{ flex: 1, paddingBottom: 5, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '700' }}>Mass Time:</Text>
            <FlatList
            data={item.massTimes}
            renderItem={(val) => (
              <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5, flexDirection: 'row',
               justifyContent: 'space-between' }}>
                <Text>{val.item}</Text>                
                <Button
                  title=''
                  style={{ paddingLeft: 10}}
                  icon={<Icon name='clear' size={16} />}
                  />
              </View>
            )} />
          </View>
        </View>       
      </View> 
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>        
        <View style={{ flex: 1 }}>
        <Dropdown
        label='Mass Times'
        data={[{
            value: 'Sunday 11:00 AM',
          }, {
            value: 'Sunday 12:00 PM',
          }, {
            value: 'Sunday 4:00 PM',
          }, {
            value: 'Sunday 7:00 PM',
          }]}
         />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            icon={<Icon name='add' size={24} color='white' />}
            title='Add Mass Time'
          />
        </View>
      </View>
    </View>  
  </CardSection>
  );

const renderAddMassTime = () => {
    return (
      <View>
        <CardSection>
        <View style={{ flex: 1 }}>
          <Button
            icon={<Icon name='add' size={24} color='white' />}
            title='Add Mass Time'
          />
        </View>
        </CardSection>
        <CardSection>
        <Picker selectedValue='sunday1200pm' style={{ marginTop: -80,
          marginBottom: -80, flex: 1 }} >
          <Picker.Item label='Sunday 11:00 AM' value='sunday1100am' />
          <Picker.Item label='Sunday 12:00 PM' value='sunday1200pm' />
          <Picker.Item label='Sunday 4:00 PM' value='sunday400pm' />
          <Picker.Item label='Sunday 7:00 PM' value='sunday700pm' />
        </Picker>
        </CardSection>
      </View>  
      )
  }          

export default ChurchItem;
