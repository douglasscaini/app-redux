import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCartRequest } from "../store/modules/cart/actions";

import { IState } from "../store";
import { IProduct } from "../store/modules/cart/types";

interface CatalogItemProps {
  product: IProduct;
}

export function CatalogItem({ product }: CatalogItemProps) {
  const dispath = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>((state) => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispath(addProductToCartRequest(product));
  }, [dispath, product]);

  return (
    <article>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price} </span> {"  "}
      <button type="button" onClick={handleAddProductToCart}>
        Comprar
      </button>
      {hasFailedStockCheck && <span style={{ color: "red" }}>Falta de estoque</span>}
    </article>
  );
}
