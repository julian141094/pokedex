import React from "react";
import { View, Text } from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import UserData from "../components/Auth/UserData";
import useAuth from "../hooks/useAuth";

/**
 * @name Account
 * @description Display user information or link to login screen
 * @returns 
 */
export default function Account() {
  // Const && UseStates
  const { auth } = useAuth();

  return <View>{auth ? <UserData /> : <LoginForm />}</View>;
}
