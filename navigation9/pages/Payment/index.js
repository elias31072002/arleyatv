import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { FAB } from 'react-native-paper';
import { useAuth } from "../../hooks";
import styles from './styles';

export default function Payment(props){
  const [register,setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  // o hook useAuth substitui o uso do AuthContext
  const { paymentCreate } = useAuth();
  const [list, setList] = useState([
    {idpayment:'1',description:'Banho',value:35.90,date:'03/02/2022'},
    {idpayment:'2',description:'Tosa',value:54.25,date:'08/02/2022'},
    {idpayment:'3',description:'Medicamento',value:123.84,date:'08/02/2022'},
    {idpayment:'4',description:'Ração 2kg',value:41.89,date:'19/03/2022'},
    {idpayment:'5',description:'Banho',value:35.90,date:'03/02/2022'},
    {idpayment:'6',description:'Tosa',value:54.25,date:'08/02/2022'},
    {idpayment:'7',description:'Medicamento',value:123.84,date:'08/02/2022'},
    {idpayment:'8',description:'Ração 2kg',value:41.89,date:'19/03/2022'},
    {idpayment:'9',description:'Banho',value:35.90,date:'03/02/2022'},
    {idpayment:'10',description:'Tosa',value:54.25,date:'08/02/2022'},
    {idpayment:'11',description:'Medicamento',value:123.84,date:'08/02/2022'},
    {idpayment:'12',description:'Ração 2kg',value:41.89,date:'19/03/2022'},
  ]);

  const add = async (description,value) => {
    description = description.trim();
    value = value.trim();
    if( description && value ){
      setLoading(true);
      const response = await paymentCreate("95e313e2-e6bd-49bc-902a-2a7e061ee859",description,value);
      console.log("add", JSON.stringify(response));
      if( response.idpayment ){
        const aux = [...list, response];
        setList(aux);
        setRegister(false);
      }
      else
        Alert.alert(response.error || "Problemas para cadastrar o pagamento");
      setLoading(false);
    }
    else
      Alert.alert("Forneça o nome do pet");
  };

  const remove = (id) => {
    const aux = [...list];
    for(let i = 0; i < aux.length; i++){
      if( aux[i].idpayment == id ){
        aux.splice(i,1);
        setList(aux);
        break;
      }
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemtext}>
        <Text style={styles.itemname}>{item.description}</Text>
        <Text style={styles.itemname}>R${item.value} - {item.date}</Text>
      </View>
      <TouchableOpacity style={styles.remove} onPress={()=>remove(item.idpayment)}>
        <MaterialCommunityIcons name='delete' color="#555" size={25} />
      </TouchableOpacity>
    </View>
  );

  return (
    register ?
    <Register lista={list} setLista={setList} setRegister={setRegister} add={add} />
    :
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.titletext}>Soneca</Text>
      </View>
      {
        list.length > 0 ?
        <ScrollView style={[styles.scroll,{flexGrow:1}]}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.idpayment}
          />
        </ScrollView>
        :
        <Empty />
      }
      <FAB
        style={styles.add}
        small
        color="white"
        icon="plus"
        onPress={() => setRegister(true)}
      />
    </View>
  );
}

function Empty(){
  return (
    <View style={styles.msg}>
      <Text style={styles.msgtext}>
        Clique no botão para cadastrar um pagamento
      </Text>
    </View>
  );
}

function Register(props){
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR GASTO</Text>
        <View style={{marginTop:20}}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            autoCapitalize="words"
          />
        </View>
        <View style={{marginTop:20}}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            onChangeText={setValue}
            value={value}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity style={styles.button} onPress={()=>props.add(description,value)}>
            <Text style={styles.buttonLabel}>salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>props.setRegister(false)}>
            <Text style={styles.buttonLabel}>voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


