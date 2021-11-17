import React, { ChangeEvent } from "react";
import { Iso } from "monocle-ts";

export function BoilingVerdict(props: { celsius: number }) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// export class Calculator extends React.Component<{}, { temperature: string }> {
//   constructor(props: {}) {
//     super(props);
//     this.state = { temperature: "" };
//   }

//   handleChange(e: ChangeEvent<HTMLInputElement>) {
//     this.setState({ temperature: e.target.value });
//   }

//   render() {
//     const temperature = this.state.temperature;
//     return (
//       <fieldset>
//         <legend>Enter temperature in Celsius:</legend>
//         <input value={temperature} onChange={this.handleChange} />
//         <BoilingVerdict celsius={parseFloat(temperature)} />
//       </fieldset>
//     );
//   }
// }

const f2cIso = new Iso(
  (f: number) => ((f - 32) * 5) / 9,
  (c: number) => (c * 9) / 5 + 32
);

function tryConvert(temperature: string, convert: (n: number) => number) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

interface TemperatureState {
  scale: keyof typeof scaleNames;
  temperature: string;
  onChange: (e: string) => void;
}

class TemperatureInput extends React.Component<TemperatureState, {}> {
  constructor(props: TemperatureState) {
    super(props);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </fieldset>
    );
  }
}

export class Calculator extends React.Component<
  {},
  { scale: keyof typeof scaleNames; temperature: string }
> {
  constructor(props: {}) {
    super(props);
    this.state = { temperature: "", scale: "c" };
  }
  handleCelsiusChange(temperature: string) {
    const c =
      this.state.scale === "c"
        ? temperature
        : tryConvert(temperature, f2cIso.get);
    this.setState({ scale: "c", temperature: c });
  }
  handleFahrenheitChange(temperature: string) {
    const f =
      this.state.scale === "f"
        ? temperature
        : tryConvert(temperature, f2cIso.from);
    this.setState({ scale: "f", temperature: f });
  }
  render() {
    const { c, f } =
      this.state.scale === "c"
        ? {
            c: this.state.temperature,
            f: tryConvert(this.state.temperature, f2cIso.from),
          }
        : {
            c: tryConvert(this.state.temperature, f2cIso.get),
            f: this.state.temperature,
          };
    return (
      <div>
        <BoilingVerdict celsius={parseFloat(c)} />
        <TemperatureInput
          scale="c"
          temperature={c}
          onChange={(e) => this.handleCelsiusChange(e)}
        />
        <TemperatureInput
          scale="f"
          temperature={f}
          onChange={(e) => this.handleFahrenheitChange(e)}
        />
      </div>
    );
  }
}
