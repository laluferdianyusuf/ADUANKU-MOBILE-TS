import React, { Ref, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface CustomInputProps {
  title?: string;
  placeholder: string;
  icon?: string | any;
  keyboard?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad";
  isPassword?: boolean;
  style?: string;
  onChange?: (text: string) => void;
  value: string;
  disabled?: boolean;
  maxLength?: number;
  multiline?: boolean;
  border?: string;
  background?: string;
  paddingHorizontal?: string;
  paddingVertical?: string;
  activeBorder?: string;
  errorMessage?: string;
}

export const CustomInput = (
  {
    title,
    placeholder,
    icon,
    keyboard = "default",
    isPassword = false,
    style = "w-full",
    onChange,
    value,
    disabled = false,
    maxLength,
    multiline = false,
    border = "border-custom-purple-1",
    background = "bg-transparent",
    paddingHorizontal = "py-3",
    paddingVertical = "px-3",
    activeBorder = "border-custom-purple-1",
    errorMessage,
  }: CustomInputProps,
  ref: Ref<TextInput>
) => {
  const { colors, dark } = useTheme();
  const [secureText, setSecureText] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View className={`mb-4 ${style}`}>
      {title && (
        <Text className="font-josefin-bold text-md capitalize opacity-75">
          {title}
        </Text>
      )}
      <View
        className={`mt-2 border ${
          isFocused ? activeBorder : border
        } ${background} rounded-2xl flex-row items-center gap-3 ${paddingHorizontal} ${paddingVertical}`}
      >
        <Ionicons
          name={icon}
          color={isFocused ? "#5e7dbd" : "#94a3b8"}
          size={20}
        />
        <View className="h-1/2 w-[1px] bg-custom-purple-1" />
        <TextInput
          ref={ref}
          onChangeText={onChange}
          keyboardType={keyboard}
          placeholder={placeholder}
          placeholderTextColor={"#94a3b8"}
          secureTextEntry={secureText}
          style={{
            fontFamily: "Josefin",
            color: "black",
          }}
          className={`flex-1`}
          value={value}
          editable={!disabled}
          maxLength={maxLength}
          multiline={multiline}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          importantForAutofill="no"
        />
        {isPassword ? (
          <Pressable onPress={toggleSecureText}>
            <Ionicons
              name={secureText ? "eye-outline" : "eye-off-outline"}
              color={isFocused ? "#5e7dbd" : "#94a3b8"}
              size={20}
            />
          </Pressable>
        ) : null}
      </View>
      {errorMessage && (
        <Text className="text-custom-error-2 font-josefin text-xs">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
