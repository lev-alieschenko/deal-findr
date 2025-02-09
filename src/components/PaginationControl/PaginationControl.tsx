import Image from "next/image";

interface PaginationControlProps {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const lowestPage = currentPage < 4 ? 1 : currentPage - 2;
  const highestPage = lowestPage + 4 > pages ? pages : lowestPage + 4;

  const renderTabs = () => {
    const tabs = [];

    for (let i = lowestPage; i <= highestPage; i++) {
      const isActive = currentPage === i;
      tabs.push(
        <li key={i} className={`mx-1 rounded-lg ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"} transition duration-300`}>
          <button
            className="px-4 py-2 text-sm font-medium w-full"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return tabs;
  };

  return (
    <nav className="pb-4">
      <ul className="flex flex-row">
        {currentPage > 1 && (
          <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
            <button
              className="p-2"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <Image src="/previous-page.png" alt="Previous" width={18} height={18} />
            </button>
          </li>
        )}
        {currentPage === 4 && (
          <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
            <button
              className="p-2"
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
          </li>
        )}
        {currentPage >= 5 && (
          <>
            <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
              <button
                className="p-2"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
            </li>
            <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
              <button
                className="p-2"
                onClick={() => {
                  setCurrentPage((prev) => Math.floor((prev - 1) / 2));
                }}
              >
                ...
              </button>

            </li>
          </>
        )}
        {renderTabs()}
        {currentPage !== pages && (
          <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
            <button
              className="p-2"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <Image src="/next-page.png" alt="Next" width={18} height={18} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
