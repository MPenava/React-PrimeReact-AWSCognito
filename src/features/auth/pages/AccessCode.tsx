import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const AccessCode = () => {
  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex flex-column gap-4">
        <div className="flex justify-content-center text-4xl font-normal">
          Enter 6-digit code
        </div>
        <div className="flex flex-column justify-content-center align-items-center text-xs font-normal">
          <span>Please enter 6-digit code sent to your email</span>
          <span>example@gmail.com</span>
        </div>
      </div>
      <div className="flex flex-column gap-5">
        <div className="flex flex-row justify-content-center">
          <span className="p-input-icon-left w-10rem">
            <i className="pi pi-clone" />
            <InputText
              placeholder="Code"
              pt={{
                root: { className: "w-full" },
              }}
            />
          </span>
        </div>
        <div className="flex flex-column gap-2">
          <Button
            label="Submit"
            severity="secondary"
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
          ></Button>
          <div className="flex justify-content-center px-4 py-2 font-semibold">
            Resend code
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
