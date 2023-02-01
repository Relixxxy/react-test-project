import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Repository from "./tools/Repository";

const repository = new Repository();

function App() {
  const products = useLiveQuery(() => repository.getAllProducts(), []);
  const [productName, setProductName] = useState("");

  return (
    <>
      <h1>Products</h1>

      <div>
        <h3>Name:</h3>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="button"
          value="Add Product"
          onClick={() => repository.addProduct(productName)}
        />
      </div>
      <div>
        <h2>Products</h2>
        <ul>
          {products?.map(({ id, name }) => (
            <li key={id}>
              {name}
              <input
                style={{
                  marginLeft: 10,
                }}
                type="button"
                value="Delete"
                onClick={() => repository.deleteProduct(id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
