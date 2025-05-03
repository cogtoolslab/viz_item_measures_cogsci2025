import { Schema, Document, model } from "mongoose";

export interface IAnswer extends Document {
  parsed_params: Object;
  survey: Object;
  order: Object;
  study_end_timestamp: Number,
  study_start_timestamp: Number,
}

export const AnswerSchema = new Schema({
  parsed_params: { type: Object },
  survey: { type: Object },
  order: {type: Object},
  study_end_timestamp: {type: Number},
  study_start_timestamp: {type: Number},
  // question: { type: String },
  // answer: { type: Number },
  // correctAnswer: { type: String },
  // agentResponse: {type: String},
  // dataVisualizationUrl: { type: String },
  // serverAudioRecordingPath: {type: String},
  // taskCategory: { type: String },
  // dataVisualizationType: { type: String },
  // timestamp: { type: Number },
  // datasetTitle: {type: String},
  // imageDescription: {type: String},
  // units: {type: String},
  // trial: {type: Number },
});

export const Answer = model<IAnswer>("Answer", AnswerSchema);
