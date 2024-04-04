const ChatContainer = () => {
  return (
    <div className="flex flex-column justify-content-between">
      <div className="flex flex-row justify-content-between">
        <i className="pi pi-ellipsis-h flex align-items-center p-2"></i>
        <div className="text-sm text-gray-400 p-2">Today | 06:32 PM</div>
        <i className="pi pi-ellipsis-v flex align-items-center p-2"></i>
      </div>
      <div className="w-full h-full"></div>
    </div>
  );
};

export { ChatContainer };
