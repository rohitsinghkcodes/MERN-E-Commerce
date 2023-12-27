import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");

  //* GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong in getting categories!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //*handle Create Product Button
  const handleCreateProductBtn = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category);

      const { data } = await axios.post(
        "/api/v1/products/create-product",
        productData
      );
      if (data?.success) {
        alert(`✅ ${data?.msg}`);
        navigate("/dashboard/admin/products");
      } else {
        alert(`❌ ${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong In Creating New Product!");
    }
  };

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card m-4 p-3">
              <h3>Products Page</h3>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {image && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="product"
                        height="200px"
                        className="img img-responsiv rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter the name of product"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={description}
                    placeholder="Enter the description of product"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter the price of product"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter the quantity of product"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping Option"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onchange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="1">Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleCreateProductBtn}
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
