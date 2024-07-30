/** @format */

import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { ownership } from "@/middlewares/ownership";
import { adminOnly } from "@/middlewares/adminOnly";
import {
  createShareHolder,
  allShareHolders,
  updateShareHolder,
  deleteShareHolder,
} from "@/controllers/share-holder";
import {
  deleteProduct,
  getProducts,
  productCreate,
  updateProduct,
} from "@/controllers/product";
import {
  deletePurchases,
  getPurchases,
  purchases,
  updatePurchases,
} from "@/controllers/buy";
import { getStock, resetStock } from "@/controllers/stock";
import {
  addParty,
  updateParty,
  deleteParty,
  getParties,
} from "@/controllers/party";
import {
  addSales,
  updateSales,
  deleteSales,
  getSalesInfo,
} from "@/controllers/sales";
import { getAccountInfo } from "@/controllers/account";

import {
  addPayment,
  updatePayment,
  getPaymentInfo,
  getPaymentDetails,
} from "@/controllers/payment";
import { addExpense } from "@/controllers/expense";

import { calculateProfit } from "@/controllers/profit";
import {
  addLoan,
  addLoaner,
  payLoan,
  getAllLoans,
  getLoanDetails,
} from "@/controllers/loan";
import { dashboard } from "@/controllers/dashboard";
const router = express.Router();

// Share holder routes
router
  .route("/share-holders/:id")
  .patch(ownership, updateShareHolder)
  .delete(ownership, deleteShareHolder);
router
  .route("/share-holders")
  .get(allShareHolders)
  .post(adminOnly, createShareHolder);

// Product routes
router.route("/products/:id").patch(updateProduct).delete(deleteProduct);
router.route("/products").post(authMiddleware, productCreate).get(getProducts);

// buy routes
router.route("/buy/:id").patch(updatePurchases).delete(deletePurchases);
router.route("/buy").post(purchases).get(getPurchases);

// stock routes
router.route("/stocks/:id").patch(resetStock);
router.route("/stocks").get(getStock);
// party routes
router.route("/parties/:id").patch(updateParty).delete(deleteParty);
router.route("/parties").post(addParty).get(getParties);

// sales routes
router.route("/sales/:id").patch(updateSales).delete(deleteSales);
router.route("/sales").post(addSales).get(getSalesInfo);

// account routes
router.route("/accounts").get(getAccountInfo);

// payment routes
router.route("/payments/:id").patch(updatePayment).get(getPaymentDetails);
router.route("/payments").post(addPayment).get(getPaymentInfo);
// expense routes
router.route("/expenses").post(addExpense);

// profit routes
router.route("/profit/:id").patch(calculateProfit);
// loan route
router.route("/loans/loaner").post(addLoaner);
router.route("/loans").post(addLoan).get(getAllLoans);
router.route("/loans/:id").patch(payLoan).get(getLoanDetails);

// Dashbaord routes
router.route("/dashboard").get(dashboard);

module.exports = router;
export default router;
