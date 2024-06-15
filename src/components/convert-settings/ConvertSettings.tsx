import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

export function ConvertSettings() {
  return (
    <section className="space-y-2">
      <p className="text-sm">Convert to</p>
      <div className="flex justify-between items-center gap-1">
        <div className="space-y-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a format" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Formats</SelectLabel>
                <SelectItem value="webp">WEBP</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button>Convert All</Button>
      </div>
    </section>
  );
}
