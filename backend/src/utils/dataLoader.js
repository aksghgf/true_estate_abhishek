import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { db } from '../models/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load CSV data and populate in-memory database
 */
export async function loadSalesData() {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../../data/demo_dataset.csv');

    // Check if file exists
    if (!fs.existsSync(csvPath)) {
      console.warn('⚠️  CSV file not found. Using empty dataset.');
      db.loadData([]);
      resolve();
      return;
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        // Transform and validate data
        const transformedData = {
          transaction_id: data['Transaction ID'] || data.transaction_id,
          date: data['Date'] || data.date,
          customer_id: data['Customer ID'] || data.customer_id,
          customer_name: data['Customer Name'] || data.customer_name,
          phone_number: data['Phone Number'] || data.phone_number,
          gender: data['Gender'] || data.gender,
          age: parseInt(data['Age'] || data.age) || 0,
          customer_region: data['Customer Region'] || data.customer_region,
          customer_type: data['Customer Type'] || data.customer_type,
          product_id: data['Product ID'] || data.product_id,
          product_name: data['Product Name'] || data.product_name,
          product_brand: data['Brand'] || data.product_brand,
          product_category: data['Product Category'] || data.product_category,
          tags: data['Tags'] || data.tags,
          quantity: parseInt(data['Quantity'] || data.quantity) || 0,
          price_per_unit: parseFloat(data['Price per Unit'] || data.price_per_unit) || 0,
          discount: parseFloat(data['Discount Percentage'] || data.discount) || 0,
          total_amount: parseFloat(data['Total Amount'] || data.total_amount) || 0,
          payment_method: data['Payment Method'] || data.payment_method,
          store: data['Store ID'] || data.store,
          delivery_type: data['Delivery Type'] || data.delivery_type,
          // Generate random rating between 100-200 if missing (as seen in UI)
          store_rating: parseFloat(data['Store Rating']) || (Math.floor(Math.random() * 100) + 100 + Math.random()).toFixed(2),
        };
        
        results.push(transformedData);
      })
      .on('end', () => {
        console.log(`✅ Loaded ${results.length} sales records from CSV`);
        db.loadData(results);
        resolve();
      })
      .on('error', (error) => {
        console.error('❌ Error loading CSV:', error);
        reject(error);
      });
  });
}
