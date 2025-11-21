import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";

interface RegisterForm {
  phone: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

const RegisterScreen = () => {
  const phoneRef = useRef<PhoneInput>(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<RegisterForm>({
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
      remember: false,
    },
  });

  const phone = watch("phone");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordValid = password.length >= 6;
  const isConfirmValid =
    confirmPassword === password && confirmPassword.length >= 6;

  const isButtonDisabled =
    !isPhoneValid || !isPasswordValid || !isConfirmValid;

  const onSubmit = (data: RegisterForm) => {
    console.log("REGISTER DATA:", data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>← Login</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Enter your mobile phone</Text>
          </View>
        </View>
      </View>

      <View style={styles.headerSpacer} />

      
      <Controller
        control={control}
        name="phone"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            ref={phoneRef}
            defaultCode="GB"
            layout="first"
            value={value}
            textInputProps={{ keyboardAppearance: "dark" }}
            onChangeFormattedText={(text) => {
              onChange(text);
              setIsPhoneValid(phoneRef.current?.isValidNumber(text) || false);
            }}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneTextContainer}
          />
        )}
      />

      
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          onChangeText={(val) => setValue("password", val)}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeIcon}>{showPassword ? "👁" : "👁‍🗨"}</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry={!showConfirm}
          onChangeText={(val) => setValue("confirmPassword", val)}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowConfirm(!showConfirm)}
        >
          <Text style={styles.eyeIcon}>{showConfirm ? "👁" : "👁‍🗨"}</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.row}>
        <View style={styles.checkRow}>
          <Controller
            control={control}
            name="remember"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                value={value}
                onValueChange={onChange}
                color="#0095ff"
              />
            )}
          />
          <Text style={styles.checkLabel}>Remember me</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.disabled]}
          disabled={isButtonDisabled}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#00a6ff",
    width: "100%",
    paddingTop: 70,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  loginButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 2,
  },

  loginButtonText: {
    color: "#00a6ff",
    fontSize: 16,
    fontWeight: "600",
  },

  headerRight: {
    alignItems: "flex-end",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
  },

  subtitle: {
    fontSize: 18,
    marginTop: 5,
    color: "#e8f7ff",
  },

  headerSpacer: {
    width: "100%",
    height: 60,
    backgroundColor: "#F7FBFF",
  },

  phoneContainer: {
    width: "85%",
    marginTop: 40,
    borderBottomWidth: 2,
    borderColor: "#00a6ff",
    paddingBottom: 3,
  },

  phoneTextContainer: {
    backgroundColor: "transparent",
  },

  inputWrapper: {
    width: "85%",
    marginTop: 25,
    borderBottomWidth: 2,
    borderColor: "#007ACC",
    position: "relative",
    paddingBottom: 4,
  },

  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: "#000",
  },

  eyeButton: {
    position: "absolute",
    right: 5,
    top: 8,
  },

  eyeIcon: {
    fontSize: 22,
  },

  row: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkLabel: {
    marginLeft: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#00a6ff",
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  disabled: {
    opacity: 0.4,
  },

  buttonIcon: {
    fontSize: 30,
    color: "white",
  },
});
