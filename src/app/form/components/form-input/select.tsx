import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
export const SelectInput: React.FC = () => (
    <div className="space-y-2">
      <RadioGroup>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroup value="option1" id="option1" />
          <Label htmlFor="option1" className="text-sm text-gray-600">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroup value="option2" id="option2" />
          <Label htmlFor="option2" className="text-sm text-gray-600">Option 2</Label>
        </div>
      </RadioGroup>
      <Button 
        variant="ghost" 
        className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
      >
        + Add option
      </Button>
    </div>
  );