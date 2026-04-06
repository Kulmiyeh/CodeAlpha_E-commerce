import { Request, Response } from 'express';
import Product from '../models/Product';
import { isDbConnected } from '../config/db';
import { products as mockProducts } from '../../src/data/products';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req: Request, res: Response) => {
  if (!isDbConnected) {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? String(req.query.keyword).toLowerCase() : '';
    
    let filtered = mockProducts;
    if (keyword) {
      filtered = mockProducts.filter(p => p.title.toLowerCase().includes(keyword));
    }
    
    const count = filtered.length;
    const products = filtered.slice(pageSize * (page - 1), pageSize * page);
    
    return res.json({ products, page, pages: Math.ceil(count / pageSize), isMock: true });
  }

  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: String(req.query.keyword),
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req: Request, res: Response) => {
  if (!isDbConnected) {
    const product = mockProducts.find(p => p._id === req.params.id);
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: 'Product not found (Mock)' });
    }
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await (product as any).remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req: Request, res: Response) => {
  const product = new Product({
    title: 'Sample name',
    price: 0,
    user: (req as any).user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    stock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req: Request, res: Response) => {
  const { title, price, description, image, category, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.stock = stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
