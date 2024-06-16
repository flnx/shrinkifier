export enum Status {
  PENDING = 'PENDING',
  LOADING = 'LOADING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum Format {
  WEBP = 'WEBP',
  JPEG = 'JPEG',
  PNG = 'PNG',
}

export type FileData = {
  blob: File;
  fileData: {
    url: string;
    size: string;
    name: string;
    ogName: string;
    type: string;
    status: Status;
  };
};
