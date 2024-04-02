import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Question, Notes } from "../types";

import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const AdminDashboard = () => {
  const questionaries: Question[] = [
    {
      name: "annasmith_q1",
      date: "Dec-30-2023 10:35",
    },
    {
      name: "annasmith_q1",
      date: "Dec-30-2023 10:35",
    },
    {
      name: "annasmith_q1",
      date: "Dec-30-2023 10:35",
    },
  ];

  const notes: Notes[] = [
    {
      name: "Rusell, Dianne",
      date: "Dec-30-2023 10:35",
    },
    {
      name: "Rusell, Dianne",
      date: "Dec-30-2023 10:35",
    },
    {
      name: "Rusell, Dianne",
      date: "Dec-30-2023 10:35",
    },
    {
      name: "Rusell, Dianne",
      date: "Dec-30-2023 10:35",
    },
    {
      name: "Rusell, Dianne",
      date: "Dec-30-2023 10:35",
    },
  ];

  const viewIcon = () => {
    return (
      <Button
        icon={"pi pi-send"}
        severity="secondary"
        size={"small"}
        className="p-button-sm p-button-text p-0"
      ></Button>
    );
  };

  const tagMessage = () => {
    return (
      <Tag
        severity="success"
        value="Completed"
        rounded
        pt={{
          root: {
            className:
              "bg-green-100 font-normal text-green-500 border-1 border-green-500 p-1",
          },
        }}
      />
    );
  };

  const toast = useRef(null);

  const handleClickEvent = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
    });
  };

  return (
    <div className="flex flex-column gap-5">
      <div className="flex flex-row align-items-center justify-content-between w-full">
        <div className="flex gap-3">
          <i className="pi pi-th-large flex align-items-center text-2xl"></i>
          <div className="font-bold text-3xl">Dashboard</div>
        </div>
        <div className="flex gap-3">
          <Toast
            ref={toast}
            pt={{
              closeButton: { className: "text-white border-1" },
            }}
          />
          <Button
            icon="pi pi-plus"
            label="New questionare"
            severity="secondary"
            onClick={handleClickEvent}
          ></Button>
          <Button
            icon="pi pi-plus"
            label="New script"
            severity="secondary"
            onClick={handleClickEvent}
          ></Button>
        </div>
      </div>

      <div className="flex flex-row justify-content-between">
        <div className="card flex p-4 gap-3 bg-gray-100 border-round-xl">
          <div className="flex align-items-center text-lg font-semibold">
            Completed questionaries
          </div>
          <div className="flex justify-content-end text-4xl font-bold text-blue-400">
            145
          </div>
        </div>
        <div className="card flex p-4 gap-3 bg-gray-100 border-round-xl">
          <div className="flex align-items-center text-lg font-semibold">
            Not submited questionaries
          </div>
          <div className="flex justify-content-end text-4xl font-bold text-blue-400">
            20
          </div>
        </div>
        <div className="card flex p-4 gap-3 bg-gray-100 border-round-xl">
          <div className="flex align-items-center text-lg font-semibold">
            Incomplete questionarires
          </div>
          <div className="flex justify-content-end text-4xl font-bold text-blue-400">
            54
          </div>
        </div>
      </div>

      <div className="flex flex-column gap-2">
        <div className="flex justify-content-between gap-3 w-full py-2">
          <div className="font-bold text-3xl">Ready to</div>
          <div className="font-medium text-lg text-color-secondary flex align-items-center">
            See all
          </div>
        </div>
        <div className="flex w-full">
          <DataTable
            value={questionaries}
            stripedRows
            showGridlines
            showHeaders={false}
          >
            <Column field="name" pt={{ root: { className: "w-7" } }}></Column>
            <Column field="date" pt={{ root: { className: "w-4" } }}></Column>
            <Column body={viewIcon}></Column>
          </DataTable>
        </div>
      </div>

      <div className="flex flex-column gap-2">
        <div className="flex justify-content-between gap-3 w-full py-2">
          <div className="font-bold text-3xl">Recently scribed notes</div>
          <div className="font-medium text-lg text-color-secondary flex align-items-center">
            See all
          </div>
        </div>
        <div className="flex w-full">
          <DataTable
            value={notes}
            stripedRows
            showGridlines
            showHeaders={false}
          >
            <Column field="name" pt={{ root: { className: "w-7" } }}></Column>
            <Column field="date" pt={{ root: { className: "w-3" } }}></Column>
            <Column
              body={tagMessage}
              pt={{ root: { className: "w-3" } }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
