/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useCallback } from "react";
// import CustomToaster from "./CustomToaster";
import { GoCheckCircle } from "react-icons/go";
import { PiInfoLight } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
import { MdErrorOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
const ToastContext = createContext();

export const ToastProvider = ({ children, position = "bottom-right" }) => {
  const defaultValues = {
    type: "success",
    title: "",
    subtitle: "",
    show: false,
    timeout: 2500,
    position,
  };

  const [toast, setToast] = useState(defaultValues);

  const showToast = useCallback(
    ({
      title,
      subtitle,
      timeout,
      type = defaultValues.type,
      position = defaultValues.position,
    }) => {
      setToast({
        title: title ?? type,
        subtitle,
        show: true,
        timeout: timeout ?? defaultValues.timeout,
        position,
        type,
      });
      setTimeout(() => {
        setToast(defaultValues);
      }, timeout ?? defaultValues.timeout);
    },
    []
  );

  const closeToast = () => setToast(defaultValues);

  return (
    <ToastContext.Provider value={{ toast, showToast, closeToast }}>
      {children}
      {toast.show && <CustomToaster {...{ ...toast, closeToast }} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastProvider;

const CustomToaster = ({
  type = "success",
  title = "Success",
  subtitle = "Your operation was completed successfully.",
  closeToast,
  position = "bottom-right",
}) => {
  //
  const colors = {
    success: {
      color: "#16A34A",
      background: "#F0FDF4",
    },
    info: {
      color: "var(--ds-blue-500)",
      background: "var(--ds-blue-50)",
    },
    error: {
      color: "var(--ds-red-600)",
      background: "var(--ds-red-50)",
    },
    warn: {
      color: "var(--ds-orange-600)",
      background: "var(--ds-orange-50)",
    },
  };
  const icons = {
    success: GoCheckCircle,
    info: PiInfoLight,
    error: MdErrorOutline,
    warn: CiWarning,
  };

  const Icon = icons[type];
  const positions = {
    "bottom-right": {
      bottom: "20px",
      right: "20px",
    },
    "bottom-left": {
      bottom: "20px",
      left: "20px",
    },
    "top-right": {
      top: "20px",
      right: "20px",
    },
    "top-left": {
      top: "20px",
      left: "20px",
    },
  };

  // return ({ closeToast }) => (
  return (
    <div
      style={{
        ...styles.toast,
        ...(positions[position] || positions["bottom-right"]),
      }}
    >
      <div
        className="d-flex align-items-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: `16px`,
          borderRadius: "12px",
          boxShadow: `0px 4px 24px 0px #00000029`,
          gap: `16px`,
          width: `500px`,
        }}
      >
        <div>
          <span
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: `40px`,
              width: `40px`,
              background: colors[type]?.background,
              borderRadius: "50%",
            }}
          >
            <Icon size={18} color={colors[type]?.color} />
          </span>
        </div>
        <div
          className="w-100"
          style={{
            width: "100%",
          }}
        >
          <h3
            className="m-0"
            style={{
              margin: "0",
              fontSize: `14px`,
              fontWeight: 600,
              fontFamily: `Inter`,
              color: `var(--ds-grey-900)`,
              textTransform: "capitalize",
            }}
          >
            {title}
          </h3>
          <p
            className="m-0 p-0"
            style={{
              margin: "0",
              padding: "0",
              fontSize: `14px`,
              fontWeight: 400,
              fontFamily: `Inter`,
              color: `var(--ds-grey-600)`,
            }}
          >
            {subtitle}
          </p>
        </div>
        <div onClick={closeToast}>
          <LiaTimesSolid
            fill="var(--ds-grey-300)"
            size={18}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    // padding: "10px 20px",
    // backgroundColor: "#fff",
    // color: "#fff",
    // borderRadius: "5px",
    // boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    zIndex: 1000000,
  },
  closeButton: {
    marginLeft: "10px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};
