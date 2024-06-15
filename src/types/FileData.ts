export enum Status {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export type FileData = {
  blob: File;
  fileData: {
    url: string;
    size: string;
    name: string;
    type: string;
    status: Status;
  };
};
