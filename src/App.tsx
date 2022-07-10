import * as React from "react";
import { RefreshCw } from "react-feather";
import "./styles.css";

export default function App() {
  return (
    <div className="container mx-auto w-4/5 my-10">
      <h1 className="font-bold text-2xl mb-6">Useful Elements</h1>
      <div className="space-y-6">
        <div>
          <label className="text-gray-700 block mb-1 font-semibold">
            Label
          </label>
          <input className="form-input leading-5" />
        </div>
        <div>
          <label className="text-gray-700 block mb-1 font-semibold">
            Label
          </label>
          <input className="form-input leading-5" />
        </div>
        <div>
          <label className="text-gray-700 block mb-1 font-semibold">
            Label
          </label>
          <textarea className="form-textarea leading-5" />
        </div>
        <div>
          <label className="text-gray-700 block mb-1 font-semibold">
            Label
          </label>
          <select className="form-select leading-5">
            <option>One</option>
            <option>Two</option>
          </select>
        </div>
        <fieldset>
          <legend className="text-gray-700 block mb-1 font-semibold">
            Checkbox Group
          </legend>
          <div>
            <label className="block">
              <input className="form-checkbox" type="radio" />
              <span className="ml-2">Option</span>
            </label>
          </div>
          <div>
            <label className="block">
              <input className="form-checkbox" type="radio" />
              <span className="ml-2">Option</span>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-gray-700 block mb-1 font-semibold">
            Radio Group
          </legend>
          <div>
            <label className="block">
              <input className="form-radio" type="radio" />
              <span className="ml-2">Option</span>
            </label>
          </div>
          <div>
            <label className="block">
              <input className="form-radio" type="radio" />
              <span className="ml-2">Option</span>
            </label>
          </div>
        </fieldset>

        <div className="space-x-2">
          <button className="inline-flex justify-center items-center align-middle px-4 py-2 border border-gray-300 text-sm leading-5 font-semibold rounded-md text-gray-700 bg-white  transition duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-100 active:text-gray-900 active:bg-gray-100">
            <RefreshCw className="h-4 w-4 -ml-1 mr-2 align-middle text-gray-600" />
            <span>Reset</span>
          </button>
          <button className="inline-flex justify-center items-center align-middle px-4 py-2 border border-transparent text-sm leading-5 font-semibold rounded-md text-white bg-blue-600  transition duration-150 ease-in-out hover:bg-blue-500 active:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
