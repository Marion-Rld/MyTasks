import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  title?: string;
  iconName?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {iconName && <Ionicons name={iconName} size={24} color="white" />}
      {title && <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#1D3D47",
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
  },
});
