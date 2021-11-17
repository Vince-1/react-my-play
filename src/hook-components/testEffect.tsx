import { useEffect, useState } from "react";

export const TestEffect = () => {
  const [tag, setTag] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setTag((t) => !t);
        }}
      >
        change tag
      </button>
      <TTEffect tag={tag} />
    </div>
  );
};

const TTEffect = (props: { tag: boolean }) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const [array, setArray] = useState(new Uint8Array(1));

  //   const x = { a, b };
  const x = useAb(a, b);

  const x2 = { value: a + 1 };
  const x3 = a;
  const array2 = new Uint8Array(1).fill(100);
  useEffect(() => {
    console.log("tag", props.tag, array, x, a, b);
  }, [props.tag]);
  useEffect(() => {
    console.log("x", x, a, b);
    console.log(array);
  }, [x]);
  useEffect(() => {
    console.log("a", x, a, b);
  }, [a]);
  useEffect(() => {
    console.log("b", x, a, b);
  }, [b]);
  useEffect(() => {
    console.log("x.a", x, a, b);
  }, [x.a]);
  useEffect(() => {
    console.log("x.b", x, a, b);
  }, [x.b]);
  useEffect(() => {
    console.log("x.a & x.b", x, a, b);
  }, [x.a, x.b]);

  useEffect(() => {
    console.log("array", array);
  }, [array]);

  useEffect(() => {
    console.log("x2", x2);
  }, [x2]);

  useEffect(() => {
    console.log("x3", x3);
  }, [x3]);

  useEffect(() => {
    console.log("array2", array2);
  }, [array2]);

  const addA = () => {
    setA((a) => a + 1);
  };
  const addB = () => {
    setB((b) => b + 1);
  };
  const arrayOp = () => {
    array.fill(a);
    array2.fill(1);
  };
  return (
    <div>
      <button onClick={() => addA()}>add A</button>
      <button onClick={() => addB()}>add B</button>/
      <button onClick={() => arrayOp()}>array op</button>
    </div>
  );
};

const useAb = (a: number, b: number) => {
  return { a, b };
};
