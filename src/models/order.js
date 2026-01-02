// src/models/Order.js
import mongoose from 'mongoose';

// Counter schema untuk auto increment
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Pre-save hook untuk auto increment orderNumber
const getNextOrderNumber = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'orderNumber' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq.toString().padStart(6, '0'); // Format: 000001, 000002, dst.
};

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'ready',
        'picked_up',
        'cancelled',
      ],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Pre-save hook untuk auto-generate orderNumber
orderSchema.pre('save', async function () {
  if (!this.orderNumber) {
    this.orderNumber = await getNextOrderNumber();
  }
});

export default mongoose.model('Order', orderSchema);
