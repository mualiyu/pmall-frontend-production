const PaginationControls = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
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
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
  
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value={1}>Published</option>
            <option value={2}>Rejected</option>
          </select>
  
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
          </select>
        </div>
  
        {/* Sticky Pagination Footer */}
        <div className="pagination-footer">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
  
          <span>
            Page {currentPage} of {totalPages}
          </span>
  
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </>
    );
  };
  
  export default PaginationControls;
  