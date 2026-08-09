import app from "./app";
import env from "./config/env";

///////////////////////////////////////////
// START SERVER
// Start Express server on configured port
// Listen on all network interfaces
///////////////////////////////////////////
app.listen(env.port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
