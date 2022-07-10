import * as React from "react";
import { Input } from "./tailwind/ui/Input";
import { TextField } from "./tailwind/ui/TextField";
import "./styles.css";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="container mx-auto w-4/5 my-10">
      <div className="grid cols-1 gap-10">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Generic Input"
        />

        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Generic Input with error"
          isInvalid={true}
          errorText="Error text from generic input"
        />

        <TextField
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="TextField"
          infoText="lorem ipsum"
        />

        <TextField
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="TextField"
          infoText="lorem ipsum"
          isInvalid={true}
          errorText="Error text from TextField"
        />
      </div>
    </div>
  );
}
