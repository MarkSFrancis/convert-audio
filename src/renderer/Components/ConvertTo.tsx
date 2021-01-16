import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export interface ConvertToProps {
  format: string;
  onFormatChange: (newFormat: string) => void;
}

const supportedFormats = [
  "aac",
  "flac",
  "flv",
  "m4a",
  "mp3",
  "ogg",
  "opus",
  "wav",
  "webm",
];

const localStorageKey = "convertTo";

export function ConvertTo(props: ConvertToProps) {
  function getDefaultFormat() {
    let setting = localStorage.getItem(localStorageKey);
    if (!supportedFormats.includes(setting)) {
      setting = supportedFormats[0];
    }
    return setting;
  }

  if (!supportedFormats.includes(props.format) && supportedFormats.length > 0) {
    setTimeout(() => props.onFormatChange(getDefaultFormat()), 0);
  }

  function updateConvertTo(convertTo: string) {
    localStorage.setItem(localStorageKey, convertTo);
    props.onFormatChange(convertTo);
  }

  return (
    <FormGroup>
      <FormLabel>Convert To</FormLabel>
      <FormControl
        as="select"
        value={props.format}
        onChange={(e) => updateConvertTo(e.target.value)}
      >
        {supportedFormats.map((f) => (
          <option value={f} key={f}>
            {f}
          </option>
        ))}
      </FormControl>
    </FormGroup>
  );
}
