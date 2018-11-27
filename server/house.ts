import {Document, Schema, model, Model} from 'mongoose';

interface IHouse extends Document {
  address: string,
  rent: {
    raw: string,
    value: number,
  },
  type: string,
  bedrooms: number,
  utilities: boolean,
  available: string,
  lease: {
    term: number,
    negotiable: boolean,
  },
  location: string,
  distance: number,
  description: string,
  images: string[],
  url: string,
  viewed: boolean,
  liked: boolean,
};

interface IHouseModel extends Model<IHouse> {}

const HouseSchema = new Schema({
  address: {type: String, index: true, unique: true},
  rent: {
    raw: String,
    value: Number,
  },
  type: String,
  bedrooms: Number,
  utilities: Boolean,
  available: String,
  lease: {
    term: Number,
    negotiable: Boolean,
  },
  location: String,
  distance: Number,
  description: String,
  images: [String],
  url: String,
  viewed: {type: Boolean, default: false},
  liked: {type: Boolean, default: false},
});

HouseSchema.pre('save', async function(this: IHouse, next) {
  const results = await this.model('House').find({address: this.address});
  console.log('reuslsts:', results);
  next();
});

export const House = model<IHouse, IHouseModel>('House', HouseSchema);
