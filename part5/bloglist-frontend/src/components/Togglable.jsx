import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types"

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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable;
