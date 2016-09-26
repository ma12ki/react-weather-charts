import mongoose, {Schema} from 'mongoose';

const WeatherSchema = new Schema({
  cityId: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tempDay: Number,
  tempMin: Number,
  tempMax: Number,
  tempNight: Number,
  tempEve: Number,
  tempMorn: Number,
  pressure: Number,
  humidity: Number,
  speed: Number,
  clouds: Number
});

WeatherSchema.index({ cityId: 1, type: 1 });
WeatherSchema.index({ date: 1, type: 1 });

export default mongoose.model('Weather', WeatherSchema);
