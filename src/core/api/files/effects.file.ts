import { fileD } from './domain.files';
import { fileUploadOnDrop } from './uploads';

export const uploadFileFX = fileD.createEffect(
  async ({
    file,
    fileName,
    onUploadProgress,
  }: {
    file: File;
    fileName: string;
    onUploadProgress?: (progressEvent: any) => void;
  }) => {
    const fileInfo = await fileUploadOnDrop(file, fileName, onUploadProgress);

    return fileInfo;
  },
);
