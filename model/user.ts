import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  isAdmin: { type: "boolean", default: false },
});

const User = models.Users || model("User", UserSchema);

export default User;
