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
      enum: ["Todo", "InProgress", "Done"],
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
    location: String,
    reminder: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
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
