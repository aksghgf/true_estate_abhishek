// In-memory database store
class Database {
  constructor() {
    this.salesData = [];
    this.uniqueValues = {};
  }

  // Load sales data
  loadData(data) {
    this.salesData = data;
    this.extractUniqueValues();
  }

  // Extract unique values for filter options
  extractUniqueValues() {
    this.uniqueValues = {
      regions: [...new Set(this.salesData.map(item => item.customer_region).filter(Boolean))],
      genders: [...new Set(this.salesData.map(item => item.gender).filter(Boolean))],
      categories: [...new Set(this.salesData.map(item => item.product_category).filter(Boolean))],
      tags: [...new Set(this.salesData.flatMap(item => 
        item.tags ? item.tags.split(',').map(t => t.trim()) : []
      ))],
      paymentMethods: [...new Set(this.salesData.map(item => item.payment_method).filter(Boolean))],
    };
  }

  // Get all sales data
  getAllSales() {
    return this.salesData;
  }

  // Get unique values for a field
  getUniqueValues(field) {
    return this.uniqueValues[field] || [];
  }

  // Get data count
  getCount() {
    return this.salesData.length;
  }
}

// Export singleton instance
export const db = new Database();
