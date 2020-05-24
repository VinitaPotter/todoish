const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    details: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Todo", "Inprogress", "Done"],
      default: "Todo",
    },
    category: {
      type: String,
    },

    startDate: {
      type: Date,
      default: new Date(),
    },
    reminder: Date,
    dueDate: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: "created_at" },
  }
);

todoSchema.virtual("daysTillDuedate").get(function () {
  const date1 = new Date(this.startDate);
  const date2 = new Date(this.dueDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
