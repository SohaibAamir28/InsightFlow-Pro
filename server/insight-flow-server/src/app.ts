import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { insightRouter } from './routes/insight';
import { insightProspectsRouter } from './routes/insightflow-propsects';
import { insightGeneratorRouter } from './routes/insight-generate';
import objectionHandlerRouter from './routes/insight-objectionhandler';
import { insightProposalRouter } from './routes/insightflow-porposal';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3012'
}));
app.use(express.json());

app.use('/api/insight', insightRouter);
app.use('/api/insight-prospects', insightProspectsRouter);
app.use('/api/insight-generator', insightGeneratorRouter);
app.use('/api/objection-handler', objectionHandlerRouter);
app.use('/api/insight-proposal', insightProposalRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});