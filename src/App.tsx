import * as React from "react";
import { Input } from "./tailwind/ui/Input";
import "./styles.css";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="container mx-auto w-4/5 my-10">
      <div className="grid cols-1 gap-4">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Test"
        />
      </div>
    </div>
  );
}
