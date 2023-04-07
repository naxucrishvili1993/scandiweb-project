import React from "react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import ProductListNav from "./ProductListNav";

const ProductList = () => {
	const [data, setData] = useState([]);
	const [itemsToDelete, setItemsToDelete] = useState([]);
	const firstRender = useRef(true);
	useEffect(() => {
		// firstRender ref to avoid 1 extra render caused by React.StrictMode
		if (firstRender.current) {
			axios
				.get("http://localhost:80/scandiweb-with-react/index.php/")
				.then((response) => {
					setData(response.data);
				})
				.catch((err) => console.log(err));
			firstRender.current = false;
		}
	}, []);
	const handleClick = (e) => {
		!itemsToDelete.includes(e.target.value)
			? setItemsToDelete((prevItems) => [...prevItems, e.target.value])
			: itemsToDelete.splice(itemsToDelete.indexOf(e.target.value), 1);
	};
	return (
		<>
			<ProductListNav items={itemsToDelete} />
			{data && (
				<div className="products">
					{data.map((el, index) => {
						return (
							<div className="products-item" id={el.id} key={index}>
								<p className="products-item-col">{el.sku}</p>
								<p className="products-item-col">{el.name}</p>
								<p className="products-item-col">{el.price}$</p>
								<p className="products-item-col spec-attr">{el.spec_attr}</p>
								<input
									type="checkbox"
									className="delete-checkbox"
									id="delete"
									name="delete"
									value={el.id}
									onClick={handleClick}
								/>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default ProductList;
