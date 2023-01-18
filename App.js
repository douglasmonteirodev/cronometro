import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

let timer = null;
let sec = 0;
let min = 0;
let hr = 0;

const App = () => {
  const [numero, setNumero] = useState(0);
  const [btn, setBtn] = useState('VAI');
  const [ultimo, setUltimo] = useState(null);

  const iniciar = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;

      setBtn('VAI');
    } else {
      timer = setInterval(() => {
        sec++;

        if (sec == 60) {
          sec = 0;
          min++;
        }

        if (min == 60) {
          min = 0;
          hr++;
        }

        let format =
          (hr < 10 ? '0' + hr : hr) +
          ':' +
          (min < 10 ? '0' + min : min) +
          ':' +
          (sec < 10 ? '0' + sec : sec);

        setNumero(format);
      }, 1);

      setBtn('PARAR');
    }
  };

  const zerar = () => {
    if (timer !== null) {
      setBtn('PARAR');
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero(0);
    sec = 0;
    min = 0;
    hr = 0;
    setBtn('VAI');
  };
  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}>{numero}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnTexto}>{btn}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={zerar}>
          <Text style={styles.btnTexto}>ZERAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.tempoCorrido}>
          {ultimo ? `Ultimo tempo ${ultimo}` : ''}
        </Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },

  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    height: 40,
    margin: 17,
    borderRadius: 5,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212',
  },
  areaUltima: {
    marginTop: 40,
  },
  tempoCorrido: {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic',
  },
});
