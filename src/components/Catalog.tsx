import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IProduct } from "../store/modules/cart/types";
import { addProductToCart } from "../store/modules/cart/actions";

import { api } from "../services/api";

export function Catalog() {
  const dispath = useDispatch();
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get("products").then((response) => {
      setCatalog(response.data);
    });
  }, []);

  const handleAddProductToCart = useCallback(
    (product: IProduct) => {
      dispath(addProductToCart(product));
    },
    [dispath]
  );

  return (
    <main>
      <h1>Catalog!</h1>
      {catalog.map((product) => (
        <article key={product.id}>
          <strong>{product.title}</strong> {" - "}
          <span>{product.price} </span> {"  "}
          <button type="button" onClick={() => handleAddProductToCart(product)}>
            Comprar
          </button>
        </article>
      ))}
    </main>
  );
}
