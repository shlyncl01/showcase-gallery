import Product from "../models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        console.error("Get products error:", error);

        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};

// GET one product
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Get product error:", error);

        res.status(400).json({
            message: "Invalid product ID",
            error: error.message,
        });
    }
};

// CREATE product
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        const product = await Product.create({
            name,
            price,
            description,
            image,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Create product error:", error);

        res.status(400).json({
            message: "Failed to create product",
            error: error.message,
        });
    }
};

// UPDATE product
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                description,
                image,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Update product error:", error);

        res.status(400).json({
            message: "Failed to update product",
            error: error.message,
        });
    }
};

// DELETE product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Delete product error:", error);

        res.status(400).json({
            message: "Failed to delete product",
            error: error.message,
        });
    }
};