import ioredis from "ioredis";
class RedisClient {
  static instance = null;
  static client = null;

  static getInstance() {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  async connect() {
    const port = 6379;

    return new Promise((resolve, reject) => {
      RedisClient.client = ioredis.createClient({ port });

      RedisClient.client.on("connect", () => {
        console.log("Redis sunucusuna bağlanıldı.");
        resolve();
      });

      RedisClient.client.on("error", (err) => {
        console.log("Redis sunucusuna bağlanılamadı.");
        reject(err);
      });
    });
  }

  async set(key, value) {
    console.log("asdadasdsadas: ", key, value);
    return RedisClient.client.set(key, value);
  }

  async get(key) {
    return RedisClient.client.get(key);
  }

  async isMaster() {
    try {
      const info = await RedisClient.client.info('replication');
      console.log("info", info);
      return info.includes('role:master');
    } catch (error) {
      console.error("Redis sunucusunun durumu kontrol edilemedi:", error);
      return false;
    }
  }
}

export default RedisClient;