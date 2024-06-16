import { CardRowMemoized } from './ImageCardRow';
import { useFilesContext } from '@/context/FilesContext';

export function SelectedImagesTable() {
  const { files, removeFileHandler, selectedFormat } = useFilesContext();

  return (
    <section className="space-y-10">
      <h3 className="text-muted-foreground text-center text-sm">
        {files.length === 0
          ? 'Select or drop images to proceed'
          : 'Selected images: ' + files.length + '/20'}
      </h3>

      <div>
        {files.map(({ fileData }) => (
          <CardRowMemoized
            key={fileData.name}
            removeFileHandler={removeFileHandler}
            selectedFormat={selectedFormat}
            fileData={fileData}
          />
        ))}
      </div>
    </section>
  );
}


