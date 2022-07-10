import * as React from "react";
import { Input } from "./tailwind";
import "./styles.css";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="container mx-auto w-4/5 my-10">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        label="Test"
      />
    </div>
  );
}
