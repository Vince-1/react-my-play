import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Example,
  FetchData,
  FriendStatus,
  TextInputWithFocusButton,
} from "./hook-components/example";
import { Image } from "./hook-components/image";
import { TestEffect } from "./hook-components/testEffect";
import { StoreContext } from "./share/context";
import { StoreByArray } from "./share/store";
import { BlurExample } from "./state-component/blur";
import {
  EssayForm,
  FlavorForm,
  NameForm,
  Reservation,
} from "./state-component/form";
import { Calculator } from "./state-component/lifting-state-up";
import {
  FilterableProductTable,
  PRODUCTS,
} from "./state-component/thinking-react";
import { Game } from "./state-component/tik-tak";

// ========================================

class Main extends React.Component<{}, {}> {
  // StoreContext = React.createContext({
  //   friendStore: new StoreByArray<
  //     { id: string },
  //     { id: string; name: string }
  //   >(),
  // });
  friendStore = new StoreByArray<
    { id: string },
    { id: string; name: string }
  >();

  // console.log(friendStore);
  insert(i: number) {
    this.friendStore.insert({ id: i.toString(), name: "li" }).subscribe(
      (x) => console.log(x),
      (e) => console.error(e)
    );
  }
  render() {
    this.insert(1);
    // this.friendStore.insert({ id: "1", name: "li" }).subscribe(
    //   (x) => console.log(x),
    //   (e) => console.error(e)
    // );

    return (
      <div>
        <button
          onClick={() => {
            const i = Math.random();
            this.insert(i);
            console.log(i, this.friendStore.currentState());
          }}
        >
          click
        </button>
        <Game />
        <NameForm />
        <EssayForm />
        <FlavorForm />
        <Reservation />
        <Calculator />
        <FilterableProductTable products={PRODUCTS} />
        <BlurExample />
        <Example />

        <StoreContext.Provider value={this.friendStore}>
          <FriendStatus friend={{ id: "1" }} />
        </StoreContext.Provider>
        <TextInputWithFocusButton />

        {/* <FetchData /> */}
        <Image />

        <TestEffect />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));

// ReactDOM.render(<Board />, document.getElementById("root"));
// ReactDOM.render(<Tomo />, document.getElementById("root"));

// reportWebVitals();
