import connectUsingMongoose from "./src/config/mongoose.config.js";
import server from "./index.js";

server.listen(3000, async () => {
  await connectUsingMongoose();
  console.log("Server is running on port 3000");
});
