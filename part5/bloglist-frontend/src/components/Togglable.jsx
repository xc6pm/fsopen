import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility: () => {
        setVisible(!visible);
      },
    };
  });

  return (
    <>
      <div style={{ display: visible ? "none" : "" }}>
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        {children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </>
  );
});

export default Togglable;
