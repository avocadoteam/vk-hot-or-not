import { BaseResponse } from './common';

export type FileInfo = {
  id: string;
  url: string;
};

export type FileResponse = BaseResponse<FileInfo>;
