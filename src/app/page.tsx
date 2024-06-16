'use client';

import { ConvertSettings } from '@/components/convert-settings/ConvertSettings';
import { DragAndDrop } from '@/components/drag-and-drop/DragAndDrop';
import { SelectedImagesTable } from '@/components/selected-images-table/SelectedImagesTable';
import { FilesProvider } from '@/context/FilesContext';

export default function Home() {
  return (
    <div className="container max-w-screen-lg mt-10 space-y-6">
      <FilesProvider>
        <DragAndDrop />
        <ConvertSettings />
        <SelectedImagesTable />
      </FilesProvider>
    </div>
  );
}
