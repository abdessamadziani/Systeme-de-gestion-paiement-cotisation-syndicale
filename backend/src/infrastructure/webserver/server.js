const { createServer } = require("http");
const express = require("express");
 const cookieParser = require("cookie-parser");
// const cors = require("cors");
const { PORT } = require("../config/environment");
const router = require("./routes");
// const ErrorHandler = require("../errors/ErrorHandler");
// const SocketIo = require("../packages/socket.io/SocketIo");








class Server {
    constructor() {
      this.app = express();
      this.server = createServer(this.app);
    //   this.socketIo = new SocketIo(this.server);
      this.PORT = PORT;
      this.router = router;
    //   this.ErrorHandler = ErrorHandler;
    }
  
    configure = () => {
      this.app.use(cookieParser());
      this.app.use(express.json());
  
    //   this.app.use(
    //     cors({
    //       origin: "http://localhost:3000",
    //       // origin: "*",
    //       credentials: true,
    //     })
    //   );
      this.app.get("/", (req, res) => {
        res.send("Hello World!");
      });
  
    
  
   
  
    //   this.app.use("/api", this.router);
  
    //   this.app.use(this.ErrorHandler.notFound);
    //   this.app.use(this.ErrorHandler.handle);
  
    //   this.socketIo.init();
    };
  
    start = () => {
      this.configure();
  
      this.server.listen(this.PORT, () => {
        console.log(`-----------------------------------------------`);
        console.log(`| 🚀 Server running on http://localhost:${this.PORT}/ |`);
        console.log(`-----------------------------------------------`);
      });
    };
  }
  
  module.exports = Server;