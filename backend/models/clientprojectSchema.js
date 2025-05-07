import mongoose from "mongoose";

const clientprojectSchema = new mongoose.Schema({
  title: String,
  projectLink: String,
  projectBanner: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const ClientProject = mongoose.model("ClientProject", clientprojectSchema);