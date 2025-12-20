import express from "express";
import sequelize from "./config/database";

import catalogRoutes from "./routes/catalogRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import { initModels } from "./models";
import eventBus from "./services/eventBus";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Part-Stash API v0.1");
});

app.use("/api/catalog", catalogRoutes);
app.use("/api/inventory", inventoryRoutes);

const startServer = async () => {
  try {
    initModels(sequelize);
    await sequelize.sync({ force: false });
    console.log("Banco de dados conectado e sincronizado.");

    try {
      await eventBus.connect();
      console.log("Conexão com RabbitMQ estabelecida.");
    } catch (rabbitError) {
      console.error(
        "Falha ao conectar no RabbitMQ (O app iniciará sem mensageria):",
        rabbitError
      );
    }

    app.listen(PORT, () => {
      console.log(`Server is operational on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro fatal ao iniciar a aplicação:", error);
    process.exit(1);
  }
};

startServer();
