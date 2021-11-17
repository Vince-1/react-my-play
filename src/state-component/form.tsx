import React, { ChangeEvent, FormEvent } from "react";

export class NameForm extends React.Component<{}, { value: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    //     console.log(event);
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    alert("提交的名字: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

export class EssayForm extends React.Component<{}, { value: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: "请撰写一篇关于你喜欢的 DOM 元素的文章.",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    alert("提交的文章: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          文章:
          <textarea
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

export class FlavorForm extends React.Component<{}, { value: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { value: "coconut" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    alert("你喜欢的风味是: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

interface ReservationState {
  isGoing: boolean;
  numberOfGuests: number;
}
export class Reservation extends React.Component<{}, ReservationState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name as keyof ReservationState;
    const value = name === "isGoing" ? target.checked : target.value;

    const change = // Patrial<T> doesnot work
      name === "isGoing"
        ? { isGoing: target.checked, numberOfGuests: this.state.numberOfGuests }
        : {
            numberOfGuests: parseInt(target.value),
            isGoing: this.state.isGoing,
          };
    this.setState(change);
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
