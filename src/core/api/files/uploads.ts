import { AX } from '@core/data/fetcher';
import { qVK } from '@core/data/q-params';
import { FileResponse } from '@core/types/file';
import axios from 'axios';

export const uploadFileFromUrl = async (fileUrl: string, fileName: string) => {
  const { data: fileData } = await axios.get(fileUrl, {
    responseType: 'blob',
  });

  const data = await fileUpload(fileData, fileName);

  return data;
};

export const fileUpload = async (fileData: BlobPart, fileName: string) => {
  const formData = new FormData();
  formData.append('filename', fileName);
  formData.append('file', new File([fileData], fileName, { type: 'image/png' }));

  const { data } = await AX.post<FileResponse>(`/filestorage/hot-or-not${qVK}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.data;
};
export const fileUploadOnDrop = async (file: File, fileName: string, onUploadProgress?: (progressEvent: any) => void) => {
  const formData = new FormData();
  formData.append('filename', fileName);
  formData.append('file', file);

  const { data } = await AX.post<FileResponse>(`/filestorage/hot-or-not${qVK}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });

  return data.data;
};
