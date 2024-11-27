const Loader = () => {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;
  