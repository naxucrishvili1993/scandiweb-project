import { Route, Routes } from "react-router-dom";
import "./css/main.css";
import ProductList from "./components/ProductList/ProductList";
import AddProduct from "./components/AddProduct/AddProduct";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<ProductList />} />
				<Route path="/addProduct" element={<AddProduct />} />
				<Route
					path="/addProduct/error=1"
					element={<AddProduct error="true" />}
				/>
			</Routes>
		</>
	);
};

export default App;
