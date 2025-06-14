import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [idade, setIdade] = useState('');
  const [plano, setPlano] = useState('Básico');
  const [mesesAtivo, setMesesAtivo] = useState('');
  const [carenciaConcluida, setCarenciaConcluida] = useState(false);
  const [doencasCronicas, setDoencasCronicas] = useState(false);
  const [dependentes, setDependentes] = useState('');
  const [consultasRecentes, setConsultasRecentes] = useState(false);
  const [faturaAtraso, setFaturaAtraso] = useState(false);
  const [estado, setEstado] = useState('');

  const estadosAtendidos = ['São Paulo', 'Minas Gerais', 'Paraná'];

  const verificarBeneficio = () => {
    const idadeNum = parseInt(idade);
    const mesesNum = parseInt(mesesAtivo);
    const depNum = parseInt(dependentes);

    if (isNaN(idadeNum) || idadeNum < 18 || idadeNum > 65) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque sua idade está fora dos critérios.');
    }

    const planoValido =
      plano === 'Premium' || (plano === 'Essencial' && mesesNum >= 12);
    if (!planoValido) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque seu tipo de plano ainda não atende os requisitos.');
    }

    if (!carenciaConcluida) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque ainda não concluiu o período de carência.');
    }

    if (doencasCronicas) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque possui doenças crônicas cadastradas.');
    }

    if (depNum > 3) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque possui mais de 3 dependentes.');
    }

    if (!consultasRecentes) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque não teve consultas liberadas nos últimos 6 meses.');
    }

    if (faturaAtraso) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque possui faturas em atraso.');
    }

    if (!estadosAtendidos.includes(estado)) {
      return Alert.alert('Desculpe', 'Você não pode receber o benefício porque seu estado não está na área de cobertura.');
    }

    return Alert.alert('Parabéns!', 'Você está qualificado para o benefício extra do seu Plano de Saúde!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Verificação de Benefício Extra</Text>

      <Text style={styles.label}>Idade</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={idade} onChangeText={setIdade} />

      <Text style={styles.label}>Tipo de Plano</Text>
      <Picker selectedValue={plano} onValueChange={setPlano} style={styles.input}>
        <Picker.Item label="Básico" value="Básico" />
        <Picker.Item label="Essencial" value="Essencial" />
        <Picker.Item label="Premium" value="Premium" />
      </Picker>

      <Text style={styles.label}>Meses com plano ativo</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={mesesAtivo} onChangeText={setMesesAtivo} />

      <View style={styles.switchContainer}>
        <Text>Carência concluída?</Text>
        <Switch value={carenciaConcluida} onValueChange={setCarenciaConcluida} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Possui doenças crônicas?</Text>
        <Switch value={doencasCronicas} onValueChange={setDoencasCronicas} />
      </View>

      <Text style={styles.label}>Número de dependentes</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={dependentes} onChangeText={setDependentes} />

      <View style={styles.switchContainer}>
        <Text>Teve consultas liberadas nos últimos 6 meses?</Text>
        <Switch value={consultasRecentes} onValueChange={setConsultasRecentes} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Possui faturas em atraso?</Text>
        <Switch value={faturaAtraso} onValueChange={setFaturaAtraso} />
      </View>

      <Text style={styles.label}>Estado onde mora</Text>
      <Picker selectedValue={estado} onValueChange={setEstado} style={styles.input}>
        <Picker.Item label="Selecione um estado" value="" />
        <Picker.Item label="São Paulo" value="São Paulo" />
        <Picker.Item label="Minas Gerais" value="Minas Gerais" />
        <Picker.Item label="Paraná" value="Paraná" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>

      <Button title="Verificar Benefício" onPress={verificarBeneficio} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  switchContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

