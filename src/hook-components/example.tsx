import React, {
  Fragment,
  FunctionComponent,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StoreByArray } from "../share/store";
import * as Rx from "rxjs";
import * as Ro from "rxjs/operators";
import { StoreContext } from "../share/context";
import { get } from "http";

// export function Example() {
//   // 声明一个叫 “count” 的 state 变量。
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }

export function Example() {
  const [count, setCount] = useState(0);
  const testCallBack = useCallback(() => {
    console.log("callback");
    return 2;
  }, [1]);
  const c = testCallBack();
  const testUseMemo = useMemo(() => {
    console.log("memo");
    return 1;
  }, [1]);

  // 相当于 componentDidMount 和 componentDidUpdate:
  // useEffect(() => {
  //   // 使用浏览器的 API 更新页面标题
  //   // setCount(1); // erro
  //   document.title = `You clicked ${count} times`;
  // }, [count]);
  useLayoutEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  useEffect(() => {
    console.log("init");
    setCount(100);
  }, []);
  // const a: boolean = false;
  // if (a) {
  //   const [b, setB] = useState(0);
  // }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
          setCount(count + 10); // count + 10, last setState works,count will be stable
        }}
      >
        Click me
      </button>
      <button onClick={() => setCount(0)}>reset</button>
      <button
        onClick={() => {
          // testCallBack();
          console.log(c);
          console.log(testUseMemo);
          setCount((pre) => pre + 1);
          setCount((pre) => pre + 10); // count + 11
        }}
      >
        +
      </button>
      <button onClick={() => setCount((pre) => pre - 1)}>-</button>
    </div>
  );
}

export const FriendStatus: FunctionComponent<{ friend: { id: string } }> = (
  props: { friend: { id: string } }
  // context: StoreByArray<{ id: string }, { id: string; name: string }>
) => {
  const [isOnline, setIsOnline] = useState<null | boolean>(null);
  // function handleStatusChange(status) {
  //   setIsOnline(status.isOnline);
  // }
  // StoreContext;

  const context = useContext(StoreContext);
  console.log(context);
  const fs$ = context.state$.pipe(
    Ro.map((fs) => fs.find((f) => f.id === props.friend.id))
  );
  // const fs$ = Rx.of(1);
  useEffect(() => {
    console.log(context.currentState());
    context.state$.subscribe(
      (x) => console.log(x),
      (e) => console.error(e)
    );
    const a = fs$.subscribe(
      (x) => {
        console.log(x);
        if (x) {
          setIsOnline(true);
        }
      },
      (e) => console.error(e)
    );
    // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // setIsOnline(true);
    return () => {
      a.unsubscribe();
      // setIsOnline(false);
      // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.friend.id]); // 仅在此参数发生变化时更新

  if (isOnline === null) {
    return <div>{"Loading..."} </div>;
  }
  return <div>{isOnline ? "Online" : "Offline"} </div>;
};

function useFriendStatus(friendId: string) {
  const [isOnline, setIsOnline] = useState<null | boolean>(null);
  function handleStatusChange(status: boolean) {
    setIsOnline(status);
  }

  useEffect(() => {
    if (friendId === "1") {
      handleStatusChange(true);
    } else {
      handleStatusChange(false);
    }
    return () => {
      console.log("unsubscribe");
    };
  });
  return isOnline;
}

export function TextInputWithFocusButton() {
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素

    if (inputEl.current !== null) {
      inputEl.current.focus();
      if (inputEl.current.value === "1") {
        inputEl.current.blur();
      }

      console.log(inputEl.current.value);
    }
    // inputEl.current?.value
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      inputEl.current?.blur();
    }
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={() => onButtonClick()}>Focus the input</button>
    </>
  );
}

export function FetchData() {
  const [data, setData] = useState(1);

  useEffect(() => {
    // const f = async () => {
    //   const result = await fetch("http://192.168.1.131:5000/api/config");
    //   setData(result);
    // };
    // f();
    Rx.from(
      fetch(
        "http://localhost:5000/api/image/a8cf9aa0-e690-4202-a4d8-5fd39651be0c/meta"
      )
    )
      .pipe(Rx.switchMap((x) => Rx.from(x.json())))
      .subscribe(
        (x) => console.log(x),
        (e) => console.error(e)
      );
    Rx.from(
      fetch(
        "http://localhost:5000/api/image/a8cf9aa0-e690-4202-a4d8-5fd39651be0c/data"
      )
    )
      // .pipe(Rx.mergeMap((x) => Rx.from(x.arrayBuffer())))
      .subscribe(
        (x) => {
          x.arrayBuffer().then(
            (x) => {
              console.log(x);
              setData(x.byteLength);
            },
            (e) => console.error(e)
          );
        },
        (e) => console.error(e)
      );
  }, []);

  return (
    <>
      <div>000</div>
      <button onClick={() => setData(1)}>{data} </button>
    </>
  );
}
