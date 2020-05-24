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
      enum: ["Todo", "Done"],
      default: "Todo",
    },
    level: {
      type: Number,
      default: 1,
    },

    startTime: {
      type: Date,
      default: new Date(),
    },
    endTime: {
      type: Date,
      default: () => new Date(+new Date() + 60 * 60 * 1000),
    },
    Location: String,
    reminder: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: "created_at" },
  }
);

todoSchema.virtual("duration").get(function () {
  const date1 = new Date(this.startTime);
  const date2 = new Date(this.endTime);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
