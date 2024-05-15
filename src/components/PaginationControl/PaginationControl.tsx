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
      const liClassName = isActive
        ? "mx-2 py-2 border-b-[3px] border-blue-800 text-gray-800 hover:text-gray-500 cursor-default"
        : "mx-2 py-2 hover:bg-gray-100";
      const aClassName = isActive
        ? "px-4 py-2 text-sm font-semibold cursor-default"
        : "px-4 py-2 text-sm text-gray-600";
      tabs.push(
        <li key={i} className={liClassName}>
          <a
            href="#"
            className={aClassName}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </a>
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
            <a
              className="py-2 px-2"
              href="#"
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
              }}
            >
              <Image
                className="object-cover"
                src="/previous-page.png"
                alt="Previous page"
                width={18}
                height={18}
              />
            </a>
          </li>
        )}
        {currentPage === 4 && (
          <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
            <a
              className="mx-2 px-2 py-2 text-sm text-gray-600"
              href="#"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              1
            </a>
          </li>
        )}
        {currentPage >= 5 && (
          <>
            <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
              <a
                className="mx-2 px-2 py-2 text-sm text-gray-600"
                href="#"
                onClick={() => setCurrentPage(1)}
              >
                1
              </a>
            </li>
            <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
              <a
                className="py-2 px-2"
                href="#"
                onClick={() => {
                  setCurrentPage((prev) => Math.floor((prev - 1) / 2));
                }}
              >
                ...
              </a>
            </li>
          </>
        )}
        {renderTabs()}
        {currentPage !== pages && (
          <li className="mx-2 flex flex-column items-center hover:bg-gray-100">
            <a
              className="py-2 px-2"
              href="#"
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              <Image
                className="object-cover"
                src="/next-page.png"
                alt="Next page"
                width={18}
                height={18}
              />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
