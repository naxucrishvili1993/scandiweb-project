import React from "react";
import { Link } from "react-router-dom";

const ProductListNav = (props) => {
	const handleClick = (e) => {
		if (props.items.length < 1) {
			e.preventDefault();
			alert("Please select an item to delete!");
		}
	};
	return (
		<div className="header">
			<div className="header-left">
				<h1>Product List</h1>
			</div>
			<div className="header-right">
				<Link to="/addProduct">
					<button>ADD</button>
				</Link>
				<form
					action="https://product-app-2023.000webhostapp.com/index.php/"
					method="post"
					id="mass-delete-form"
				>
					<input
						type="hidden"
						defaultValue={props.items}
						name="items"
						className="items"
					/>
					<button
						id="delete-product-btn"
						type="submit"
						name="submit"
						onClick={handleClick}
					>
						MASS DELETE
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProductListNav;
