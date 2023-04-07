import React from "react";
import { Link } from "react-router-dom";

const AddProductNav = () => {
	return (
		<div className="header">
			<div className="header-left">
				<h1>Product Add</h1>
			</div>
			<div className="header-right add-product-btns">
				<input
					type="submit"
					value="Save"
					id="form-submit"
					form="product_form"
				/>
				<Link to="/">
					<button>Cancel</button>
				</Link>
			</div>
		</div>
	);
};

export default AddProductNav;
