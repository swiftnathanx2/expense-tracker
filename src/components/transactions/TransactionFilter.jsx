import "../transactions/TransactionFilter.css";

export function TransactionFilter({
  selectedMonth,
  onMonthChange,
  typeFilter,
  onTypeChange,
  categoryFilter,
  onCategoryChange,
  categories,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar-month-select">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
        />
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes...."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-bar-type-filter">
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-bar-category-filter">
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
