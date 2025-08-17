import express from "express"
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStats,
    searchProducts,
} from "../controllers/productController.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"
import { validateProduct } from "../middleware/validateMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with filtering and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: collection
 *         schema:
 *           type: string
 *           enum: [Green Tea, Black Tea, White Tea, Oolong Tea, Herbal Tea, Pu-erh Tea]
 *         description: Filter by tea collection
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         description: Filter by tea origin
 *       - in: query
 *         name: flavour
 *         schema:
 *           type: string
 *         description: Filter by tea flavour
 *       - in: query
 *         name: quality
 *         schema:
 *           type: string
 *           enum: [Premium, Standard, Organic, Fair Trade]
 *         description: Filter by tea quality
 *       - in: query
 *         name: caffeine
 *         schema:
 *           type: string
 *           enum: [High, Medium, Low, Caffeine-Free]
 *         description: Filter by caffeine level
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Text search in product name and description
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-createdAt"
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalProducts:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPrevPage:
 *                       type: boolean
 *                 filters:
 *                   type: object
 *                   description: Available filter options
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - weight
 *               - collection
 *               - origin
 *               - flavour
 *               - quality
 *               - caffeine
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Premium Earl Grey"
 *               description:
 *                 type: string
 *                 example: "A classic Earl Grey blend with bergamot oil"
 *               price:
 *                 type: number
 *                 example: 24.99
 *               weight:
 *                 type: string
 *                 example: "100g"
 *               collection:
 *                 type: string
 *                 enum: [Green Tea, Black Tea, White Tea, Oolong Tea, Herbal Tea, Pu-erh Tea]
 *                 example: "Black Tea"
 *               origin:
 *                 type: string
 *                 example: "Sri Lanka"
 *               flavour:
 *                 type: string
 *                 example: "Citrus Bergamot"
 *               quality:
 *                 type: string
 *                 enum: [Premium, Standard, Organic, Fair Trade]
 *                 example: "Premium"
 *               caffeine:
 *                 type: string
 *                 enum: [High, Medium, Low, Caffeine-Free]
 *                 example: "High"
 *               stock:
 *                 type: integer
 *                 example: 50
 *               image:
 *                 type: string
 *                 example: "/tea-earl-grey.png"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getProducts)
router.post("/", protect, adminOnly, validateProduct, createProduct)

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Advanced product search
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 pagination:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/search", searchProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getProduct)
router.put("/:id", protect, adminOnly, validateProduct, updateProduct)
router.delete("/:id", protect, adminOnly, deleteProduct)

/**
 * @swagger
 * /api/products/admin/stats:
 *   get:
 *     summary: Get product statistics (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     overview:
 *                       type: object
 *                     collectionBreakdown:
 *                       type: array
 */
router.get("/admin/stats", protect, adminOnly, getProductStats)

export default router
