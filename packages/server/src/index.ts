import { App } from './App';

const { express } = new App();

const PORT = process.env.PORT || 3000;

express.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
