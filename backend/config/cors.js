const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://nginx', 'http://localhost'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
