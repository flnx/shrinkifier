'use client';

import { ConvertSettings } from '@/components/convert-settings/ConvertSettings';
import { DragAndDrop } from '@/components/drag-and-drop/DragAndDrop';
import { SettingsTable } from '@/components/settings-table/SettingsTable';
import { FilesProvider } from '@/context/FilesContext';

export default function Home() {
  return (
    <div className="container max-w-screen-lg mt-10 space-y-6">
      <FilesProvider>
        <DragAndDrop />
        <ConvertSettings />
        <SettingsTable />
      </FilesProvider>
    </div>
  );
}
