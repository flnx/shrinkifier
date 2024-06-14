import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

type DroppableCardProps = {
  handleOnSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
};

export const DroppableCard = ({
  handleOnSelectChange,
  handleDrop,
}: DroppableCardProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEntered, setIsEntered] = useState(false);

  const handleSelectBtnClick = () => {
    // Trigger the file input click
    fileInputRef.current?.click();
  };

  return (
    <Card
      onDragEnter={() => setIsEntered(true)}
      onDragOver={(e) => e?.preventDefault()}
      onDragExit={() => setIsEntered(false)}
      onDrop={(e) => {
        setIsEntered(false);
        handleDrop(e);
      }}
      className={cn(
        'shadow-none border-input border-2 border-dashed items-center justify-center flex flex-col text-center py-10 px-2',
        isEntered ? '!border-primary' : ''
      )}
    >
      <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />

      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>
          Drag and drop your images or click the button below to select files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={handleSelectBtnClick}>
          Select Files
        </Button>
        <Input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          className="sr-only"
          ref={fileInputRef}
          onChange={handleOnSelectChange}
        />
      </CardContent>
    </Card>
  );
};

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
