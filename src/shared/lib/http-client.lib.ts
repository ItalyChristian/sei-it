import axios, { AxiosRequestConfig } from "axios";
import { api } from "./axios";

export async function http<T>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const { data } = await api.request<T>({
      url: path,
      ...config,
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? "unknown";
      throw new Error(`HTTP ${status} em ${path}`);
    }
    throw err;
  }
}
