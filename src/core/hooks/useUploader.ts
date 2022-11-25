import { uploadFileFX } from '@core/api/files/effects.file';
import { FileInfo } from '@core/types/file';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { useStore } from 'effector-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const oneMB = 1048576;

export const useUploader = ({
  onFinishUpload,
  to,
}: {
  onFinishUpload: (f: FileInfo) => void;
  to: 'profile_bg' | 'profile';
}) => {
  const loading = useStore(uploadFileFX.pending);
  const [progress, setProgress] = useState(0);

  const { open, getInputProps } = useDropzone({
    accept: {
      'image/png': [],
      'image/webp': [],
      'image/jpeg': [],
      'image/jpg': [],
    },
    maxSize: oneMB * 10,
    disabled: loading,
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async file => {
        const data = await uploadFileFX({
          file,
          fileName: to,
          onUploadProgress: p => {
            setProgress(Math.round((p.loaded * 100) / p.total));
          },
        });
        onFinishUpload(data);
        setProgress(0);
      });
    },
    onDropRejected: e => {
      let errText = 'Не удалось загрузить файл';
      if (e?.[0]?.errors?.[0]?.message?.includes('larger')) {
        errText = 'Файл слишком большой';
      }

      addToastToQueue({
        id: ToastId.FileUpload,
        toast: {
          type: 'error',
          title: errText,
        },
      });
    },
  });

  return {
    open,
    progress,
    getInputProps,
  };
};
