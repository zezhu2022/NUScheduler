import Form from "../components/Form";
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import * as Yup from 'yup';
import {firebase} from '../firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
});

const RegisterScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState('');

  async function handleOnSignUp(values) {
    const { name, email, password } = values;
    setSignInError(null);
    try {
      const authCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = authCredential.user;
      await user.updateProfile({displayName: name});
      navigation.navigate('ScheduleScreen');
    } catch (error) {
      setSignInError(error.message);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;
    setSignInError(null);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('ScheduleScreen');
    } catch (error) {
      setSignInError(error.message);
    }
  }


  async function handleOnSubmit(values) {
    return values.confirmPassword ? handleOnSignUp(values) : handleOnLogin(values);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            email: '',
            password: '',
            confirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirmPassword"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Button title={values => values.confirm ? 'Register' : 'Login'} />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ccccb3"
    },
    formContainer: {
      width: "60%",
    },
  });

export default RegisterScreen;