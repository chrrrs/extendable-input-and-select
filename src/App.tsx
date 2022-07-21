import * as React from "react";
import { Input } from "./tailwind/ui/Input";
import { TextField } from "./tailwind/ui/TextField";
import { PasswordField } from "./tailwind/ui/PasswordField";
import { Select } from "./tailwind/ui/Select";
import "./styles.css";

export default function App() {
  const [value, setValue] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("");

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
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="TextField with error"
          infoText="lorem ipsum"
          isInvalid={true}
          errorText="Error text from TextField"
        />

        <PasswordField
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="TextField"
          isInvalid={undefined}
          errorText="Error text from TextField"
        />

        <PasswordField
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="TextField"
          isInvalid={true}
          errorText="Error text from TextField"
        />

        <Select
          label="Generic Select"
          defaultValue=""
          value={selectValue}
          onChange={(event) => setSelectValue(event.target.value)}
          leftElement={<div className="w-4 h-4 bg-red-500" />}
        >
          <option value="" hidden></option>
          <option value="1">Dog</option>
          <option value="2">Cat</option>
          <option value="3">Turtle</option>
          <option value="4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            ipsam, excepturi odio voluptatibus nam, commodi ab fuga voluptas
            error tenetur provident iure earum vel esse, praesentium laboriosam
            tempore? Ab, et.
          </option>
        </Select>

        <Select
          label="Generic Select with error text"
          defaultValue=""
          value={selectValue}
          onChange={(event) => setSelectValue(event.target.value)}
          rightElement={<div className="w-4 h-4 bg-red-500" />}
        >
          <option value="" hidden></option>
          <option value="1">Dog</option>
          <option value="2">Cat</option>
          <option value="3">Turtle</option>
        </Select>
      </div>
    </div>
  );
}
