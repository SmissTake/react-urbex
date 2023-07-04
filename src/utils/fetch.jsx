import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from './logout';

const handleErrors = (response, showMessage) => {
  if (!response.ok) {
    console.log("ERROR");
    showMessage(
      response.statusText,
      'danger'
    );
    throw Error(response.statusText);
  }
  return response;
};

const handleForbidden = (response, showMessage, navigation) => {
  if (response.status === 403) {
    console.log("Forbidden");
    showMessage(
      'Forbidden',
      'danger'
      );
    logout(navigation);
    throw Error('Forbidden');
  }
  return response;
};

const handleDisconnect = (error, showMessage) => {
  if (error.message === 'Network request failed') {
    console.log("Disconnected");
    showMessage(
      'Disconnected',
      'danger'
    );
    throw Error('Disconnected', error);
  }
};

const handleSuccess = (response, successMessage, showMessage) => {
  if (successMessage) {
    console.log("success");
    showMessage(
      successMessage,
      'success'
    );
  }
  return response;
};

const customFetch = async (url, options = {}, successMessage, showMessage, navigation) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const requestOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...headers,
    },
  };
  return fetch(url, requestOptions)
  .then(response => {
    if (!response) {
      throw Error('No response received');
    }
    return response;
  })
  .then(response => handleErrors(response, showMessage))
  .then(response => handleForbidden(response, showMessage, navigation))
  .then(response => handleSuccess(response, successMessage, showMessage))
  .then((response) => response.json()
  .then((data) => {
    return data;
  }))
  .catch(error => handleDisconnect(error, showMessage));
};

export default customFetch;