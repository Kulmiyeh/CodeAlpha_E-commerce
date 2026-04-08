import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import connectDB from './server/config/db';
import { notFound, errorHandler } from './server/middleware/errorMiddleware';

// Routes
import authRoutes from './server/routes/authRoutes';
import productRoutes from './server/routes/productRoutes';
import orderRoutes from './server/routes/orderRoutes';

dotenv.config();
 const app = express();
const startServer = async () => {
  await connectDB();
  const PORT = 3000;
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);

  // Static folder for uploads
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error Middleware
  app.use(notFound);
  app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  };
  // Only listen if not running on Vercel
  // if (process.env.NODE_ENV !== 'production') {
  //   app.listen(PORT, '0.0.0.0', () => {
  //     console.log(`Server running on http://localhost:${PORT}`);
  //   });
  // }

  startServer();
 //Export the app for Vercel
  export default app;
