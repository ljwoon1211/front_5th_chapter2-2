import React from "react";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onResetSearch: () => void;
}

export const ProductSearch = ({
  searchTerm,
  onSearchChange,
  onResetSearch,
}: ProductSearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="bg-white p-3 rounded shadow mb-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="상품명 검색"
          value={searchTerm}
          onChange={handleInputChange}
          className="p-2 border rounded flex-grow"
        />
        {searchTerm && (
          <button
            onClick={onResetSearch}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
          >
            초기화
          </button>
        )}
      </div>
    </div>
  );
};
