import React from "react";
import AddProductNav from "./AddProductNav";
import TypeSwitcher from "./TypeSwitcher";
import { useRef } from "react";

const AddProduct = (props) => {
	const typeInputs = useRef([]);
	const everyInputRef = useRef([]);
	const handleSubmit = (e) => {
		let unfilledInputs = 0;
		everyInputRef.current.concat(typeInputs.current).forEach((el) => {
			if (el) {
				if (el.value.length < 1) {
					unfilledInputs++;
				}
			}
		});
		if (unfilledInputs > 0) {
			e.preventDefault();
			alert("Please submit required data correctly!");
		}
	};
	return (
		<>
			<AddProductNav />
			<form
				onSubmit={handleSubmit}
				action="http://localhost:80/scandiweb-with-react/addProduct.php/"
				method="post"
				id="product_form"
				noValidate
			>
				<div className="info-div">
					<label htmlFor="sku">SKU:</label>
					<input
						type="text"
						placeholder="ABC12345"
						name="sku"
						id="sku"
						maxLength="10"
						className="info-div-input"
						onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
						ref={(element) => {
							everyInputRef.current[everyInputRef.current.length] = element;
						}}
						autoFocus
					/>
					{props.error && <span className="sku-err">SKU is used!</span>}
				</div>
				<div className="info-div">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						defaultValue=""
						name="name"
						id="name"
						className="info-div-input"
						maxLength="15"
						ref={(element) => {
							everyInputRef.current[everyInputRef.current.length] = element;
						}}
					/>
				</div>
				<div className="info-div">
					<label htmlFor="price">Price ($):</label>
					<input
						type="number"
						defaultValue=""
						min="1"
						name="price"
						id="price"
						className="info-div-input"
						ref={(element) => {
							everyInputRef.current[everyInputRef.current.length] = element;
						}}
					/>
				</div>
				<TypeSwitcher
					catchTypeInputs={(e) => {
						typeInputs.current = e;
					}}
				/>
			</form>
		</>
	);
};

export default AddProduct;
