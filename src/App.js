import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://northwind.vercel.app/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    setLoading(true);
    await fetch(`https://northwind.vercel.app/api/suppliers/${id}`, {
      method: "DELETE",
    });
    const response = await fetch("https://northwind.vercel.app/api/suppliers");
    const data = await response.json();
    setSuppliers(data);
    setLoading(false);
  }

  return (
    <div className="App">
      <h1>Suppliers</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Contact Name</th>
              <th>Country</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.companyName}</td>
                <td>{supplier.contactName}</td>
                <td>{supplier.country}</td>
                <td>{supplier.phone}</td>
                <td>
                  <button onClick={() => handleDelete(supplier.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App