import { useEffect, useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import {
  ConversionOptions,
  supportedOptions,
  findConvertionOptionById as findOptionById,
  getConversionOptionId as getOptionId,
} from "../utils/conversionOptions";
import { useLocalStorage } from "../utils/hooks/localStorage";

export interface ConvertOptionsProps {
  onOptionsChange: (newOptions: ConversionOptions) => void;
}

function useOption(
  props: ConvertOptionsProps
): [optionId: string, setOption: (opt: string) => void] {
  const [storedOptionId, setStoredOptionId] = useLocalStorage(
    "convertTo",
    getOptionId(supportedOptions[0])
  );

  const [optionId, setOptionId] = useState<string>();

  useEffect(() => {
    let optionId = storedOptionId;
    if (!findOptionById(optionId)) {
      optionId = getOptionId(supportedOptions[0]);
      setStoredOptionId(optionId);
    }

    const option = findOptionById(optionId);
    setOptionId(optionId);
    props.onOptionsChange?.(option);
  }, [storedOptionId]);

  return [optionId, setStoredOptionId];
}

export function ConvertOptions(props: ConvertOptionsProps) {
  const [optionId, setOptionId] = useOption(props);

  return (
    <FormGroup>
      <FormLabel>Convert To</FormLabel>
      <FormControl
        as="select"
        value={optionId}
        onChange={(e) => setOptionId(e.target.value)}
      >
        {supportedOptions.map((f) => (
          <option value={getOptionId(f)} key={getOptionId(f)}>
            {getOptionId(f)}
          </option>
        ))}
      </FormControl>
    </FormGroup>
  );
}
