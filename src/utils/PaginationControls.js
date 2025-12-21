const PaginationControls = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    statusOptions = [],
    pageSize,
    setPageSize,
    currentPage,
    totalPages,
    setCurrentPage,
  }) => {
    return (
      <>
        {/* Search & Filters */}
        <div className="filters">
          <input
          className="search__bar w-200"
          placeholder="Search by name or ID"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
  {statusOptions?.length > 0 && (
          <select
            value={statusFilter}
             className="search__bar w-200" 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
          </select>
   )}
          <select
            value={pageSize}
             className="search__bar w-200" 
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option > No. of Items to Show</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
        
  
        {/* Sticky Pagination Footer */}
        <div className="pagination-footer">
          <button
          className="btn btn-secondary p-25"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
  
          <span>
            Page {currentPage} of {totalPages}
          </span>
  
          <button
          className="btn btn-secondary p-25"
            disabled={currentPage === totalPages || totalPages?.length === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
        </div>
      </>
    );
  };
  
  export default PaginationControls;
  