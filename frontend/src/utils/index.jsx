import { toast } from "react-toastify";

import { toastConfig } from "../config/config";

export const toastSuccess = (message) => {
  toast.success(message, toastConfig)
}

export const toastInfo = (message) => {
  toast.info(message, toastConfig)
}

export const toastWarning = (message) => {
  toast.warn(message, toastConfig)
}

export const toastError = (message) => {
  toast.error(message, toastConfig)
}

export const toastDefault = (message) => {
  toast(message, toastConfig)
}