import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useRef } from "react";

const TypeSwitcher = (props) => {
	const [productInfo, setProductInfo] = useState("");
	const [activeType, setActiveType] = useState("dvd");
	const productInfoRef = useRef("");
	// Dimension references for productInfoRef
	const furnitureHeightRef = useRef("");
	const furnitureWidthRef = useRef("");
	const furnitureLengthRef = useRef("");
	const firstRefEl = useRef();
	const inputRefs = useRef([firstRefEl.current]);
	let typeChanged = false;
	const handleTypeChange = (e) => {
		typeChanged = true;
		// Reset previous input elements and replace with new one(s)
		inputRefs.current = [];
		setActiveType(e.target.value);
		// Send current input elements to the parent component
		props.catchTypeInputs(inputRefs.current);
	};
	const checkIfTypeChanged = () => {
		if (!typeChanged) {
			props.catchTypeInputs(firstRefEl.current);
		}
	};
	const handleFeatureChange = (e) => {
		// Prepare pre-text for possible product types
		if (activeType === "dvd") {
			productInfoRef.current = "Size: " + e.target.value + "MB";
		} else if (activeType === "book") {
			productInfoRef.current = "Weight: " + e.target.value + "KG";
		} else {
			if (e.target.id === "height") {
				furnitureHeightRef.current = e.target.value;
				productInfoRef.current =
					"Dimensions: " +
					e.target.value +
					"x" +
					furnitureWidthRef.current +
					"x" +
					furnitureLengthRef.current;
			} else if (e.target.id === "width") {
				furnitureWidthRef.current = e.target.value;
				productInfoRef.current =
					"Dimensions: " +
					furnitureHeightRef.current +
					"x" +
					e.target.value +
					"x" +
					furnitureLengthRef.current;
			} else {
				furnitureLengthRef.current = e.target.value;
				productInfoRef.current =
					"Dimensions: " +
					furnitureHeightRef.current +
					"x" +
					furnitureWidthRef.current +
					"x" +
					e.target.value;
			}
		}
		setProductInfo(productInfoRef.current);
	};
	return (
		<>
			<div className="type-switch-div">
				<label htmlFor="productType">Type Switcher:</label>
				<select
					id="productType"
					name="product-type"
					onChange={handleTypeChange}
				>
					<option id="dvd" value="dvd" autoselect="true">
						DVD
					</option>
					<option id="furniture" value="furniture">
						Furniture
					</option>
					<option id="book" value="book">
						Book
					</option>
				</select>
			</div>
			<input
				type="text"
				defaultValue={productInfo}
				name="product-info"
				id="product-info"
			/>
			<div className="type-form">
				<div
					id="dvd"
					className="type-form-div type-form-dvd"
					style={
						activeType === "dvd" ? { display: "block" } : { display: "none" }
					}
				>
					<label htmlFor="size">Size (MB):</label>
					<input
						type="number"
						min="1"
						id="size"
						onChange={handleFeatureChange}
						name="dvd-size"
						ref={
							activeType === "dvd"
								? (element) => {
										inputRefs.current[inputRefs.current.length] = element;
										firstRefEl.current = element;
										checkIfTypeChanged();
								  }
								: null
						}
					/>
				</div>
				<div
					style={
						activeType === "furniture"
							? { display: "block" }
							: { display: "none" }
					}
					id="furniture"
					className="type-form-div type-form-furniture hidden"
				>
					<div>
						<label htmlFor="height">Height (CM):</label>
						<input
							type="number"
							defaultValue={furnitureHeightRef.current}
							onChange={handleFeatureChange}
							min="1"
							id="height"
							name="furniture-height"
							ref={
								activeType === "furniture"
									? (element) =>
											(inputRefs.current[inputRefs.current.length] = element)
									: null
							}
						/>
					</div>
					<div>
						<label htmlFor="width">Width (CM):</label>
						<input
							type="number"
							defaultValue={furnitureWidthRef.current}
							onChange={handleFeatureChange}
							min="1"
							id="width"
							name="furniture-width"
							ref={
								activeType === "furniture"
									? (element) =>
											(inputRefs.current[inputRefs.current.length] = element)
									: null
							}
						/>
					</div>
					<div>
						<label htmlFor="height">Length (CM):</label>
						<input
							type="number"
							min="1"
							defaultValue={furnitureLengthRef.current}
							onChange={handleFeatureChange}
							id="length"
							name="furniture-length"
							ref={
								activeType === "furniture"
									? (element) =>
											(inputRefs.current[inputRefs.current.length] = element)
									: null
							}
						/>
					</div>
				</div>
				<div
					id="book"
					className="type-form-div type-form-book hidden"
					style={
						activeType === "book" ? { display: "block" } : { display: "none" }
					}
				>
					<label htmlFor="weight">Weight (KG):</label>
					<input
						type="number"
						min="1"
						id="weight"
						onChange={handleFeatureChange}
						name="book-weight"
						ref={
							activeType === "book"
								? (element) =>
										(inputRefs.current[inputRefs.current.length] = element)
								: null
						}
					/>
				</div>
			</div>
		</>
	);
};

export default TypeSwitcher;
