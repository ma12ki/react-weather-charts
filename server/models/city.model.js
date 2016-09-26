import mongoose, {Schema} from 'mongoose';

const CitySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  country: String,
  coords: {
    type: [Number]
  }
});

CitySchema.index({ id: 1, type: 1 });
CitySchema.index({ name: 1, type: -1 });
CitySchema.index({ coords: '2dsphere' });

export default mongoose.model('City', CitySchema);
